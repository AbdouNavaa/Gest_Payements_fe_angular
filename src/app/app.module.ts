import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';

import {  NavbarComponent } from './navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from "@angular/material/icon";

import { MatCardModule } from '@angular/material/card';
import { HomePageComponent } from './home-page/home-page.component';

import { LoginComponent } from './auth/login/login.component';

import { SignupComponent } from './auth/signup/signup.component';

import { EtudientFormComponent } from './etudient/etudient-form/etudient-form.component';
import { EtudientComponent } from './etudient/etudient/etudient.component';
import { NgxWebstorageModule } from 'ngx-webstorage';

import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from './admin/home/home.component';
import { TokenIntercepterService } from './services/token-intercepter.service';
import { VoteHomePageComponent } from './vote/vote-home-page/vote-home-page.component';
import { VoteSyndicatComponent } from './vote/vote-syndicat/vote-syndicat.component';
import { VoteSyndicatSelectComponent } from './vote/vote-syndicat-select/vote-syndicat-select.component';
import { VoteValideComponent } from './vote/vote-valide/vote-valide.component';
import { GestSyndModule} from "./gest-Synds/gest-synds.module";

@NgModule({
  declarations: [
    AppComponent,
    EtudientComponent,
    EtudientFormComponent,
    NavbarComponent,
    LoginComponent,
    HomePageComponent,
    SignupComponent,
    EtudientComponent,
    HomeComponent,
    VoteHomePageComponent,
    VoteSyndicatComponent,
    VoteSyndicatSelectComponent,
    VoteValideComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    HttpClientModule,
    ToastrModule,
    BrowserModule,
    NgxWebstorageModule.forRoot(),
    GestSyndModule,
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:TokenIntercepterService,multi:true}],
  bootstrap: [AppComponent],
})
export class AppModule {}
