import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ContactUsMessage } from '../models/contact-us-message';
import { SuccessResponse } from '../models/success-response';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private http: HttpClient) {
  }

  sendContactUsMessage(payload: ContactUsMessage): Observable<SuccessResponse> {
    const url = environment.api + '/contact';
    return this.http.post<SuccessResponse>(url, payload);
  }
}
