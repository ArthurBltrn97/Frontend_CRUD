import { Component, OnInit, NgModule } from '@angular/core';
import { ProductoserviceService } from 'src/app/services/productoservice.service';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Productoservice } from '../../services/productoservice.model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-productosform',
  templateUrl: './productos-form.component.html',
  styleUrls: ['./productos-form.component.css']
})
export class ProductosformComponent implements OnInit {
  Productoservice: any;
  formBuilder: any;
  
  estatusOptions = ['Activo', 'Cancelado'];
  estatus = 'Estatus';

  constructor(public service: ProductoserviceService,
    private toastr: ToastrService ){  }

  ngOnInit(): void { } 


  onSubmit(form:NgForm) {
    if(this.service.formData.id == 0)
     this.insertRecord(form);
    else
      this.updateRecord(form);

  }

  insertRecord(form:NgForm){
    this.service.postProducto()
    .subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.success('Registro completado', 'Producto registrado');
      },
      err => {console.log(err);}
    );
  }

  updateRecord(form:NgForm){
    this.service.putProducto()
    .subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.info('Actualización completadada', 'Producto actualizado');
      },
      err => {console.log(err);}
    );

  }

  resetForm(form:NgForm){
    form.form.reset();
    this.service.formData = new Productoservice(); 
  }
}
