import { Language } from './../../_interfaces/language';
import { User } from './../../_interfaces/user';
import { UserService } from './../../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { UserPreferences } from 'src/app/_interfaces/userPreferences';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInfo } from 'src/app/_interfaces/userInfo';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(
    public userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    ) { }

  user: User;
  registerForm: FormGroup;
  submitted = false;
  languageList: Array<Language> = new Array<Language>();


  ngOnInit(): void {
    this.user = new User();
    this.user.preferences = new UserPreferences();
    this.user.userInfo = new UserInfo();

    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      // validates date format yyyy-mm-dd
      birthday: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
      email: ['', [Validators.required, Validators.email]],
      // firstLanguage: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      hearingDisability: [false],
      colorBlindness: [false],
      sightDisability: [false],
      // acceptTerms: [false, Validators.requiredTrue]
  }, {
      validator: this.MustMatch('password', 'confirmPassword')
  });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    this.writeFormDataInUser();
    if (this.registerForm.invalid) {
      return;
    }
    
    this.userService.sendRegistrationInfo(this.user).subscribe();
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }
  
  writeFormDataInUser(): void {
    this.user.userInfo.name = this.registerForm.value.firstName;
    this.user.userInfo.surname = this.registerForm.value.lastName;
    this.user.userInfo.email = this.registerForm.value.email;
    this.user.userInfo.password = this.registerForm.value.password;
    this.user.userInfo.firstLanguage = 1;
    this.user.userInfo.birthday = this.registerForm.value.birthday;
    this.user.userInfo.username = this.registerForm.value.username;
    this.user.preferences.noSound = this.registerForm.value.hearingDisability;
    this.user.preferences.noSight = this.registerForm.value.colorBlindness;
    this.user.preferences.fontSize = this.registerForm.value.sightDisability;
  }

onReset() {
    this.submitted = false;
    this.registerForm.reset();
}

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
  }

  goToLogin(): void {
    this.router.navigateByUrl('user/login');
  }

}
