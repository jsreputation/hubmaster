import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleConsultationDialogComponent } from './schedule-consultation-dialog.component';

describe('ScheduleConsultationDialogComponent', () => {
  let component: ScheduleConsultationDialogComponent;
  let fixture: ComponentFixture<ScheduleConsultationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleConsultationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleConsultationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
