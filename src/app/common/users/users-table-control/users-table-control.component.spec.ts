import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersTableControlComponent } from './users-table-control.component';

describe('UsersTableControlComponent', () => {
  let component: UsersTableControlComponent;
  let fixture: ComponentFixture<UsersTableControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersTableControlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersTableControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
