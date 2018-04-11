import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from '../../servicios/proveedores.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-listado-prov',
  templateUrl: './listado-prov.component.html',
  styleUrls: ['./listado-prov.component.css'],
  animations: [
    trigger('alerta', [ // desencadenante lo llamamos alerta porque así la hemos definido en el html
      state('show', style({opacity: 1})), // aplicamos el estilo definido en este caso para hacerlo visible
      state('hide', style({opacity: 0})), // aplicamos el estilo para hacerlo invisible
      transition('show => hide', animate('500ms ease-out')), // aplicamos la transicion de visible a hide
      transition('hide => show', animate('500ms ease-in')) // aplicamos la transicion de invisible a visible
    ])
  ]
})
export class ListadoProvComponent implements OnInit {

  proveedores:any;
  id:string;
  mensaje: string;
  mostrarAlerta:boolean = false;

  constructor(private proveedoresService: ProveedoresService) { }

  ngOnInit() {
    this.cargarProveedores();
  }

  get estadoAlerta(){
    return this.mostrarAlerta ? 'show' : 'hide'; //este metodo evalua este elemento, si mostraAlerta esta true muestra show y si es false muestra hide
  }

  cargarProveedores(){
    this.proveedoresService.getProveedores()
              .subscribe((resp:any)=>{
                this.proveedores = resp.proveedores;
              }, error => {
                console.log(error);
              })
  }

  //necesitamos crear esta variable para almacenar la id y volverla a cargar al borrar para solucionar el problema del model
  obtenerId(id){
    this.id = id;
  }

  borrarProveedor(){
    this.proveedoresService.deleteProveedor(this.id) // aplicamos aqui la nueva variable de la id para el problema del model
            .subscribe((resp:any)=>{
              this.mensaje = "El proveedor ha sido eliminado correctmente";
              this.mostrarAlerta = true;
              this.cargarProveedores();
              setTimeout(()=>{            //Este setTimeout para hacer que desaparezca el mensaje tras 2 segundos
                this.mostrarAlerta = false;
              }, 2500);
            },(error:any)=>{
              this.mensaje = 'Error de conexion con el servidor';
              this.mostrarAlerta = true;
              setTimeout(()=>{
                this.mostrarAlerta = false;
              }, 2500)
            })
  }

}
