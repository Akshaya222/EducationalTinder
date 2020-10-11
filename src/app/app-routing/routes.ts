import { Routes } from '@angular/router';

import{LoginComponent} from '../login/login.component';
import{RegisterComponent} from '../register/register.component';
import{TeachersComponent} from '../teachers/teachers.component';
import{HomeComponent} from '../home/home.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { VerifyEmailComponent } from '../verify-email/verify-email.component';
import { TeacherdetailsComponent } from '../teacherdetails/teacherdetails.component';



export const routes: Routes = [
  { path: 'teachers',  component: TeachersComponent },
  { path: 'login',     component: LoginComponent },
  { path: 'register',     component: RegisterComponent },
  {path:'home',component:HomeComponent},
  //{path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'forgot-password',component:ForgotPasswordComponent},
  {path:'verify-email',component:VerifyEmailComponent},
  { path: 'teacherdetails/:id',     component: TeacherdetailsComponent }

];
