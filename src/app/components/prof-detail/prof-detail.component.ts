import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ProfService} from "../../service/prof.service";

@Component({
  selector: 'app-prof-detail',
  templateUrl: './prof-detail.component.html',
})
export class ProfDetailComponent implements OnInit {

  getId: any;
  updateForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private crudService: ProfService
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');

    this.crudService.GetProf(this.getId).subscribe(res => {
      this.updateForm.setValue({
        nom: res['nom'],
        prenom: res['prenom'],
        email: res['email'],
        tel: res['tel'],
        Banque: res['Banque'],
        Compte: res['Compte'],
      });
    });

    this.updateForm = this.formBuilder.group({
      nom: [''],
      prenom: [''],
      email: [''],
      tel: [''],
      Banque: [''],
      Compte: [''],
    })
  }

  ngOnInit() { }

  onUpdate(): any {
    this.crudService.updateProf(this.getId, this.updateForm.value)
      .subscribe(() => {
        console.log('Data updated successfully!')
        this.ngZone.run(() => this.router.navigateByUrl('/profs-list'))
      }, (err) => {
        console.log(err);
      });
  }

}
