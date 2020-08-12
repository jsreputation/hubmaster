import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Customer, CustomerRegisterPayload, LoginResponse } from '../models/auth';
import { PageSizeSmall, Paginator } from '../models/paginator';
import { paginatorParam } from '../utils/paginator.util';
import { Project } from '../models/project';
import { CustomerPageName, CustomerPageVisitAction, InviteCustomerPayload } from '../models/customer';
import { SuccessResponse } from '../models/success-response';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private http: HttpClient
  ) {
  }

  register(payload: CustomerRegisterPayload): Observable<LoginResponse> {
    const url = `${environment.api}/customer/register`;
    return this.http.post<LoginResponse>(url, payload);
  }

  getCustomers(skip = 0, take = PageSizeSmall): Observable<Paginator<Customer>> {
    const url = `${environment.api}/customer/all`;
    return this.http.get<Paginator<Customer>>(url, {params: paginatorParam(skip, take)});
  }

  getCustomerById(id: string): Observable<Customer> {
    const url = `${environment.api}/customer/${id}`;
    return this.http.get<Customer>(url);
  }

  getProjectsByCustomerId(id: string, skip = 0, take = PageSizeSmall): Observable<Project[]> {
    const url = `${environment.api}/customer/${id}/projects`;
    return this.http.get<Project[]>(url, {params: paginatorParam(skip, take)});
  }

  inviteCustomer(payload: InviteCustomerPayload): Observable<SuccessResponse> {
    const url = `${environment.api}/customer/invite`;
    return this.http.post<SuccessResponse>(url, payload);
  }

  customerPageVisit(page: CustomerPageName, projectId: string): Observable<CustomerPageVisitAction> {
    const url = `${environment.api}/customer/page/visit`;
    return this.http.post<CustomerPageVisitAction>(url, { page, projectId });
  }
}
