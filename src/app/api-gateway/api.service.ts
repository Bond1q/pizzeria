import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {ClientOrder, Configuration, Cook} from "../types/types";


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl = 'http://localhost:8080/pizzeria';

  constructor(private http: HttpClient) {}

  configurePizzeria(configuration: Configuration) {
    return this.http.post(this.apiUrl, configuration);
  }

  getClients() {
    return this.http.get<ClientOrder[]>(
      `${this.apiUrl}/clients`
    );
  }

  getCooks() {
    return this.http.get<Cook[]>(`${this.apiUrl}/cooks`);
  }

  stopCook(id: string) {
    return this.http.post<Cook[]>(
      `${this.apiUrl}/cooks/${id}/stop`,
      {}
    );
  }

  resumeCook(id: string) {
    return this.http.post<Cook[]>(
      `${this.apiUrl}/cooks/${id}/resume`,
      {}
    );
  }
}
