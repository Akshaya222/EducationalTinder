import { Component, OnInit } from '@angular/core';
import{AuthService} from '../services/auth.service';
import{User} from '../shared/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public authservice:AuthService) { }
  ngOnInit(): void {
  }

}
