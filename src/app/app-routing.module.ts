import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { PurchaseListComponent } from './components/purchase-list/purchase-list.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'movie/:id', component: MovieDetailsComponent },
  { path: 'purchases', component: PurchaseListComponent },
  { path: 'list/:category', component: MovieListComponent},
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }