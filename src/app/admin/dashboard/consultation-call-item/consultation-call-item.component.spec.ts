import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationCallItemComponent } from './consultation-call-item.component';

describe('ConsultationCallItemComponent', () => {
  let component: ConsultationCallItemComponent;
  let fixture: ComponentFixture<ConsultationCallItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultationCallItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationCallItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
