import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { FormUsuarioComponent } from '../../components/form-usuario/form-usuario';

@Component({
  selector: 'app-lista-usuarios',
  standalone: true,
  imports: [CommonModule, FormUsuarioComponent],
  templateUrl: './lista-usuarios.component.html'
})
export class ListaUsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  usuarioSeleccionado: Usuario | null = null;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe({
      next: (data) => this.usuarios = data,
      error: (err) => console.error('Error al cargar:', err)
    });
  }

  seleccionarUsuario(usuario: Usuario): void {
    this.usuarioSeleccionado = null;
    setTimeout(() => {
      this.usuarioSeleccionado = { ...usuario };
    }, 0);
  }

  eliminar(id: number): void {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.usuarioService.eliminarUsuario(id).subscribe({
        next: () => this.cargarUsuarios(),
        error: (err) => console.error('Error al eliminar:', err)
      });
    }
  }

  onGuardado(): void {
    this.usuarioSeleccionado = null;
    this.cargarUsuarios();
  }
}