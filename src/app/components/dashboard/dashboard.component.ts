import {Component, NgZone, OnInit} from '@angular/core';
import {Cours} from "../../service/cours";
import {Prof} from "../../service/Prof";
import {Matiere} from "../../service/Matiere";
import {CoursService} from "../../service/cours.service";
import {ProfService} from "../../service/prof.service";
import {MatiereService} from "../../service/matiere.service";
import {Router} from "@angular/router";
import {TypeService} from "../../service/type.service";
import {Type} from "../../service/Type";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit{
  Courses: Cours[] = [];
  Profs: Prof[] = [];
  Matieres: Matiere[] = [];
  Types: Type[] = [];

  constructor(
    private crudService: CoursService,
    private profService: ProfService,
    private router: Router,
    private ngZone: NgZone,
    private matiereService: MatiereService,
    private typeService: TypeService,
              ) {}

  ngOnInit(): void {

    this.crudService.GetAll().subscribe((res) => {
      console.log(res);
      this.Courses = res;
    });
    this.profService.GetProfs().subscribe((res) => {
      console.log(res);
      this.Profs = res;
    });

    this.matiereService.GetAll().subscribe((res) => {
      console.log(res);
      this.Matieres = res;
    });
    this.typeService.GetAll().subscribe((res) => {
      console.log(res);
      this.Types = res;
    });
  }

  profs(): any {
        this.ngZone.run(() => this.router.navigateByUrl('/profs-list'))
  }

  Cours(): any {
    this.ngZone.run(() => this.router.navigateByUrl('/cours-list'))
  }

  matieres(): any {
    this.ngZone.run(() => this.router.navigateByUrl('/matieres-list'))
  }

  types(): any {
    this.ngZone.run(() => this.router.navigateByUrl('/types-list'))
  }

}
