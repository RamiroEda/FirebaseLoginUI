import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { IndexComponent } from './components/index/index.component';
import { redirectLoggedInTo, redirectUnauthorizedTo, canActivate } from '@angular/fire/auth-guard';


const redirectToIndex = ()=>redirectLoggedInTo(['index']);
const redirectToLogin = ()=>redirectUnauthorizedTo(['login']);


const routes: Routes = [
  { path: 'login', component: LoginComponent, ...canActivate(redirectToIndex)},
  { path: 'index', component: IndexComponent, ...canActivate(redirectToLogin)},
  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
