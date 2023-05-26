import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GigServiceComponent } from './gig-service.component';

describe('GigServiceComponent', () => {
  let component: GigServiceComponent;
  let fixture: ComponentFixture<GigServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GigServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GigServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
