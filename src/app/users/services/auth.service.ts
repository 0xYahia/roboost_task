import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { IUser } from '../models/iUser';
import { Observable, map } from 'rxjs';
import { LocalService } from '../../shared/local.service';
import { ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AuthServices {
  private baseURL: string = environment.baseURL + '/users';
  constructor(private http: HttpClient, private localService: LocalService) {}

  registerUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${this.baseURL}`, user);
  }

  loginUser(
    email: string,
    password: string
  ): Observable<{ email: string; password: string }[]> {
    return this.http.get<{ email: string; password: string }[]>(
      this.baseURL + `?email=${email}&password=${password}`
    );
  }

  getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.baseURL);
  }

  getOneUser(id: number): Observable<IUser> {
    return this.http.get<IUser>(`${this.baseURL}/${id}`);
  }

  addNewUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.baseURL, user);
  }

  updateUser(user: IUser, id: number): Observable<IUser> {
    return this.http.patch<IUser>(`${this.baseURL}/${id}`, user);
  }

  deleteUser(id: number): Observable<IUser> {
    return this.http.delete<IUser>(`${this.baseURL}/${id}`);
  }

  checkEmailAsync(email: string): Observable<ValidationErrors | null> {
    return this.http.get<IUser[]>(this.baseURL + `?email=${email}`).pipe(
      map((users: IUser[]) => {
        if (users.length > 0) {
          return { emailExists: true };
        } else {
          return null;
        }
      })
    );
  }
}
