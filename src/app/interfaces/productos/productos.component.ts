import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Productoservice } from 'src/app/services/productoservice.model';
import { ProductoserviceService } from 'src/app/services/productoservice.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit{

  constructor(public service:ProductoserviceService,
    private toastr: ToastrService) { } 

  ngOnInit(): void {
    this.service.refreshList();
  }

  populateForm(selectedRecord:Productoservice){
    this.service.formData = Object.assign({}, selectedRecord);
  }

    onDelete(id:number){
      if(confirm('¿Seguro que desea eliminar producto?')){
      this.service.deleteProducto(id)
      .subscribe(
        res => {
          this.service.refreshList();
          this.toastr.error("Eliminación realizada", "Producto eliminado")
        },
        err => {console.log(err)}
      )}
    }

  
}
