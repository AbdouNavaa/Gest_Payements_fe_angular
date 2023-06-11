import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {TypeService} from "../../service/type.service";

@Component({
  selector: 'app-type-detail',
  templateUrl: './type-detail.component.html',
})
export class TypeDetailComponent  implements OnInit {

  getId: any;
  updateForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private crudService: TypeService
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');

    this.crudService.GetOne(this.getId).subscribe(res => {
      this.updateForm.setValue({
        name: res['name'],
        taux: res['taux']
      });
    });

    this.updateForm = this.formBuilder.group({
      name: [''],
      taux: [''],
    })
  }

  ngOnInit() { }

  onUpdate(): any {
    this.crudService.update(this.getId, this.updateForm.value)
      .subscribe(() => {
        console.log('Data updated successfully!')
        this.ngZone.run(() => this.router.navigateByUrl('/types-list'))
      }, (err) => {
        console.log(err);
      });
  }

}

