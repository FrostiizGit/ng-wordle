import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllPollsComponent } from './view-all-polls.component';

describe('ViewAllPollsComponent', () => {
  let component: ViewAllPollsComponent;
  let fixture: ComponentFixture<ViewAllPollsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAllPollsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllPollsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
