import {CoursPeriodeService} from "../../service/cours-periode.service";
import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
@Component({
  selector: 'app-cour-periode',
  templateUrl: './cour-periode.component.html',
  styleUrls: ['./cour-periode.component.css']
})
export class CourPeriodeComponent implements OnInit {
  coursList!: any;
  coursListForm: FormGroup;
  selectedDate: Date = new Date();
  selectedDateFin: Date = new Date();
  dateDeb: string = '2023-01-01';
  dateFin: string = '2023-05-10';


  constructor(private formBuilder: FormBuilder, private apiService: CoursPeriodeService) {
    this.coursListForm = this.formBuilder.group({
      dateDeb: this.dateDeb,
      dateFin: this.dateFin
    });

  }


  ngOnInit() {
    this.getCoursList();
  }


  totalAvecMontantSum: number = 0;
  totalAvecHeureSum: number = 0;
  totalAvecTauxSum: number = 0;





  isMultipleCours(cours: any) {
    return this.coursList.filter((c: { nom: any; }) => c.nom === cours.nom).length > 1;
  }
  hasOneCours(cours: any) {
    return this.coursList.filter((c: { nom: any; }) => c.nom === cours.nom).length === 1;
  }
  nbCours = 0;
  getCoursList() {
    this.apiService.getCours(this.dateDeb, this.dateFin).subscribe((data) => {
      this.coursList = data;
      this.selectedDate = new Date(this.dateDeb);
      this.selectedDateFin = new Date(this.dateFin);


      // Calculer le montant total pour chaque prof
      const totalParProf = this.coursList.reduce((acc:any, cours=this.coursList) => {
        const prof = `${cours.nom} ${cours.prenom}`;
        if (acc[prof]) {
          acc[prof] += cours.totalAvecTaux;
        } else {
          acc[prof] = cours.totalAvecTaux;
        }
        return acc;
      }, {});
      const totalHeuresParProf = this.coursList.reduce((acc:any, cours=this.coursList) => {
        const prof = `${cours.nom} ${cours.prenom}`;
        if (acc[prof]) {
          acc[prof] += cours.total;
        } else {
          acc[prof] = cours.total;
        }
        return acc;
      }, {});

      // Ajouter le montant total pour chaque prof dans l'objet coursList
      this.coursList.forEach((cours=this.coursList) => {
        const prof = `${cours.nom} ${cours.prenom}`;
        cours.totalProf = totalParProf[prof];
        cours.totalP = totalHeuresParProf[prof];
      });

      console.log(this.coursList);

      this.coursList.sort((a: any, b: any) => {
        const nomComparison = a.nom.toLowerCase().localeCompare(b.nom.toLowerCase());
        if (nomComparison !== 0) {
          return nomComparison;
        }
        return a.Taux - b.Taux;
      });

      // Calculer les totaux pour la table
      this.totalAvecHeureSum = this.coursList.reduce((sum: number, cours=this.coursList) => sum + cours.total, 0);
      this.totalAvecMontantSum = this.coursList.reduce((sum: number, cours=this.coursList) => sum + cours.totalAvecTaux, 0);
    });
  }

}

