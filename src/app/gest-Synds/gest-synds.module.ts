import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SyndsComponent} from './components/synd-list/synds-list.component';
import {CandidatComponent} from './components/candida-list/candidats-list.component';
import {  GestSyndRoutingModule} from "./gest-synds-routing.module";
import { SyndicatService} from "./services/synd.service";
import {SharedModule} from "../common/shared/shared.module";


@NgModule({
  declarations: [
    SyndsComponent,
    CandidatComponent,
  ],
  imports: [
    CommonModule,
    GestSyndRoutingModule,
    SharedModule
  ],
  exports: [
    CandidatComponent
  ],
  providers: [
    SyndicatService,
  ]
})
export class GestSyndModule { }
