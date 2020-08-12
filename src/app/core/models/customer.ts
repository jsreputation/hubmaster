import { Project } from './project';
import { User } from './auth';
import { Entity } from './base';

export interface InviteCustomerPayload {
  projects: Project[];
  user: User;
}

export enum CustomerPageName {
  BriefPage = 'BRIEF_PAGE',
  EstimatePage = 'ESTIMATE_PAGE',
  ProposalPage = 'PROPOSAL_PAGE',
  ContractPage = 'CONTRACT_PAGE',
  PaymentPage = 'PAYMENT_PAGE',
}

export interface CustomerPageVisitAction extends Entity {
  customer: User;
  page: CustomerPageName;
  project: Project;
  visitDate: string;
}
