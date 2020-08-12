import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeIdeaBoardComponent } from './home-idea-board.component';

describe('HomeIdeaBoardComponent', () => {
  let component: HomeIdeaBoardComponent;
  let fixture: ComponentFixture<HomeIdeaBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeIdeaBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeIdeaBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
