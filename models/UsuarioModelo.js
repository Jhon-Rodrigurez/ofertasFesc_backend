class UsuarioCrearReqModel {
    constructor(usuario) {
        this.nombre = usuario.nombre;
        this.email = usuario.email;
        this.idArea = usuario.idArea;
        this.idRol = usuario.idRol;
        this.password = usuario.password;
    }
}

class UsuarioDatosResModel {
    constructor(usuario) {
        this.idUsuario = usuario.idUsuario;
        this.nombre = usuario.nombre;
        this.email = usuario.email;
        this.celular = usuario.celular;
        this.descripcionExperiencia = usuario.descripcionExperiencia;
        this.urlLinkedin = usuario.urlLinkedin;
        this.urlLogo = usuario.urlLogo;
        this.urlCv = usuario.urlCv;
    }
}

class UsuarioActualizarReqModel {
    constructor(usuario) {
        this.celular = usuario.celular;
        this.descripcionExperiencia = usuario.descripcionExperiencia;
        this.urlLinkedin = usuario.urlLinkedin;
        this.urlLogo = usuario.urlLogo;
        this.urlCv = usuario.urlCv;
    }
}

class UsuarioEntity {
    constructor(usuario) {
        this.idUsuario = usuario.idUsuario;
        this.nombre = usuario.nombre;
        this.email = usuario.email;
        this.celular = usuario.celular;
        this.descripcionExperiencia = usuario.descripcionExperiencia;
        this.urlLinkedin = usuario.urlLinkedin;
        this.urlLogo = usuario.urlLogo;
        this.urlCv = usuario.urlCv;
        this.passwordEncriptada = usuario.passwordEncriptada;
        this.idArea = usuario.idArea;
        this.idRol = usuario.idRol;
    }
}

export {UsuarioCrearReqModel, UsuarioDatosResModel, UsuarioEntity, UsuarioActualizarReqModel}