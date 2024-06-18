import { BehaviorSubject, Observable } from 'rxjs';

export interface IAuthStatus {
  isAuthenticated: boolean;
  userRole: string;
  userId: string;
}

export interface IAuthService {
  readonly authStatus$: BehaviorSubject<any>;
  readonly currentUser$: BehaviorSubject<any>;

  login(email: string, password: string): Observable<void>;
  logout(clearToken?: boolean): void;
  getToken(): string;
}

export abstract class AuthService implements IAuthService {
  readonly authStatus$ = new BehaviorSubject<any>(null);
  readonly currentUser$ = new BehaviorSubject<any>(null);
  constructor() {}
  login(email: string, password: string): Observable<void> {
    throw new Error('Method not implemented.');
  }
  logout(clearToken?: boolean | undefined): void {
    throw new Error('Method not implemented.');
  }
  getToken(): string {
    throw new Error('Method not implemented.');
  }

  protected abstract authProvider(
    email: string,
    password: string
  ): Observable<{ accessToken: string }>;
  protected abstract transformJwtToken(token: unknown): IAuthStatus;
  protected abstract getCurrentUser(): Observable<{}>;
}
