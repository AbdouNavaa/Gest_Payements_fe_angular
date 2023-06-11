import {Component, OnInit} from '@angular/core';
import {MatiereService} from "../../service/matiere.service";
import {Matiere} from "../../service/Matiere";

@Component({
  selector: 'app-matieres-list',
  templateUrl: './matieres-list.component.html',
})
export class MatieresListComponent implements OnInit {

  Matieres:Matiere[] = [];

  constructor(private crudService: MatiereService) { }

  ngOnInit(): void {
    this.crudService.GetAll().subscribe(res => {
      console.log(res)
      this.Matieres =res;
    });
  }

  delete(id:any, i:any) {
    console.log(id);
    if(window.confirm('Do you want to go ahead?')) {
      this.crudService.delete(id).subscribe((res) => {
        this.Matieres.splice(i, 1);
      })
    }
  }

}
