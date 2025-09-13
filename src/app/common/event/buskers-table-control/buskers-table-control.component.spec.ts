import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuskersTableControlComponent } from './buskers-table-control.component';

describe('BuskersTableControlComponent', () => {
  let component: BuskersTableControlComponent;
  let fixture: ComponentFixture<BuskersTableControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuskersTableControlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuskersTableControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
