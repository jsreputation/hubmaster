import { Entity } from './base';
import { PreferredColor, Project, ProjectAccessoryType, ProjectLocationType, ProjectShapeType } from './project';
import { ImageAttachment } from './attachment';
import { DeclineReason } from './decline';
import { MaterialType } from './idea-board';

export enum FinalProposalStatus {
  Accepted = 'ACCEPTED',
  Declined = 'DECLINED',
  Pending = 'PENDING',
}


export enum HardscapeBrand {
  Belgard = 'BELGARD',
  TechoBloc = 'TECHO_BLOC',
  Unilock = 'UNILOCK',
  Cambridge = 'CAMBRIDGE',
  Nicolock = 'NICOLOCK',
  Rinox = 'RINOX',
  Pavestone = 'PAVESTONE',
  Ideal = 'IDEAL',
  Other = 'OTHER',
}

export enum WarrantyWorkmanShip {
  OneYear = '1_YEAR',
  TwoYears = '2_YEARS',
  ThreeYears = '3_YEARS',
  FourYears = '4_YEARS',
  FiveYears = '5_YEARS',
}

export class FinalProposalItem {
  id: string;
  type: ProjectAccessoryType;
  accept: boolean;
  materials: MaterialType[];
  manufacturer: HardscapeBrand;
  productName: string;
  preferredColors: PreferredColor[];
  size: string;
  comment: string;
  price: number;
}

export interface FinalProposal extends Entity {
  comment: string;
  projectType: ProjectAccessoryType;
  materials: MaterialType[];
  locationType: ProjectLocationType;
  groundState: string; // `What's currently there` field
  projectSize: string;
  shapeType: ProjectShapeType;
  requestDetails: string;
  coreProjectComment: string;
  price: number;
  estimateCompleteDays: number;
  startDate: Date;
  endDate: Date;
  warrantyWorkmanShip: WarrantyWorkmanShip;
  attachments: ImageAttachment[];
  items: FinalProposalItem[];
  project: Project;
  status: FinalProposalStatus;
  declineReasons: DeclineReason[];
  declineComment: string;
  discount: number;
}
