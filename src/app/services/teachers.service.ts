import { Injectable } from '@angular/core';
import {Teacher} from '../shared/teacher';
import {TEACHERS} from '../shared/teachers';
import{of,Observable} from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {
  teachers:Teacher[];
  constructor() { }
  getTeachers():Teacher[]{
    return TEACHERS;
  }
  getTeacherById(id:string):Observable<Teacher>{
    return of(TEACHERS.filter((teacher)=>(teacher.id===id))[0]);
  }
  getTeacherIds():Observable<string[]|any>{
    return of(TEACHERS.map((teacher)=>teacher.id));
  }
}
