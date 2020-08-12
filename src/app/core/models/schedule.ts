import { User } from './auth';
import { Project } from './project';
import { PatioPackage, PatioPackageAddition } from './patio-package';

export enum ScheduleType {
  Consultation = 'CONSULTATION',
  SiteVisitSchedule = 'SITE_VISIT_SCHEDULE',
  ProjectStart = 'PROJECT_START'
}

export interface Schedule {
  type: ScheduleType;
  from: string;
  to: string;
  active?: boolean;
  data: {
    name: string;
    id: string;
    user?: User;
    project?: Project;
    patioPackage?: PatioPackageSchedule;
  };
}

export interface Calendar {
  id: string;
  summary: string;
  timeZone: string;
  backgroundColor: string;
  foregroundColor: string;
}

export interface AddCalendarEventPayload {
  start: string;
  end: string;
  summary: string;
  description: string;
}

export interface PatioPackageSchedule {
  packageType: PatioPackage;
  additional?: PatioPackageAddition[];
  option?: string;
}
