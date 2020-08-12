export interface Entity {
  id?: string;
  deletedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export enum Opinion {
  Yes = 'YES',
  No = 'NO',
  NotSure = 'NOT_SURE'
}

export interface Location {
  latitude: number;
  longitude: number;
}
