import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './admin/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

import { EtudientFormComponent } from './etudient/etudient-form/etudient-form.component';
import { EtudientComponent } from './etudient/etudient/etudient.component';

import { HomePageComponent } from './home-page/home-page.component';
import { VoteHomePageComponent } from './vote/vote-home-page/vote-home-page.component';
import { VoteSyndicatComponent } from './vote/vote-syndicat/vote-syndicat.component';
import {CandidatComponent} from "./gest-Synds/components/candida-list/candidats-list.component";
import {SyndsComponent} from "./gest-Synds/components/synd-list/synds-list.component";

const routes: Routes = [
  { path: 'register', component: EtudientFormComponent },
  { path: 'login', component: LoginComponent },
  { path: 'info', component: EtudientComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'admin', component: HomeComponent },
  { path: 'candidats', component: SyndsComponent },
  { path: 'vote/email', component: VoteHomePageComponent },
  { path: 'vote/syndicat', component: VoteSyndicatComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
