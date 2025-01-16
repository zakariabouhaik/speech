import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SpeechComponent } from './speech/speech.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
},
{
  path: 'register',
  component: RegisterComponent
},
{
    path: '',
    canActivate: [authGuard],
    children: [
        {
            path: 'dashboard',
            component: DashboardComponent
        },
        {
            path: 'speech',
            component: SpeechComponent,
        }
    ]
}
];
