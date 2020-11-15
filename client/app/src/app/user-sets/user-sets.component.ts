import { Set } from './../_interfaces/set';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WordsetService } from '../_services/wordset.service';

@Component({
  selector: 'app-user-sets',
  templateUrl: './user-sets.component.html',
  styleUrls: ['./user-sets.component.css']
})
export class UserSetsComponent implements OnInit {

  constructor(
    private wordsetService: WordsetService,
    private router: Router
  ) { }

  userSets: Set[];

  ngOnInit(): void {
    this.userSets = new Array<Set>();
    this.getUserSets();
  }

  getUserSets(): void {
    this.wordsetService.getUserSets().subscribe(x => {
      console.log(x);
      this.userSets = x;
    })
  }

  goToDisplayView(id: string): void {
    this.wordsetService.setToDisplayId = id;
    this.router.navigateByUrl('/wordset/display');
  }

  goToLearnView(id: string): void {
    this.wordsetService.setToDisplayId = id;
    this.router.navigateByUrl('/wordset/learn');
  }
}
