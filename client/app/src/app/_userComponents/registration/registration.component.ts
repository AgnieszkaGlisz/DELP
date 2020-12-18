import { Language } from './../../_interfaces/language';
import { User } from './../../_interfaces/user';
import { UserService } from './../../_services/user.service';
import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { UserPreferences } from '../../_interfaces/userPreferences';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInfo } from '../../_interfaces/userInfo';
import { Subscription } from 'rxjs';
import { WordsetService } from '../../_services/wordset.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit, AfterViewInit, AfterViewChecked {

  constructor(
    public userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private wordsetService: WordsetService, 
    ) { }

  user: User;
  registerForm: FormGroup;
  submitted = false;

  lang1 = new FormControl();
  languageList: Array<Language> = new Array<Language>();
  languageSubscription: Subscription;

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

  ngAfterViewInit(): void {
    this.loadLanguages();
  }

  ngAfterViewChecked(): void {
    if (this.languageList.length == 0 && ((!this.languageSubscription) ||
       (this.languageSubscription && this.languageSubscription.closed)))
      this.loadLanguages();
  }

  loadLanguages(): void {
    console.log("waiting for languages...");
    this.languageSubscription = this.wordsetService.getAllLanguages().subscribe( x => {
      console.log("got languages", x);
      let tmp = {languages:  Array<Language>()};
      Object.assign(tmp, x);
      let i = 0;
      tmp.languages.forEach( l =>
      {
        this.languageList[i] = l;
        i++;
      });
    }, err => {
      console.log("didn't get languages", err);
    }, 
    () => {
      console.log("languages", this.languageList);
    }
    )
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    this.writeFormDataInUser();
    if (this.registerForm.invalid) {
      return;
    }
    
    //this.writeTestDataInUser();
    this.userService.sendRegistrationInfo(this.user).subscribe(x => {
      this.router.navigateByUrl('user/login');
     });
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }

  writeFormDataInUser(): void {
    this.user.userInfo.name = this.registerForm.value.firstName;
    this.user.userInfo.surname = this.registerForm.value.lastName;
    this.user.userInfo.email = this.registerForm.value.email;
    this.user.userInfo.password = this.registerForm.value.password;
    this.user.userInfo.idFirstLanguage = this.lang1.value.id;
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
