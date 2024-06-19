export function validarCliente(cliente) {
    const errores = [];

    if (!validarCedula(cliente.cedula)) {
        errores.push("cedula invalida");
    }

    if (!validarNombre(cliente.nombre)) {
        errores.push("nombre invalido");
    }

    if (!validarTelefono(cliente.telefono)) {
        errores.push("telefono invalido");
    }

    return errores.length === 0 ? true : false;

}

export function validarMascota(mascota) {
    const errores = [];

    if (!validarNombreMascota(mascota.nombre)) {
        errores.push("nombre de mascota invalido");
    }

    if (!validarRazaMascota(mascota.raza)) {
        errores.push("raza de mascota invalida");
    }

    if (!validarFotoMascota(mascota.image)) {
        errores.push("foto de mascota invalida");
    }

    return errores.length === 0 ? true : false;
}

// Validaciones para cliente
function validarCedula(cedula) {
    const cedulaPattern = /^[1-7]\d{8}$/;
    return cedulaPattern.test(cedula);
}

function validarNombre(nombre) {
    return validarString(nombre);
}

function validarTelefono(telefono) {
    const telefonoPattern = /^\d{8}$/;
    return telefonoPattern.test(telefono);
}

// Validaciones para Mascota
function validarNombreMascota(nombreMascota) {
    return validarString(nombreMascota);
}

function validarRazaMascota(razaMascota) {
    return validarString(razaMascota);
}

function validarFotoMascota(fotoMascota) {
    return fotoMascota !== null;
}

// Validacion para los nombres y raza
function validarString(String) {
    const validacionString = /^[a-zA-Z\s]{4,20}$/;
    return validacionString.test(String)
}