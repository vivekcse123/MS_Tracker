import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyWFHComponent } from './apply-wfh.component';

describe('ApplyWFHComponent', () => {
  let component: ApplyWFHComponent;
  let fixture: ComponentFixture<ApplyWFHComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApplyWFHComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplyWFHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
