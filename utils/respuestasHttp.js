import constantesSeguridad from "../security/constantesSeguridad.js";

const exito = (req, res, mensaje, estado=200)=> {
    res.status(estado).send(mensaje);
}

const error = (req, res, mensaje, detalle, estado=500)=> {
    console.error(detalle);
    res.status(estado).send(mensaje);
}

const signin= (req, res, mensaje, estado=200)=> {
    res.setHeader("Access-Control-Expose-Headers", "Authorization, IdUsuario, IdRol, Nombre");
    res.setHeader("IdUsuario", req.user.idUsuario);
    res.setHeader("IdRol", req.user.idRol);
    res.setHeader("Nombre", req.user.nombre);
    res.setHeader(constantesSeguridad.HEADER_STRING, constantesSeguridad.TOKEN_PREFIJO + req.authInfo);
    res.status(estado).send("");
}

export default {exito, error, signin}