import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public authservice:AuthService) { }

  ngOnInit(): void {
  }
  userSignUp(email:string,password:string){
    this.authservice.SignUp(email,password);
  }
  LoginwithGoogle(){
    this.authservice.GoogleAuth();
  }
}
