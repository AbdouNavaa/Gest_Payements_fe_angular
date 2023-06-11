import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {TypeService} from "../../service/type.service";

@Component({
  selector: 'app-add-type',
  templateUrl: './add-type.component.html',

})
export class AddTypeComponent implements OnInit {

  bookForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: TypeService
  ) {
    this.bookForm = this.formBuilder.group({
      name: [''],
      taux: [''],
    })
  }

  ngOnInit() { }

  onSubmit(): any {
    this.crudService.Add(this.bookForm.value)
      .subscribe(() => {
        console.log('Data added successfully!')
        this.ngZone.run(() => this.router.navigateByUrl('/types-list'))
      }, (err) => {
        console.log(err);
      });
  }

}
