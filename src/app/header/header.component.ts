import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import{User} from '../shared/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 issignedin:boolean;
 user:User=undefined;
  constructor(public authservice:AuthService) {
}
ngOnInit(): void {
  this.issignedin=this.authservice.LoggedIn();
  this.authservice.getCurrentUser().subscribe((user)=>{
    if(user){
      this.user=user
      console.log("user id",this.user.uid);
    }
    else{
      console.log("not logged in");
      this.user=null;
    }
 })


}
signout(){
    this.authservice.Signout();
    this.issignedin=false;
    console.log("user logged out");
    this.user=null;
  }


}
