import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { ComprasComponent } from './compras/compras.component';
import { ListadoProvComponent } from './proveedores/listado-prov/listado-prov.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { ProveedoresService } from './servicios/proveedores.service';
import { CrearProvComponent } from './proveedores/crear-prov/crear-prov.component';
import { EditarProvComponent } from './proveedores/editar-prov/editar-prov.component';

const rutas:Routes = [ // creacción de rutas      //Google las llama rutas friendly
  {path:'', component: InicioComponent},
  {path:'compras', component: ComprasComponent},
  {path:'listado-proveedores', component: ListadoProvComponent},
  {path:'crear-proveedor', component: CrearProvComponent},
  {path:'editar-proveedor/:id', component: EditarProvComponent}, // le ponemos /:id para decirle que esperamos un proveedor
  {path:'**', component: InicioComponent} // ** para cuando la ruta esté vacía
]


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ComprasComponent,
    ListadoProvComponent,
    CabeceraComponent,
    CrearProvComponent,
    EditarProvComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(rutas),
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers:[ProveedoresService],
  bootstrap: [AppComponent]
})
export class AppModule { }
