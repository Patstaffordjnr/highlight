import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuskersTableComponent } from './buskers-table.component';

describe('BuskersTableComponent', () => {
  let component: BuskersTableComponent;
  let fixture: ComponentFixture<BuskersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuskersTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuskersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
