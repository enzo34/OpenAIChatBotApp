import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseApi } from '../models/response-api';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BotService {

  constructor(private http: HttpClient) {}

  public getResponse(question: any) {
    return this.http.post<ResponseApi>(environment.urlApi, {input: question});
  }
}
