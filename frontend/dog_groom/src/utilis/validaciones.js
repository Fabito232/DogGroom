

// Validaciones para cliente
export function validarCedula(cedula) {
    const cedulaPattern = /^[1-7]\d{8}$/;
    return cedulaPattern.test(cedula);
}

export function validarTelefono(telefono) {
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
export function validarString(String) {
    const validacionString = /^[a-zA-Z\s]{3,255}$/;
    return validacionString.test(String)
}