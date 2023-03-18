import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SyndsComponent} from "./components/synd-list/synds-list.component";

const routes: Routes = [
  {
    path: "",
    component: SyndsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestSyndRoutingModule { }
