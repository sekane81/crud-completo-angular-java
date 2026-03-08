import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-form-usuario',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './form-usuario.html'
})
export class FormUsuarioComponent implements OnChanges {

  @Input() usuario: Usuario | null = null;
  @Output() guardado = new EventEmitter<void>();

  form: Usuario = this.formVacio();

  constructor(private usuarioService: UsuarioService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['usuario']) {
      this.form = this.usuario ? { ...this.usuario } : this.formVacio();
    }
  }

  formVacio(): Usuario {
    return { nombre: '', email: '', telefono: '' };
  }

  guardar(): void {
    if (this.form.id) {
      this.usuarioService.actualizarUsuario(this.form.id, this.form)
        .subscribe({
          next: () => {
            this.guardado.emit();
            this.form = this.formVacio();
          },
          error: (err) => console.error('Error al actualizar:', err)
        });
    } else {
      this.usuarioService.crearUsuario(this.form)
        .subscribe({
          next: () => {
            this.guardado.emit();
            this.form = this.formVacio();
          },
          error: (err) => console.error('Error al crear:', err)
        });
    }
  }
}