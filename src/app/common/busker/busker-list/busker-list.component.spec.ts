import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuskerListComponent } from './busker-list.component';

describe('BuskerListComponent', () => {
  let component: BuskerListComponent;
  let fixture: ComponentFixture<BuskerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuskerListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuskerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
