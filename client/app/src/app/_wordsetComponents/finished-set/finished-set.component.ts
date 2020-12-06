import { WordsetService } from './../../_services/wordset.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-finished-set',
  templateUrl: './finished-set.component.html',
  styleUrls: ['./finished-set.component.css']
})

export class FinishedSetComponent implements OnInit {

  constructor(
    public userService: UserService,
    private router: Router,
    private wordsetService: WordsetService,
    private app: AppComponent,
  ) { 
    
  }

  correctExercises: number;
  numberOfExercises: number;

  ngOnInit(): void {
    this.correctExercises = this.wordsetService.correctExercises
    this.numberOfExercises = this.wordsetService.numberOfExercises;
    console.log("CORRECT: " + this.correctExercises)
    console.log("ALL: " + this.numberOfExercises)
    
  }

  ngAfterViewInit(): void {
    let percent = (this.correctExercises/this.numberOfExercises)*100
    $(".chartgood").width(percent+"%")
  }

  
}
