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
    this.getUserSets();
  }

  getUserSets(): void {
    this.userSets = new Array<Set>();
    this.wordsetService.getUserSets().subscribe(x => {
    this.userSets = new Array<Set>();
    Object.assign(this.userSets, x);
      let index = 0;
      x.forEach(set => {
        this.userSets[index] = new Set();
        Object.assign(this.userSets[index++], set);
      });
    });
  }

  goToDisplayView(id: string): void {
    this.wordsetService.setToDisplayId = id;
    this.router.navigateByUrl('/wordset/display');
  }

  goToLearnView(id: string): void {
    this.wordsetService.setToDisplayId = id;
    this.router.navigateByUrl('/wordset/learn');
  }

  deleteSet(id: string): void {
    this.wordsetService.deleteSet(id).subscribe(x => {
      this.getUserSets();
    });
    // this.userSets = new Array<Set>();
  }

}
