import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {MatiereService} from "../../service/matiere.service";
import {Type} from "../../service/Type";
import {TypeService} from "../../service/type.service";

@Component({
  selector: 'app-add-matiere',
  templateUrl: './add-matiere.component.html',
})
export class AddMatiereComponent implements OnInit {

  bookForm: FormGroup;
  Types: Type[] = [];


  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: MatiereService,
    private typeService: TypeService,
  ) {
    this.bookForm = this.formBuilder.group({
      name: [''],
      coef: [''],
      taux: [''],
    })
  }

  ngOnInit() {
    this.typeService.GetAll().subscribe(res => {
      console.log(res)
      this.Types =res;
    });
  }

  onSubmit(): any {
    // Récupération des objets sélectionnés dans les champs de sélection
    const type = this.Types.find(m => m.name === this.bookForm.value.taux);

    // Mise à jour de la valeur des champs de sélection avec les objets sélectionnés
    this.bookForm.patchValue({
      taux: type,
    });
    this.crudService.Add(this.bookForm.value)
      .subscribe(() => {
        console.log('Data added successfully!')
        this.ngZone.run(() => this.router.navigateByUrl('/matieres-list'))
      }, (err) => {
        console.log(err);
      });
  }

}
