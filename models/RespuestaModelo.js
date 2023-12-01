class RespuestaCrearReqModel {
    constructor(respuesta) {
        this.idOferta = respuesta.idOferta;
        this.experienciaDescripcion = respuesta.experienciaDescripcion;
        this.experienciaTiempo = respuesta.experienciaTiempo;
    }
}

class RespuestaDatosResModel {
    constructor(respuesta) {
        this.idRespuesta = respuesta.idRespuesta;
        this.experienciaDescripcion = respuesta.experienciaDescripcion;
        this.experienciaTiempo = respuesta.experienciaTiempo;
        this.fechaAplicado = respuesta.fechaAplicado;
        this.idOferta = respuesta.idOferta;
        this.titulo = respuesta.titulo;
        this.idUsuario = respuesta.idUsuario;
        this.nombre = respuesta.nombre;
        this.email = respuesta.email;
        this.celular = respuesta.celular;
        this.descripcionExperiencia = respuesta.descripcionExperiencia;
    }
}

class RespuestaEntity {
    constructor(respuesta) {
        this.idRespuesta = respuesta.idRespuesta;
        this.idOferta = respuesta.idOferta;
        this.idUsuario = respuesta.idUsuario;
        this.experienciaDescripcion = respuesta.experienciaDescripcion;
        this.experienciaTiempo = respuesta.experienciaTiempo;
        this.fechaAplicado = respuesta.fechaAplicado;
    }
}

export {RespuestaCrearReqModel, RespuestaDatosResModel, RespuestaEntity}