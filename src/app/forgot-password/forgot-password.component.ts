import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(public authervice:AuthService) { }

  ngOnInit(): void {
  }
 forgotpassword(email:string){
   this.authervice.ForgotPassword(email);
 }
}
