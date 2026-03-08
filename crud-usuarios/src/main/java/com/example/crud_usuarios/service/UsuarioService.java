package com.example.crud_usuarios.service;

import com.example.crud_usuarios.model.Usuario;
import com.example.crud_usuarios.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    // 🔵 Obtener todos los usuarios
    public List<Usuario> obtenerTodos() {
        return usuarioRepository.findAll();
    }

    // 🔵 Obtener un usuario por ID
    public Optional<Usuario> obtenerPorId(Long id) {
        return usuarioRepository.findById(id);
    }

    // 🟢 Crear un nuevo usuario
    public Usuario crearUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    // 🟡 Actualizar un usuario existente
    public Usuario actualizarUsuario(Long id, Usuario datos) {
        Usuario usuario = usuarioRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        usuario.setNombre(datos.getNombre());
        usuario.setEmail(datos.getEmail());
        usuario.setTelefono(datos.getTelefono());
        return usuarioRepository.save(usuario);
    }

    // 🔴 Eliminar un usuario
    public void eliminarUsuario(Long id) {
        usuarioRepository.deleteById(id);
    }
}