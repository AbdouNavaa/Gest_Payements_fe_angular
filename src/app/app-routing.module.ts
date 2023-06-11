import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ProfsListComponent} from "./components/profs-list/profs-list.component";
import {ProfDetailComponent} from "./components/prof-detail/prof-detail.component";
import {AddProfComponent} from "./components/add-prof/add-prof.component";
import {MatieresListComponent} from "./components/matieres-list/matieres-list.component";
import {AddMatiereComponent} from "./components/add-matiere/add-matiere.component";
import {MatiereDetailComponent} from "./components/matiere-detail/matiere-detail.component";
import {CoursListComponent} from "./components/cours-list/cours-list.component";
import {AddCoursComponent} from "./components/add-cours/add-cours.component";
import {CoursDetailComponent} from "./components/cours-detail/cours-detail.component";
import {ProfCoursListComponent} from "./components/prof-cours-list/prof-cours-list.component";
import {CourPeriodeComponent} from "./components/cour-periode/cour-periode.component";
import {TypeListComponent} from "./components/type-list/type-list.component";
import {AddTypeComponent} from "./components/add-type/add-type.component";
import {TypeDetailComponent} from "./components/type-detail/type-detail.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'prof-list' },

  { path: 'profs-list', component: ProfsListComponent },
  { path: 'matieres-list', component: MatieresListComponent },
  { path: 'cours-list', component: CoursListComponent },
  { path: 'types-list', component: TypeListComponent },
  { path: 'cours-periode', component: CourPeriodeComponent },
  { path: 'DashBoard', component: DashboardComponent },

  { path: 'add-prof', component: AddProfComponent },
  { path: 'add-matiere', component: AddMatiereComponent },
  { path: 'add-type', component: AddTypeComponent },
  { path: 'add-cours', component: AddCoursComponent },

  { path: 'edit-prof/:id', component: ProfDetailComponent },
  { path: 'edit-matiere/:id', component: MatiereDetailComponent },
  { path: 'edit-type/:id', component: TypeDetailComponent },
  { path: 'edit-cours/:id', component: CoursDetailComponent },

  { path: 'cours/prof/:id', component: ProfCoursListComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
