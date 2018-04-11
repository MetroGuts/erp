import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProveedoresService } from '../../servicios/proveedores.service';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations'; // animaciones

@Component({
  selector: 'app-crear-prov',
  templateUrl: './crear-prov.component.html',
  styleUrls: ['./crear-prov.component.css'],
  animations: [
    trigger('alerta', [ // desencadenante lo llamamos alerta porque así la hemos definido en el html
      state('show', style({opacity: 1})), // aplicamos el estilo definido en este caso para hacerlo visible
      state('hide', style({opacity: 0})), // aplicamos el estilo para hacerlo invisible
      transition('show => hide', animate('500ms ease-out')), // aplicamos la transicion de visible a hide
      transition('hide => show', animate('500ms ease-in')) // aplicamos la transicion de invisible a visible
    ])
  ]
})
export class CrearProvComponent implements OnInit {

  @ViewChild('cif') cifRef: ElementRef; //para enlazarlo con el cif

  proveedorForm: FormGroup;
  proveedor: any;
  provincias:string[] = ['Álava','Albacete','Alicante','Almería','Asturias','Ávila','Badajoz','Barcelona','Burgos','Cáceres',
  'Cádiz','Cantabria','Castellón','Ceuta','Ciudad Real','Córdoba','La Coruña','Cuenca','Gerona','Gibraltar','Granada','Guadalajara',
  'Guipúzcoa','Huelva','Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Melilla','Murcia','Navarra',
  'Orense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona',
  'Santa Cruz de Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza']

  mensaje: string = 'Error de conexión con el servidor';
  mostrarAlerta:boolean = false;
  enviando:boolean = false;

  constructor(private pf: FormBuilder,
              private proveedoresService: ProveedoresService,
              private router: Router) { }

  ngOnInit() {
    this.proveedorForm = this.pf.group({
      nombre: null,
      cif: null,
      domicilio: null,
      cp: null,
      localidad: null,
      provincia: null,
      telefono: null,
      email: null,
      contacto: null
    })
  }

  get estadoAlerta(){
    return this.mostrarAlerta ? 'show' : 'hide'; //este metodo evalua este elemento, si mostraAlerta esta true muestra show y si es false muestra hide
  }

  crearProv(){
    this.mostrarAlerta = false;
    this.enviando = true;
    this.proveedor = this.guardarProv();
    this.proveedoresService.postProveedor(this.proveedor)
                    .subscribe((resp:any)=>{
                      this.router.navigate(['/listado-proveedores']); //que cuando tenga exito redireccione a listado de proveedores
                      this.enviando = false;
                    }, (error:any)=>{
                      this.mostrarAlerta = true;
                      this.enviando = false;
                      if(error.error.errores.errors.cif.message){
                        this.mensaje = error.error.errores.errors.cif.message;
                        this.cifRef.nativeElement.focus(); // focus manda el focus al elemento
                      }
                    })
  }
  guardarProv(){
    const guardarProv = {
      nombre: this.proveedorForm.get('nombre').value,
      cif: this.proveedorForm.get('cif').value,
      domicilio: this.proveedorForm.get('domicilio').value,
      cp: this.proveedorForm.get('cp').value,
      localidad: this.proveedorForm.get('localidad').value,
      provincia: this.proveedorForm.get('provincia').value,
      telefono: this.proveedorForm.get('telefono').value,
      email: this.proveedorForm.get('email').value,
      contacto: this.proveedorForm.get('contacto').value
    }
    return guardarProv;
  }
}
