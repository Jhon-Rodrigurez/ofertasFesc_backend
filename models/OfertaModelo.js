class OfertaCrearReqModel {
    constructor(oferta) {
        this.titulo = oferta.titulo;
        this.descripcion = oferta.descripcion;
        this.idArea = oferta.idArea;
        this.fechaExpiracion = oferta.fechaExpiracion;
        this.descripcionExperiencia = oferta.descripcionExperiencia;
        this.tiempoExperiencia = oferta.tiempoExperiencia;
    }
}

class OfertaDatosResModel {
    constructor(oferta) {
        this.idOferta = oferta.idOferta;
        this.titulo = oferta.titulo;
        this.descripcion = oferta.descripcion;
        this.idArea = oferta.idArea;
        this.idUsuario = oferta.idUsuario;
        this.nombre = oferta.nombre;
        this.email = oferta.email;
        this.idRol = oferta.idRol;
        this.fechaExpiracion = oferta.fechaExpiracion;
        this.ciudad = oferta.ciudad;
        this.pais = oferta.pais;
        this.descripcionExperiencia = oferta.descripcionExperiencia;
        this.tiempoExperiencia = oferta.tiempoExperiencia;
        this.creado = oferta.creado;
    }
}

class OfertaActualizarReqModel {
    constructor(oferta) {
        this.ciudad = oferta.ciudad;
        this.pais = oferta.pais;
    }
}

class OfertaEntity {
    constructor(oferta) {
        this.idOferta = oferta.idOferta;
        this.titulo = oferta.titulo;
        this.descripcion = oferta.descripcion;
        this.idArea = oferta.idArea;
        this.idUsuario = oferta.idUsuario;
        this.fechaExpiracion = oferta.fechaExpiracion;
        this.ciudad = oferta.ciudad;
        this.pais = oferta.pais;
        this.descripcionExperiencia = oferta.descripcionExperiencia;
        this.tiempoExperiencia = oferta.tiempoExperiencia;
        this.creado = oferta.creado;
    }
}

export {OfertaCrearReqModel, OfertaDatosResModel, OfertaActualizarReqModel, OfertaEntity}