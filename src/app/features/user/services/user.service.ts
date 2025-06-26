import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly http: HttpClient) { }

  gets(page: number = 1) {
    const url = `users?page=${page}`;
    return this.http.get<any>(url);
  }


}
