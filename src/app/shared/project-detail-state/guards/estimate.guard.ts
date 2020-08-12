import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { ProjectDetailStateService } from '../project-detail-state.service';
import { AuthService } from '../../../core/services/auth.service';

@Injectable()
export class EstimateGuard implements CanActivate {

  constructor(
    private projectDetailStateService: ProjectDetailStateService,
    private authService: AuthService
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!this.projectDetailStateService.project) {
      this.authService.navigateByUserRole();
      return false;
    }
    if (Boolean(this.projectDetailStateService.project.estimate)) {
      return true;
    } else {
      this.authService.navigateByUserRole();
      return false;
    }
  }

}
