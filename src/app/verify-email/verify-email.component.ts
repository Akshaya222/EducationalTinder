import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import{User} from '../shared/user';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  user:User=undefined;
  constructor(public authservice:AuthService) { }
  ngOnInit(): void {
    this.authservice.getCurrentUser().subscribe((user)=>{
      if(user){
        this.user=user;
      }else{
        this.user=null;
      }
    })
  }
  resendVerificationmail(){
    this.authservice.SendVerificationMail();
  }
}
