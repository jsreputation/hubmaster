import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { ProjectDetailStateService } from '../project-detail-state.service';
import { AuthService } from '../../../core/services/auth.service';
import { ContractStatus } from '../../../core/models/contract';

@Injectable()
export class ContractGuard implements CanActivate {

  constructor(
    private projectDetailStateService: ProjectDetailStateService,
    private authService: AuthService,
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.projectDetailStateService.project) {
      this.authService.navigateByUserRole();
      return false;
    }
    if (this.projectDetailStateService.project.contractStatus !== ContractStatus.Pending) {
      return true;
    } else {
      this.authService.navigateByUserRole();
      return false;
    }
  }

}
