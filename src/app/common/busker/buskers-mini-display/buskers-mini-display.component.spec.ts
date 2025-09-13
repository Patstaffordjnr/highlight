import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuskersMiniDisplayComponent } from './buskers-mini-display.component';

describe('BuskersMiniDisplayComponent', () => {
  let component: BuskersMiniDisplayComponent;
  let fixture: ComponentFixture<BuskersMiniDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuskersMiniDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuskersMiniDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
