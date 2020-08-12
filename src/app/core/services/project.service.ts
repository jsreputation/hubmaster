import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import {
  DeclineProject,
  Milestone,
  Project,
  ProjectAccessory,
  ProjectDetail,
  ProjectRegister
} from '../models/project';
import { Estimate, SiteVisitSchedule } from '../models/estimate';
import { paginatorParam } from '../utils/paginator.util';
import { PageSizeDefault, Paginator } from '../models/paginator';
import { FinalProposal } from '../models/final-proposal';
import { SuccessResponse } from '../models/success-response';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(
    private http: HttpClient,
    private fb: FormBuilder
  ) {
  }

  getProjects(skip = 0, take = PageSizeDefault, contractorId?: string): Observable<Paginator<Project>> {
    const url = `${environment.api}/project/all`;
    let params = paginatorParam(skip, take);
    if (contractorId && contractorId !== 'null') {
      params = params.append('contractorId', contractorId);
    }
    return this.http.get<Paginator<Project>>(url, {params});
  }

  rescheduleSiteVisit(id: string, scheduleId: string): Observable<SiteVisitSchedule[]> {
    const url = `${environment.api}/project/${id}/reschedule-site-visit`;
    return this.http.post<SiteVisitSchedule[]>(url, {scheduleId});
  }

  cancelSiteVisitSchedule(id: string): Observable<SuccessResponse> {
    const url = `${environment.api}/project/${id}/cancel-site-visit`;
    return this.http.post<SuccessResponse >(url, null);
  }

  getProjectById(id: string): Observable<ProjectDetail> {
    const url = `${environment.api}/project/${id}`;
    return this.http.get<ProjectDetail>(url);
  }

  createProjects(payload: ProjectRegister): Observable<Project[]> {
    const url = `${environment.api}/project/register`;
    return this.http.post<Project[]>(url, payload);
  }

  updateProjectById(id: string, payload: ProjectDetail): Observable<any> {
    const url = `${environment.api}/project/${id}`;
    return this.http.put<ProjectDetail>(url, payload);
  }

  getEstimateByProjectId(id: string): Observable<Estimate> {
    const url = `${environment.api}/project/${id}/estimate`;
    return this.http.get<Estimate>(url);
  }

  getFinalProposalByProjectId(id: string): Observable<FinalProposal> {
    const url = `${environment.api}/project/${id}/final-proposal`;
    return this.http.get<FinalProposal>(url);
  }

  submitFinalProposalByProjectId(id: string, payload: FinalProposal): Observable<FinalProposal> {
    const url = `${environment.api}/project/${id}/final-proposal`;
    payload.items.forEach(item => {
      if (item.id === '') {
        delete item.id;
      }
    });
    return this.http.post<FinalProposal>(url, payload);
  }

  submitEstimateByProjectId(id: string, payload: Estimate): Observable<Estimate> {
    const url = `${environment.api}/project/${id}/estimate`;
    payload.items.forEach(item => {
      if (item.id === '') {
        delete item.id;
      }
    });
    return this.http.post<Estimate>(url, payload);
  }

  declineEstimate(id: string, payload: DeclineProject): Observable<Estimate> {
    const url = `${environment.api}/project/${id}/estimate/decline`;
    return this.http.post<Estimate>(url, payload);
  }

  declineProposal(id: string, payload: DeclineProject): Observable<FinalProposal> {
    const url = `${environment.api}/project/${id}/final-proposal/decline`;
    return this.http.post<FinalProposal>(url, payload);
  }

  acceptEstimate(id: string, payload: any): Observable<Estimate> {
    const url = `${environment.api}/project/${id}/estimate/accept`;
    return this.http.post<Estimate>(url, payload);
  }

  requestAnotherDay(id: string): Observable<SuccessResponse> {
    const url = `${environment.api}/project/${id}/request-more-days`;
    return this.http.post<SuccessResponse>(url, null);
  }

  skipEstimate(id: string, contractorUserId: string, siteVisitDate: Date): Observable<Project> {
    const url = `${environment.api}/project/${id}/skip-estimate`;
    return this.http.post<Project>(url, { contractorUserId, siteVisitDate });
  }

  acceptProposal(id: string, accepted: string[]): Observable<Milestone[]> {
    const url = `${environment.api}/project/${id}/final-proposal/accept`;
    return this.http.post<Milestone[]>(url, {acceptedItems: accepted});
  }

  getMilestonesByProjectId(id: string): Observable<Milestone[]> {
    const url = `${environment.api}/project/${id}/milestones`;
    return this.http.get<Milestone[]>(url);
  }

  buildProjectForm(project?: ProjectDetail) {
    const data: ProjectDetail = project || null as any;
    return this.fb.group({
      name: [data.name || '', Validators.required],
      address: [data.address || '', Validators.required],
      latitude: data.latitude,
      longitude: data.longitude,
      projectSize: [data.projectSize || '', Validators.required],
      shapeType: [data.shapeType || '', Validators.required],
      projectType: [data.projectType || '', Validators.required],
      materials: [data.materials || [], Validators.required],
      locationType: [data.locationType || '', Validators.required],
      timelineType: [data.timelineType || '', Validators.required],
      interestedInFinancing: data.interestedInFinancing || '',
      designRequired: data.designRequired || false,
      cleanUpType: data.cleanUpType || '',
      budget: [data.budget || '', [Validators.required, Validators.min(0)]],
      comment: data.comment || '',
      accessories: this.fb.array(data.accessories ? data.accessories.map(x => this.buildAccessoryForm(x)) : []),
      machineAccess: [data.machineAccess || '', Validators.required],
      soilType: [data.soilType || '', Validators.required],
      propertyGrade: [data.propertyGrade || '', Validators.required],
      drainageType: [data.drainageType || '', Validators.required],
      attachments: [data.attachments || []],
      manufacturer: data.manufacturer || '',
      productName: data.productName || '',
      preferredColors: [data.preferredColors || []],
      preferredSize: data.preferredSize || '',
      preferredTexture: data.preferredTexture || '',
      preferredPricePoint: data.preferredPricePoint || '',
      additionalDesigns: data.additionalDesigns || '',
      exteriorUtilities: data.exteriorUtilities || '',
      exteriorHazards: data.exteriorHazards || '',
      exteriorInconveniences: data.exteriorInconveniences || '',
      materialStorage: data.materialStorage || '',
      materialHaulOut: data.materialHaulOut || '',
      downSpouts: data.downSpouts || '',
      shrubRemoval: data.shrubRemoval || '',
      requestDetails: data.requestDetails || '',
    });
  }

  buildAccessoryForm(accessory?: ProjectAccessory) {
    const data: ProjectAccessory = accessory || {} as any;
    return this.fb.group({
      id: data.id,
      type: [data.type || '', Validators.required],
      materials: [data.materials || []],
      locationType: [data.locationType || ''],
      size: data.size || '',
      groundState: data.groundState || '',
      shape: data.shape || '',
      comment: data.comment || '',
    });
  }
}
