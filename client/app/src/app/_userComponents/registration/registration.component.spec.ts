import { AppModule } from './../../app.module';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { RegistrationComponent } from './registration.component';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationComponent ],
      imports: [ AppModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('form should be valid', async(() => {
  //   component.registerForm.controls['firstName'].setValue("Siema");
  //   component.registerForm.controls['lastName'].setValue("Siema");
  //   component.registerForm.controls['email'].setValue("Siema@siema.siema");
  //   component.registerForm.controls['password'].setValue("Siemaaaa");
  //   component.registerForm.controls['confirmPassword'].setValue("Siemaaaa");
  //   component.registerForm.controls['birthday'].setValue("01-01-2000");
  //   component.registerForm.controls['username'].setValue("Siemaaaa");
  //   component.registerForm.controls['idFirstLanguage'].setValue("1");
  //   component.registerForm.controls['noSound'].setValue(true);
  //   component.registerForm.controls['noSight'].setValue(true);
  //   component.registerForm.controls['fontSize'].setValue(true);
  //   expect(component.registerForm.valid).toBeTruthy();
  // }))

});
