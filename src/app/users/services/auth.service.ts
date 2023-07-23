import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { IUser } from '../models/iUser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServices {
  private baseURL: string = environment.baseURL + '/users';
  constructor(private http: HttpClient) {}

  registerUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${this.baseURL}`, user);
  }

  loginUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${this.baseURL}/login`, user);
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
}
