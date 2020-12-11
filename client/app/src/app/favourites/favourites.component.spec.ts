import { User } from './../_interfaces/user';

import { AppModule } from './../app.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavouritesComponent } from './favourites.component';
import { UserPreferences } from '../_interfaces/userPreferences';

describe('FavouritesComponent', () => {
  let component: FavouritesComponent;
  let fixture: ComponentFixture<FavouritesComponent>;

  const preference : UserPreferences = { "idColorSets":1,
  "fontSize":null,
  "noSound":null,
  "noSight": null,
  "randomExercises":true
  }
  
  const user : User = {
    id:1,
    "userInfo":{
      "username": "test",
      "password": "test",
      "email": "test@test.test",
      "name": "Test",
      "surname": "Test",
      "birthday": "2010-10-10",
      "idFirstLanguage": 1
    },
    "preferences": preference
  }
  
  localStorage.setItem("userData", JSON.stringify(user));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavouritesComponent ],
      imports: [AppModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return favourites', () => {

  })
});
