import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ProjectService } from '../services/project.service';
import { Estimate } from '../models/estimate';
import { ToastrService } from '../services/toastr.service';

@Injectable({
  providedIn: 'root'
})
export class EstimateByProjectIdResolver implements Resolve<any> {

  constructor(
    private projectService: ProjectService,
    private toastr: ToastrService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Estimate> | Promise<Estimate> | Estimate {
    // mostly, estimate depends parent routing
    const id = route.parent.params.id || route.parent.parent.params.id;
    return this.projectService.getEstimateByProjectId(id).pipe(
      catchError(e => {
        this.toastr.error(e, 'Sorry, failed to load estimate information. Possibly estimate id is invalid. Please try different one.');
        return throwError(e);
      })
    );
  }
}
