import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cours } from "../../service/cours";
import { CoursService } from "../../service/cours.service";

@Component({
  selector: 'app-prof-cours-list',
  templateUrl: './prof-cours-list.component.html',
  styleUrls: ['./prof-cours-list.component.css']
})
export class ProfCoursListComponent implements OnInit {

  profId: string = '';
  courses: Cours[] = [];
  total: number = 0;
  Deb!: string;
  Fin!: string;

  constructor(private route: ActivatedRoute, private crudService: CoursService) {
  }

  sortByDate() {
    this.courses.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }
  sortByDateDesc() {
    this.courses.sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime());
  }
  ngOnInit(): void {
    // Récupérer l'ID du professeur dans l'URL
    this.route.paramMap.subscribe(params => {
      this.profId = params.get('id') || '';
      // Charger tous les cours du professeur correspondant
      this.crudService.getCoursByProf(this.profId).subscribe(res => {
        console.log(res)
        this.courses = res;
        this.sortByDate()
      });
    });
  }

  delete(id: any, i: any) {
    console.log(id);
    if (window.confirm('Do you want to go ahead?')) {
      this.crudService.delete(id).subscribe((res) => {
        this.courses.splice(i, 1);
      })
    }
  }

  async getTotal(startDate: string, endDate: string) {
    const response = await this.crudService.getTotalById(this.profId, startDate, endDate).toPromise();
    this.total = response.total;
  }

}
  // async getTotal(dateDeb
