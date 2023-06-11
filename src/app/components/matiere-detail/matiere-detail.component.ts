import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MatiereService} from "../../service/matiere.service";
import {Type} from "../../service/Type";
import {TypeService} from "../../service/type.service";

@Component({
  selector: 'app-matiere-detail',
  templateUrl: './matiere-detail.component.html',
})
export class MatiereDetailComponent implements OnInit {

  getId: any;
  updateForm: FormGroup;
  Types: Type[] = [];

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private crudService: MatiereService,
    private typeService: TypeService,
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');

    this.crudService.GetById(this.getId).subscribe(res => {
      this.updateForm.setValue({
        name: res['name'],
        coef: res['coef'],
        taux: res['taux']
      });
    });

    this.updateForm = this.formBuilder.group({
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

  onUpdate(): any {
    this.crudService.update(this.getId, this.updateForm.value)
      .subscribe(() => {
        console.log('Data updated successfully!')
        this.ngZone.run(() => this.router.navigateByUrl('/matieres-list'))
      }, (err) => {
        console.log(err);
      });
  }

}
