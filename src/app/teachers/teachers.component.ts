import { Component, OnInit } from '@angular/core';
import{Teacher} from '../shared/teacher';
import {TeachersService} from '../services/teachers.service';


@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {

  constructor(public teachersservice:TeachersService) { }
  teachers:Teacher[]
  ngOnInit(): void {
    this.teachers=this.teachersservice.getTeachers();
  }

  selectedTeacher:Teacher;
  selectedteacher(teacher:Teacher){
   this.selectedTeacher=teacher;
  }
}
