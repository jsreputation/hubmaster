import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { StripePaymentIntent } from '../models/payment';
import { environment } from '../../../environments/environment';
import { Milestone, PaymentAddOn, Refund } from '../models/project';
import { SuccessResponse } from '../models/success-response';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    private http: HttpClient,
  ) {
  }

  payWithCard(milestoneId: string): Observable<StripePaymentIntent> {
    const url = `${environment.api}/payment/pay-with-card`;
    return this.http.post<StripePaymentIntent>(url, {milestoneId});
  }

  payWithAch(milestoneId: string, plaidPublicToken: string, plaidAccountId: string): Observable<Milestone> {
    const url = `${environment.api}/payment/pay-with-ach`;
    return this.http.post<Milestone>(url, {milestoneId, plaidPublicToken, plaidAccountId});
  }

  confirmCashPay(milestoneId: string): Observable<Milestone> {
    const url = `${environment.api}/payment/${milestoneId}/confirm-cash-pay`;
    return this.http.post<Milestone>(url, {});
  }

  verifyPayment(milestoneId: string): Observable<Milestone[]> {
    const url = `${environment.api}/payment/verify`;
    return this.http.post<Milestone[]>(url, {milestoneId});
  }

  requestPayment(milestoneId: string): Observable<Milestone> {
    const url = `${environment.api}/payment/${milestoneId}/request-release`;
    return this.http.post<Milestone>(url, {});
  }

  requestReview(projectId: string): Observable<SuccessResponse> {
    const url = `${environment.api}/project/${projectId}/request-review`;
    return this.http.get<SuccessResponse>(url, {});
  }

  requestCashPayment(milestoneId: string): Observable<Milestone> {
    const url = `${environment.api}/payment/${milestoneId}/request-cash-pay`;
    return this.http.post<Milestone>(url, {});
  }

  requestEditCashPayment(projectId: string, amount: number, comment: string): Observable<Milestone> {
    const url = `${environment.api}/payment/${projectId}/edit-cash-payment`;
    return this.http.post<Milestone>(url, { amount, comment });
  }

  requestAddAddOn(projectId: string, amount: number, comment: string): Observable<PaymentAddOn> {
    const url = `${environment.api}/payment/${projectId}/add-on`;
    return this.http.post<PaymentAddOn>(url, { amount, comment });
  }

  requestAddRefund(projectId: string, amount: number, comment: string): Observable<Refund> {
    const url = `${environment.api}/payment/${projectId}/add-refund`;
    return this.http.post<Refund>(url, { amount, comment });
  }

  requestRemoveAddOn(addOnId: string): Observable<any> {
    const url = `${environment.api}/payment/${addOnId}`;
    return this.http.delete<SuccessResponse>(url);
  }


}
