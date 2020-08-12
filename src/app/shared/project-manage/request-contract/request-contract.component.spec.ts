import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestContractComponent } from './request-contract.component';

describe('RequestContractComponent', () => {
  let component: RequestContractComponent;
  let fixture: ComponentFixture<RequestContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
