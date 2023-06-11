import {Component, OnInit} from '@angular/core';
import { Cours } from "../../service/cours";
import { CoursService } from "../../service/cours.service";

@Component({
  selector: 'app-cours-list',
  templateUrl: './cours-list.component.html',
  styleUrls: ['./cours-list.component.css']
})
export class CoursListComponent implements OnInit {
  Courses: Cours[] = [];
  total: number = 0;
  Deb!: string;
  Fin!: string;
  searchTerm: string = '';
  totalCours: number = 0; // Le nombre total de cours dans la liste
  currentPage: number = 1; // Le numéro de la page courante
  pageSize: number = 5; // Le nombre de cours affichés par page

  constructor(private crudService: CoursService) {}

  ngOnInit(): void {
    this.crudService.GetAll().subscribe((res) => {
      console.log(res);
      this.sortByDate();
      this.Courses = res;
      // this.totalCours = this.Courses.length;
    });
  }
  sortByDate() {
    this.Courses.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }

  sortByDateDesc() {
    this.Courses.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  async getTotal(dateDeb: string, dateFin: string) {
    const response = await this.crudService.getTotal(dateDeb, dateFin).toPromise();
    this.total = response.total;
  }

  onPageChange(event: any) {
    this.currentPage = event;
  }

  delete(id: any, i: any) {
    console.log(id);
    if (window.confirm("Do you want to go ahead?")) {
      this.crudService.delete(id).subscribe((res) => {
        this.Courses.splice(i, 1);
      });
    }
  }
}



