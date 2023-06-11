import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {  NavbarComponent } from './navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from "@angular/material/icon";

import { MatCardModule } from '@angular/material/card';
import { HomePageComponent } from './home-page/home-page.component';

import { LoginComponent } from './auth/login/login.component';

import { SignupComponent } from './auth/signup/signup.component';

import { NgxWebstorageModule } from 'ngx-webstorage';

import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from './admin/home/home.component';
import { ProfsListComponent } from './components/profs-list/profs-list.component';
import { ProfDetailComponent } from './components/prof-detail/prof-detail.component';
import { AddProfComponent } from './components/add-prof/add-prof.component';
import { AddMatiereComponent } from './components/add-matiere/add-matiere.component';
import { MatiereDetailComponent } from './components/matiere-detail/matiere-detail.component';
import { MatieresListComponent } from './components/matieres-list/matieres-list.component';
import { AddCoursComponent } from './components/add-cours/add-cours.component';
import { CoursDetailComponent } from './components/cours-detail/cours-detail.component';
import { CoursListComponent } from './components/cours-list/cours-list.component';
import { ProfCoursListComponent } from './components/prof-cours-list/prof-cours-list.component';
import {CourPeriodeComponent} from "./components/cour-periode/cour-periode.component";
import {SharedModule} from "./common/shared/shared.module";
import { FilterPipe } from './filter.pipe';
import { FilterByDatePipe } from './filter-by-date.pipe';
import { FilterCoursPipe } from './filter-cours.pipe';
import { AddTypeComponent } from './components/add-type/add-type.component';
import { TypeDetailComponent } from './components/type-detail/type-detail.component';
import { TypeListComponent } from './components/type-list/type-list.component';
import { FilterCPPipe } from './filter-cp.pipe';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomePageComponent,
    SignupComponent,
    HomeComponent,
    ProfsListComponent,
    ProfDetailComponent,
    AddProfComponent,
    AddMatiereComponent,
    MatiereDetailComponent,
    MatieresListComponent,
    AddCoursComponent,
    CoursDetailComponent,
    CoursListComponent,
    ProfCoursListComponent,
    CourPeriodeComponent,
    FilterPipe,
    FilterByDatePipe,
    FilterCoursPipe,
    AddTypeComponent,
    TypeDetailComponent,
    TypeListComponent,
    FilterCPPipe,
    DashboardComponent,
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
    SharedModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
