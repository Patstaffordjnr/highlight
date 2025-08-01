import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuskerComponent } from './busker.component';

describe('BuskerComponent', () => {
  let component: BuskerComponent;
  let fixture: ComponentFixture<BuskerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuskerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuskerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
