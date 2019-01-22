import { Injectable } from "@angular/core";
import { User } from '../interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
}) 
export class AuthServise {

    constructor(private http: HttpClient) {}

    private token = null
    private id = null
    private username = null

    register(user: User): Observable<User> {
        return this.http.post<User>('api/auth/register', user)

    }

    login(user: User): Observable<{token: string, id: string, username: string}> {
        return this.http.post<{token: string, id: string, username: string}>('api/auth/login', user)
            .pipe(
                tap(
                    ({token, id, username}) => {
                        localStorage.setItem('auth-token', token)
                        localStorage.setItem('userId', id)
                        localStorage.setItem('username', username)
                        this.setToken(token)
                        this.setId(id)
                        this.setUsername(username)
                    }
                )

            )
    }

    setToken(token: string) {
        this.token = token
    }

    getToken(): string {
        return this.token
    }

    setUsername(username: string) {
        this.username = username
    }

    getUsername(): string {
        return this.username
    }

    setId(id: string) {
        this.id = id
    }

    getId(): string {
        return this.id
    }

    isAuthenticated(): boolean {
        return !!this.token
    }

    logout() {
        this.setId(null)
        this.setToken(null)
        this.setUsername(null)
        localStorage.clear()
    }

}