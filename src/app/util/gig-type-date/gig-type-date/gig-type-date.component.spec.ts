import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GigTypeDateComponent } from './gig-type-date.component';

describe('GigTypeDateComponent', () => {
  let component: GigTypeDateComponent;
  let fixture: ComponentFixture<GigTypeDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GigTypeDateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GigTypeDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
