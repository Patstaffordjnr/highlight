import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuskerModalComponent } from './busker-modal.component';

describe('BuskerModalComponent', () => {
  let component: BuskerModalComponent;
  let fixture: ComponentFixture<BuskerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuskerModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuskerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
