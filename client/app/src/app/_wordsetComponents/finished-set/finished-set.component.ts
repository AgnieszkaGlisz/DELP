import { WordsetService } from './../../_services/wordset.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-finished-set',
  templateUrl: './finished-set.component.html',
  styleUrls: ['./finished-set.component.css']
})
export class FinishedSetComponent implements OnInit {

  constructor(
    private wordsetService: WordsetService
  ) { }

  correctExercises: number;
  numberOfExercises: number;

  ngOnInit(): void {
    this.correctExercises = this.wordsetService.correctExercises;
    this.numberOfExercises = this.wordsetService.numberOfExercises;
  }

}
