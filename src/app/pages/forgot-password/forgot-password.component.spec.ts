import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { ForgotPasswordComponent } from './forgot-password.component';
import { AppModule } from 'src/app/app.module';
import { environment } from 'src/environments/environment';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [provideHttpClientTesting()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();

    // AppModule's session-restore initializer runs on creation; ignore its request.
    httpMock
      .match(`${environment.apiUrl}/user/whoAmI`)
      .forEach(request => request.flush(null, { status: 401, statusText: 'Unauthorized' }));
  });

  afterEach(() => httpMock.verify());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows an error instead of success when the request fails', async () => {
    component.form.setValue({ email: 'pat@highlight.ie' });

    const submission = component.onSubmit();
    const request = httpMock.expectOne(`${environment.apiUrl}/open/forgot-password`);
    expect(request.request.method).toBe('POST');
    request.flush(
      { message: 'Mail service unavailable' },
      { status: 503, statusText: 'Service Unavailable' }
    );
    await submission;

    expect(component.submitted).toBeFalse();
    expect(component.errorMessage).toBe('Mail service unavailable');
    expect(component.loading).toBeFalse();
  });

  it('shows the success message when the request succeeds', async () => {
    component.form.setValue({ email: 'pat@highlight.ie' });

    const submission = component.onSubmit();
    httpMock.expectOne(`${environment.apiUrl}/open/forgot-password`).flush({});
    await submission;

    expect(component.submitted).toBeTrue();
    expect(component.errorMessage).toBe('');
  });
});
