import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {MatiereService} from "../../service/matiere.service";
import {CoursService} from "../../service/cours.service";
import {Matiere} from "../../service/Matiere";
import {Prof} from "../../service/Prof";
import {ProfService} from "../../service/prof.service";

@Component({
  selector: 'app-add-cours',
  templateUrl: './add-cours.component.html',
})
export class AddCoursComponent implements OnInit {

  bookForm: FormGroup;

  Matieres: Matiere[] = [];
  Profs: Prof[] = [];

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CoursService,
    private matiereService: MatiereService,
    private profService: ProfService,
  ) {
    this.bookForm = this.formBuilder.group({
      date: [''],
      Deb: [''],
      Fin: [''],
      CM: [''],
      TP: [''],
      TD: [''],
      matiere: [''],
      prof: ['']
    })
  }



  ngOnInit() {
    this.matiereService.GetAll().subscribe(res => {
      console.log(res)
      this.Matieres =res;
    });
    this.profService.GetProfs().subscribe(res => {
      console.log(res)
      this.Profs =res;
    });
    this.updateDateTime();
  }

  updateDateTime() {
    const date = this.selectedDate.toISOString().slice(0, 10);
    const time = new Date().toLocaleTimeString().slice(0, 5);
    this.selectedDateTime = `${date}T${time}`;
  }
  selectedDate: Date = new Date();
  selectedDateFin: Date = new Date();
  selectedDateTime: string = this.selectedDate.toISOString().slice(0, 16);
  selectedDateTimeFin: string = this.selectedDateFin.toISOString().slice(0, 16);

  onChangeDate(event: any) {
    const date = event.target.value;
    this.bookForm.controls['Deb'].setValue(date + "T09:00");
    this.bookForm.controls['Fin'].setValue(date + "T10:30");
  }

  onSubmit(): any {
    // Récupération des objets sélectionnés dans les champs de sélection
    const matiereSelectionnee = this.Matieres.find(m => m.name === this.bookForm.value.matiere);
    const profSelectionne = this.Profs.find(p => p.nom === this.bookForm.value.prof);

    // Mise à jour de la valeur des champs de sélection avec les objets sélectionnés
    this.bookForm.patchValue({
      matiere: matiereSelectionnee,
      prof: profSelectionne
    });

    const selectedDateTime = new Date(this.bookForm.value.Deb);
    const selectedDateTimeFin = new Date(this.bookForm.value.Fin);
    const duree = (selectedDateTimeFin.getTime() - selectedDateTime.getTime())/3600;
    const somme = (Number(this.bookForm.value.CM) + Number(this.bookForm.value.TP) + Number(this.bookForm.value.TD))*1000;

    if (somme !== duree) {
      alert("La somme de CM, TP et TD doit être égale à la durée du cours !");
      console.log(duree,somme)
      return;
    }

    // Ajout du cours avec les valeurs sélectionnées pour la matière et le professeur
    this.crudService.Add(this.bookForm.value)
      .subscribe(() => {
        console.log('Data added successfully!')
        this.ngZone.run(() => this.router.navigateByUrl('/cours-list'))
      }, (err) => {
        console.log(err);
      });
  }

}
