import {Component, OnInit} from '@angular/core';
import {TypeService} from "../../service/type.service";
import {Type} from "../../service/Type";

@Component({
  selector: 'app-type-list',
  templateUrl: './type-list.component.html',
})
export class TypeListComponent  implements OnInit {

  Types:Type[] = [];

  constructor(private crudService: TypeService) { }

  ngOnInit(): void {
    this.crudService.GetAll().subscribe(res => {
      console.log(res)
      this.Types =res;
    });
  }

  delete(id:any, i:any) {
    console.log(id);
    if(window.confirm('Do you want to go ahead?')) {
      this.crudService.delete(id).subscribe((res) => {
        this.Types.splice(i, 1);
      })
    }
  }
}
