import { Entity } from './base';
import { User } from './auth';

export enum EventType {
  YourProjectIsApproved = 'YOUR_PROJECT_IS_APPROVED',
  YourProjectHasUpdated = 'YOUR_PROJECT_HAS_UPDATED',
  YouHaveNewEstimate = 'YOU_HAVE_NEW_ESTIMATE',
  YouHaveNewProposal = 'YOU_HAVE_NEW_PROPOSAL',
  YourProposalHasBeenChanged = 'YOUR_PROPOSAL_HAS_BEEN_CHANGED',
  YouHaveNewMilestonePaymentRequest = 'YOU_HAVE_NEW_MILESTONE_PAYMENT_REQUEST',
  YourApplicationIsApproved = 'YOUR_APPLICATION_IS_APPROVED',
  YouHaveNewSiteVisitScheduled = 'YOU_HAVE_NEW_SITE_VISIT_SCHEDULED',
  YourMilestoneHasBeenPaid = 'YOUR_MILESTONE_HAS_BEEN_PAID',
  YourMilestoneHasBeenChanged = 'YOUR_MILESTONE_HAS_BEEN_CHANGED',
  YourProposalHasBeenAccepted = 'YOUR_PROPOSAL_HAS_BEEN_ACCEPTED',
  NewProjectHasBeenRegistered = 'NEW_PROJECT_HAS_BEEN_REGISTERED',
  EstimateHasBeenAccepted = 'ESTIMATE_HAS_BEEN_ACCEPTED',
  EstimateHasBeenDeclined = 'ESTIMATE_HAS_BEEN_DECLINED',
  FinalProposalHasBeenAccepted = 'FINAL_PROPOSAL_HAS_BEEN_ACCEPTED',
  FinalProposalHasBeenDeclined = 'FINAL_PROPOSAL_HAS_BEEN_DECLINED',
  UserRegisteredEvent = 'NEW_USER_REGISTERED',
  CustomerReleasedMilestoneEvent = 'CUSTOMER_RELEASE_MILESTONE',
  ContractorRequestedToReleaseMilestone = 'CONTRACTOR_REQUESTED_TO_RELEASE_MILESTONE',
  ContractorConfirmedCashPayment = 'CONTRACTOR_CONFIRMED_CASH_PAYMENT',
  CustomerRequestedCashPaymentEvent = 'CUSTOMER_REQUESTED_CASH_PAYMENT',
  ContractorRequestedReviewEvent = 'CONTRACTOR_REQUESTED_REVIEW',
  CustomerRequestedContractEvent = 'CUSTOMER_REQUESTED_CONTRACT_EVENT',
  ContractReadyEvent = 'CONTRACT_READY_EVENT',
  CustomerAcceptedContractEvent = 'CUSTOMER_ACCEPTED_CONTRACT_EVENT',
  CustomerRescheduledSiteVisitEvent = 'CUSTOMER_RESCHEDULED_SITE_VISIT_EVENT',
  CustomerRequestedMoreSiteVisitDaysEvent = 'CUSTOMER_REQUESTED_MORE_SITE_VISIT_EVENT',
  CustomerCanceledSiteVisitEvent = 'CUSTOMER_CANCELED_SITE_VISIT_EVENT',
}

export interface Event extends Entity {
  type: EventType;
  message: string;
  user: User;
  meta: any;
  readAt?: string;
}

export interface EventPagination {
  events: Event[];
  total: number;
}
