import { BehaviorSubject, Observable } from 'rxjs';
import { CacheService } from '../shared/services/cache.service';
import { AuthService, IAuthStatus, IServerAuthResponse } from './auth.service';
import { IUser } from './user';

export class InMemoryAuthService implements AuthService {
  authStatus$: BehaviorSubject<IAuthStatus>;
  currentUser$: BehaviorSubject<IUser>;
  protected cache: CacheService;
  login(email: string, password: string): Observable<void> {
    throw new Error('Method not implemented.');
  }
  clearToken(): void {
    throw new Error('Method not implemented.');
  }
  setToken(accessToken: string): void {
    throw new Error('Method not implemented.');
  }
  logout(clearToken?: boolean | undefined): void {
    throw new Error('Method not implemented.');
  }
  getToken(): string {
    throw new Error('Method not implemented.');
  }
  protected override authProvider(
    email: string,
    password: string
  ): Observable<IServerAuthResponse> {
    throw new Error('Method not implemented.');
  }
  protected override transformJwtToken(token: unknown): IAuthStatus {
    throw new Error('Method not implemented.');
  }
  protected override getCurrentUser(): Observable<IUser> {
    throw new Error('Method not implemented.');
  }
}
