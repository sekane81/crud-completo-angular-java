package com.example.crud_usuarios.controller;

import com.example.crud_usuarios.model.Usuario;
import com.example.crud_usuarios.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost"})
public class UsuarioController {

    private final UsuarioService usuarioService;

    // GET http://localhost:8080/api/usuarios
    @GetMapping
    public List<Usuario> listar() {
        return usuarioService.obtenerTodos();
    }

    // GET http://localhost:8080/api/usuarios/1
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> obtener(@PathVariable Long id) {
        return usuarioService.obtenerPorId(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    // POST http://localhost:8080/api/usuarios
    @PostMapping
    public ResponseEntity<Usuario> crear(@RequestBody Usuario usuario) {
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(usuarioService.crearUsuario(usuario));
    }

    // PUT http://localhost:8080/api/usuarios/1
    @PutMapping("/{id}")
    public ResponseEntity<Usuario> actualizar(
            @PathVariable Long id,
            @RequestBody Usuario usuario) {
        return ResponseEntity.ok(usuarioService.actualizarUsuario(id, usuario));
    }

    // DELETE http://localhost:8080/api/usuarios/1
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        usuarioService.eliminarUsuario(id);
        return ResponseEntity.noContent().build();
    }
}