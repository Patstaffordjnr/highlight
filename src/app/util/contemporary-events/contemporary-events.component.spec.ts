import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContemporaryEventsComponent } from './contemporary-events.component';

describe('ContemporaryEventsComponent', () => {
  let component: ContemporaryEventsComponent;
  let fixture: ComponentFixture<ContemporaryEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContemporaryEventsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContemporaryEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
