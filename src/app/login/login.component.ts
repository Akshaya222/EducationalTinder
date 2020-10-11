import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import{User} from '../shared/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public authservice:AuthService) { }
  ngOnInit(): void {
  }
  userSignIn(email:string,password:string){
      this.authservice.SignIn(email,password);
  }
  LoginwithGoogle(){
    this.authservice.GoogleAuth();
  }
}

