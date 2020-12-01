import { Set } from './../_interfaces/set';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WordsetService } from '../_services/wordset.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-user-sets',
  templateUrl: './user-sets.component.html',
  styleUrls: ['./user-sets.component.css']
})
export class UserSetsComponent implements OnInit {

  constructor(
    private wordsetService: WordsetService,
    private router: Router,
    public userService: UserService
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
        Object.assign(this.userSets[index], set);
        index++;
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

  goToCreateWordsetView(): void {
    this.router.navigateByUrl('/wordset/create');
  }

  goToCreateLessonView(): void {
    this.router.navigateByUrl('/lesson/create');
  }

  deleteSet(id: string): void {
    this.wordsetService.deleteSet(id).subscribe(x => {
      this.getUserSets();
    });
    // this.userSets = new Array<Set>();
  }

  
  openSet(id){
    $('#set'+id + ' .popwindow').removeClass('invisible')    
  }
  closeSet(id){
    $('#set'+id + ' .popwindow').addClass('invisible')
  }

  likeSet(id){
    var setid = '#set'+id
    var img = setid + ' .star > img'
    var likes = setid + ' .numoflikes'
    
    if($(img).attr('src') == "../assets/icons/like.png"){
      $(img).attr("src","../assets/icons/nolike.png")
      var num = parseInt($.trim($(likes).html()))
      $(likes).html((--num).toString())
    }
    else{
      $(img).attr("src","../assets/icons/like.png")
      var num = parseInt($.trim($(likes).html()))
      $(likes).html((++num).toString())
    }
  }



}
