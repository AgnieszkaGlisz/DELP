import { MessageService } from '../_services/message.service';
import { UserService } from '../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../_interfaces/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(
    private userService: UserService,
    private messageService: MessageService
  ) { }
  allUsers: User[];
  userInfo: User;

  ngOnInit(): void {
    this.getUserInfo();
    // this.getUserInfo();
    // console.log(this.allUsers[0].name);
  }


  getUserInfo(): void {
    let id: number = 1;
    this.messageService.add('getUserInfo()');
    // this.userService.getUserInfo(id).subscribe(users => console.log(users));
    // this.userService.getUserInfo(id).subscribe(users => this.allUsers = users);

    // console.log(this.allUsers[0].name);
  }

}
