import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CoursService} from "../../service/cours.service";
import {Matiere} from "../../service/Matiere";
import {Prof} from "../../service/Prof";
import {MatiereService} from "../../service/matiere.service";
import {ProfService} from "../../service/prof.service";

@Component({
  selector: 'app-cours-detail',
  templateUrl: './cours-detail.component.html',
})
export class CoursDetailComponent implements OnInit {

  getId: any;
  updateForm: FormGroup;
  Matieres: Matiere[] = [];
  Profs: Prof[] = [];

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private crudService: CoursService,
    private matiereService: MatiereService,
    private profService: ProfService,
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');

    this.updateForm = this.formBuilder.group({
      matiere: [''],
      prof: [''],
      date: [''],
      Deb: [''],
      Fin: [''],
      CM: [''],
      TP: [''],
      TD: [''],
    })

    this.crudService.GetById(this.getId).subscribe(res => {
      this.updateForm.setValue({
        matiere:res['matiere'],
        prof:res['prof'],
        date:res['date'],
        Deb:res['Deb'],
        Fin:res['Fin'],
        CM:res['CM'],
        TP:res['TP'],
        TD:res['TD'],
      });
    });
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
  }

  selectedDate: Date = new Date();
  selectedDateFin: Date = new Date();
  selectedDateTime: string = this.selectedDate.toISOString().slice(0, 16);
  selectedDateTimeFin: string = this.selectedDateFin.toISOString().slice(0, 16);

  onChangeDate(event: any) {
    const date = event.target.value;
    this.updateForm.controls['Deb'].setValue(date + "T09:00");
    this.updateForm.controls['Fin'].setValue(date + "T10:30");
  }
  onUpdate(): any {

    const selectedDateTime = new Date(this.updateForm.value.Deb);
    const selectedDateTimeFin = new Date(this.updateForm.value.Fin);
    const duree = (selectedDateTimeFin.getTime() - selectedDateTime.getTime()) / 1000 / 60;
    const somme = (Number(this.updateForm.value.CM) + Number(this.updateForm.value.TP) + Number(this.updateForm.value.TD))*60;

    if (somme !== duree) {
      alert("La somme de CM, TP et TD doit être égale à la durée du cours !");
      console.log(duree,somme)
      return;
    }
    this.crudService.update(this.getId, this.updateForm.value)
      .subscribe(() => {
        console.log('Data updated successfully!')
        this.ngZone.run(() => this.router.navigateByUrl('/cours-list'))
      }, (err) => {
        console.log(err);
      });
  }

}
