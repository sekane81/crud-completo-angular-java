import { Component } from '@angular/core';
import { ListaUsuariosComponent } from './components/lista-usuarios/lista-usuarios';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ListaUsuariosComponent],
  template: `<app-lista-usuarios></app-lista-usuarios>`
})
export class AppComponent {
  title = 'crud-usuarios-app';
}