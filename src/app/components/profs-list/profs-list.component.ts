import {Component, OnInit} from '@angular/core';
import {Prof} from "../../service/Prof";
import {ProfService} from "../../service/prof.service";
import {Router} from "@angular/router";
import {CoursService} from "../../service/cours.service";

@Component({
  selector: 'app-profs-list',
  templateUrl: './profs-list.component.html',
})
export class ProfsListComponent implements OnInit{

  Profs:Prof[] = [];
  searchTerm: string = '';


  constructor(private crudService: ProfService,
              private router: Router,
              private coursService: CoursService
  ) { }

  ngOnInit(): void {
    this.crudService.GetProfs().subscribe(res => {
      console.log(res)
      this.Profs =res;
    });
  }

  delete(id:any, i:any) {
    console.log(id);
    if(window.confirm('Do you want to go ahead?')) {
      this.crudService.deleteProf(id).subscribe((res) => {
        this.Profs.splice(i, 1);
      })
    }
  }
  getCours(id: String) {
    this.coursService.getCoursByProf(id).subscribe(res => {
      console.log(res);
      const coursDuProf = res.filter(cours => cours.prof._id === id);
      // Afficher les cours du prof récupérés dans une boîte de dialogue ou dans un autre composant
      this.router.navigateByUrl(`/cours/prof/${id}`);
    });
  }




}
