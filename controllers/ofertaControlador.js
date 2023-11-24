import respuestasHttp from '../utils/respuestasHttp.js';
import ofertaServicio from "../services/ofertaServicio.js";
import { OfertaCrearReqModel, OfertaDatosResModel, OfertaActualizarReqModel } from "../models/OfertaModelo.js";

const postOferta = async (req, res) => {

    try {
        
        if (req.user) {
            const oferta = await ofertaServicio.crearOferta(new OfertaCrearReqModel(req.body), req.user.sub);
            respuestasHttp.exito(req, res, new OfertaDatosResModel(oferta), 201);
            
        } else {
            respuestasHttp.error(req, res, "No se proporcionó un usuario autenticado", 403);
        }

    } catch (err) {
        respuestasHttp.error(req, res, "Error al crear la oferta", 400);
        console.error(err);
    }
}

const getOferta = async (req, res)=> {

    try {
        const array = await ofertaServicio.leerOferta();
        const lasOfertas = array.map(oferta=> new OfertaDatosResModel(oferta));
        respuestasHttp.exito(req, res, lasOfertas, 200);

    } catch (err) {
        respuestasHttp.error(req, res, "Error al leer las ofertas", 400);
    }
}

const getDetalleOferta = async (req, res)=> {

    try {
        const oferta = await ofertaServicio.detalleOferta(req.params.id);
        respuestasHttp.exito(req, res, new OfertaDatosResModel(oferta), 200);

    } catch (err) {
        respuestasHttp.error(req, res, "Error al leer el detalle de la oferta", err, 400);
    }
}

const putOferta= async (req, res)=> {

    try {
        if(!req.user.error) {

            const oferta = await ofertaServicio.actualizarOferta(req.params.id, new OfertaActualizarReqModel(req.body), req.user.sub);
            respuestasHttp.exito(req, res, new OfertaDatosResModel(oferta), 200);

        } else {
            respuestasHttp.error(req, res, "", req.user.error, 403);
        }

    } catch (err) {
        respuestasHttp.error(req, res, "Error al actualizar la oferta", err, 400);
    }
}

const deleteOferta = async (req, res)=> {

    try {
        if(!req.user.error) {

            const oferta = await ofertaServicio.eliminarOferta(req.params.id, req.user.sub);
            respuestasHttp.exito(req, res, "Oferta eliminada", 200);

        } else {
            respuestasHttp.error(req, res, "", req.user.error, 403);
        }

    } catch (err) {
        respuestasHttp.error(req, res, "Error al eliminar la oferta", err, 400);
    }
}

export default {postOferta, getOferta, getDetalleOferta, putOferta, deleteOferta};