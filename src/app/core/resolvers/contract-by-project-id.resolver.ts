import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Contract } from '../models/contract';
import { ContractService } from '../services/contract.service';
import { ToastrService } from '../services/toastr.service';

@Injectable({
  providedIn: 'root'
})
export class ContractByProjectIdResolver implements Resolve<Contract> {

  constructor(
    private contractService: ContractService,
    private toastr: ToastrService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Contract> | Promise<Contract> | Contract {
    // mostly, estimate depends parent routing
    const id = route.parent.params.id || route.parent.parent.params.id;
    return this.contractService.getContractByProjectId(id).pipe(
      catchError(e => {
        this.toastr.error(e, 'Sorry, failed to load contract information. Possibly contract is not requested. Please try different project.');
        return throwError(e);
      })
    );
  }
}
