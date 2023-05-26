import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GigComponent } from './gig.component';

describe('GigComponent', () => {
  let component: GigComponent;
  let fixture: ComponentFixture<GigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
