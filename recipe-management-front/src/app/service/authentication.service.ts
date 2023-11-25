import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl = 'http://localhost:8080/api/v1/users';

  constructor(private http: HttpClient) { }

  register(username: string, password: string): Observable<void> {
    const registrationData = { username, password };
    return this.http.post<void>(`${this.apiUrl}/register`, registrationData);
  }
}
