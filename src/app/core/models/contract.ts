import { Entity } from './base';
import { Project, ProjectAccessoryType } from './project';
import { ImageAttachment } from './attachment';
import { Portfolio } from './portfolio';

export enum ContractStatus {
  Pending = 'PENDING',
  Requested = 'REQUESTED',
  Ready = 'READY',
  Accepted = 'SIGNED'
}

export interface AccessoryLayout extends Entity {
  type: ProjectAccessoryType;
  comment: string;
}

export interface CostEstimate extends Entity {
  comment: string;
  accessories: string;
  price: number;
}

export interface Contract extends Entity {
  existingSiteAssessment: string;
  paversSize: string;
  paversColor: string;
  paversQuality: string;
  layouts: AccessoryLayout[];
  existingMaterialsRemoval: string;
  workPlan: string;
  attachments: ImageAttachment[];
  costEstimates: CostEstimate[];
  portfolios: Portfolio[];
  signedDate: boolean;
  project?: Project;
}
