import {
  BehaviorSubject,
  Observable,
  catchError,
  filter,
  map,
  mergeMap,
  pipe,
  tap,
  throwError,
} from 'rxjs';
import { IUser, User } from './user';
import { Role } from './auth.enum';
import { inject } from '@angular/core';
import { CacheService } from '../shared/services/cache.service';
import { jwtDecode } from 'jwt-decode';

export interface IAuthStatus {
  isAuthenticated: boolean;
  userRole: string;
  userId: string;
}

export interface IServerAuthResponse {
  accessToken: string;
}
export const defaultAuthStatus: IAuthStatus = {
  isAuthenticated: false,
  userRole: Role.None,
  userId: '',
};

export interface IAuthService {
  readonly authStatus$: BehaviorSubject<IAuthStatus>;
  readonly currentUser$: BehaviorSubject<IUser>;

  login(email: string, password: string): Observable<void>;
  logout(clearToken?: boolean): void;
  getToken(): string;
}

export abstract class AuthService implements IAuthService {
  readonly authStatus$ = new BehaviorSubject<IAuthStatus>(defaultAuthStatus);
  readonly currentUser$ = new BehaviorSubject<IUser>(new User());

  protected readonly cache = inject(CacheService);

  constructor() {}

  login(email: string, password: string): Observable<void> {
    this.clearToken();
    const loginResponse$ = this.authProvider(email, password).pipe(
      map((value) => {
        this.setToken(value.accessToken);
        const token = jwtDecode(value.accessToken);
        return this.transformJwtToken(token);
      }),
      tap((status) => this.authStatus$.next(status)),
      this.getAndUpdateUserIfAuthenticated
    );

    loginResponse$.subscribe({
      error: (err) => {
        this.logout();
        return throwError(() => err);
      },
    });

    return loginResponse$;
  }

  clearToken() {
    this.cache.remove('jwt');
  }

  setToken(accessToken: string) {
    this.cache.setItem('jwt', accessToken);
  }

  logout(clearToken?: boolean): void {
    throw new Error('Method not implemented.');
  }

  getToken(): string {
    return this.cache.getItem('jwt') ?? '';
  }

  protected abstract authProvider(
    email: string,
    password: string
  ): Observable<IServerAuthResponse>;

  protected abstract transformJwtToken(token: unknown): IAuthStatus;

  protected abstract getCurrentUser(): Observable<IUser>;

  private getAndUpdateUserIfAuthenticated = pipe(
    filter((status: IAuthStatus) => status.isAuthenticated),
    mergeMap(() => this.getCurrentUser()),
    map((user: IUser) => this.currentUser$.next(user))
    // catchError((er))
  );
}
