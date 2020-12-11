/*import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { UserPreferences } from './../_interfaces/userPreferences';
import { HttpClientModule } from '@angular/common/http';
import { User } from '../_interfaces/user';
import { WordsetService } from './wordset.service';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from  '@angular/common/http/testing';
import { UserInfo } from '../_interfaces/userInfo';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, 
        RouterModule, 
        RouterTestingModule,
        HttpClientTestingModule 
      ],
      providers: [WordsetService, UserPreferences,User, HttpTestingController ]
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

const preferance : UserPreferences = { "idColorSets":1,
"fontSize":null,
"noSound":null,
"noSight": null,
"randomExercises":true
}



}

 it('have userData', () => {
   localStorage.setItem("userData", JSON.stringify(user));
   expect(service.getUserData()).toEqual(user)
 })

/*getUserData(): User {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData)
      return userData;
  }*/
// });
    
