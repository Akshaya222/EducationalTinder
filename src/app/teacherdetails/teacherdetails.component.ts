import { Component, Input, OnInit,ViewChild } from '@angular/core';
import{Teacher} from '../shared/teacher';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import{TeachersService} from '../services/teachers.service';
import { switchMap } from 'rxjs/operators';
import{ FormBuilder,FormGroup,Validators} from '@angular/forms';
import {Comment} from '../shared/comment';
import {AuthService} from '../services/auth.service';
import {User} from '../shared/user';


@Component({
  selector: 'app-teacherdetails',
  templateUrl: './teacherdetails.component.html',
  styleUrls: ['./teacherdetails.component.css']
})
export class TeacherdetailsComponent implements OnInit {
  @ViewChild('cform') commentDirective;
  commentForm:FormGroup; //for form
  comments:Comment; //for form

  teacherIds:string[];
  teacher:Teacher;
  next:string;
  previous:string;
  user:User=undefined;
  constructor(public teachersservice:TeachersService,
    public route:ActivatedRoute,
    public location:Location,
    private fb:FormBuilder,
    public authservice:AuthService) {
      this.createForm();  //for form
    }
  //  this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    //this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
    //.subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
  ngOnInit(): void {
    this.teachersservice.getTeacherIds().subscribe(teacherIds=>this.teacherIds=teacherIds);
    this.route.params.pipe(switchMap((params:Params)=>this.teachersservice.getTeacherById(params['id'])))
    .subscribe(teacher=>{this.teacher=teacher;this.setPrevNext(teacher.id);});

    this.authservice.getCurrentUser().subscribe((user)=>{
      if(user){
        this.user=user
        console.log("user id",this.user.uid);
      }
      else{
        console.log("not logged in");
        this.user=null;
      } })
  }
  setPrevNext(id:string){
      const index=this.teacherIds.indexOf(id);
      this.next=this.teacherIds[(this.teacherIds.length+index+1) % this.teacherIds.length];
      this.previous=this.teacherIds[(this.teacherIds.length+index-1) % this.teacherIds.length];
  }
  goBack(){
    this.location.back();
  }
  createForm(){
    this.commentForm=this.fb.group({
      author:['',[Validators.required, Validators.minLength(2) ] ],
      rating:'5',
      comment:['', Validators.required ],
      date:''
    })
    this.commentForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

  this.onValueChanged(); // (re)set validation messages now

  }
  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }


  formErrors = {
    'author': '',
    'comment': '',
  };

  validationMessages = {
    'author': {
      'required': 'Author Name is required.',
      'minlength': 'Author Name must be at least 2 characters long.',
    },
    'comment': {
      'required': 'comment is required.',
    },
  };
  onSubmit(){
    var date=new Date().toISOString();
    this.commentForm.value.date=date;
    this.comments=this.commentForm.value;
    console.log(this.comments);
    this.commentForm.reset({
      author:'',
      rating:'5',
      comment:'',
      date:''
    });
    this.commentDirective.resetForm({rating:'5'});
  }
}

