import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SuccessResponse } from '../models/success-response';
import { environment } from '../../../environments/environment';
import { Contract } from '../models/contract';
import { PageSizeDefault, Paginator } from '../models/paginator';
import { paginatorParam } from '../utils/paginator.util';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  constructor(
    private http: HttpClient
  ) { }

  requestContract(projectId: string, acceptedItems: string[]): Observable<SuccessResponse> {
    const url = `${environment.api}/project/${projectId}/request-contract`;
    return this.http.post<SuccessResponse>(url, { acceptedItems });
  }

  getContractByProjectId(projectId: string): Observable<Contract> {
    const url = `${environment.api}/project/${projectId}/contract`;
    return this.http.get<Contract>(url);
  }

  getContractById(id: string): Observable<Contract> {
    const url = `${environment.api}/contract/${id}`;
    return this.http.get<Contract>(url);
  }

  saveContract(projectId: string, payload: Contract): Observable<Contract> {
    // remove null id fields for not-null constraint
    payload.layouts.forEach(x => {
      if (!x.id) {
        delete x.id;
      }
    });
    payload.costEstimates.forEach(x => {
      if (!x.id) {
        delete x.id;
      }
    });
    const url = `${environment.api}/project/${projectId}/save-contract`;
    return this.http.post<Contract>(url, payload);
  }

  acceptContract(projectId: string): Observable<SuccessResponse> {
    const url = `${environment.api}/project/${projectId}/accept-contract`;
    return this.http.post<SuccessResponse>(url, null);
  }

  getContractsByCustomer(userId: string, skip = 0, take = PageSizeDefault): Observable<Paginator<Contract>> {
    const url = `${environment.api}/customer/${userId}/contracts`;
    return this.http.get<Paginator<Contract>>(url, {params: paginatorParam(skip, take)});
  }
}
