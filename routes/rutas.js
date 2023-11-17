import { Router } from "express";
import passport from "passport";
import usuarioControlador from "../controllers/usuarioControlador.js";
import ofertaControlador from "../controllers/ofertaControlador.js";
import respuestaControlador from "../controllers/respuestaControlador.js";
import multer from "multer";

const router = Router();

//Configuracion para almacenar imagenes

var imgConfig = multer.diskStorage({
    destination:(req, file, callback)=> {
    callback(null, "../uploads")
    },
    filename:(req, file, callback)=> {
        callback(null, `image-${Date.now()}.${file.originalname}`)
    }
 });

// imagen multer
const isImage = (req, file, callback)=> {
    if(file.mimetype.startsWith("image")) {
        callback(null, true)
    } else {
        callback(null, Error("Solo imagenes"))
    }
}

var upload = multer({
    storage: imgConfig,
    fileFilter: isImage
})

//RUTAS DE USUARIOS

router.post("/usuario",
    usuarioControlador.postUsuario)

router.get("/usuario",
    passport.authenticate("jwt", {session: false}),
    usuarioControlador.getUsuario)

router.get("/usuario/:id",
    usuarioControlador.getDetalleUsuario)

router.put("/usuario/:id",
    passport.authenticate("jwt", { session: false }),
    upload.single("urlLogo"),
    usuarioControlador.putDescripcion)
    
router.get("/misofertas",
    passport.authenticate("jwt", {session: false}),
    usuarioControlador.getMisOfertas)

router.get("/misrespuestas/:id",
    passport.authenticate("jwt", {session: false}),
    usuarioControlador.getMisRespuestas)

router.get("/midescripcion",
    passport.authenticate("jwt", {session: false}),
    usuarioControlador.getMiDescripcion)

router.post("/usuario/login",
    passport.authenticate('local', {session: false}),
    usuarioControlador.postSignin)


//RUTAS DE OFERTAS
    
router.post("/oferta",
    passport.authenticate("jwt", {session: false}),
    ofertaControlador.postOferta)
    
router.get("/oferta",
    ofertaControlador.getOferta)
    
router.get("/oferta/:id",
    ofertaControlador.getDetalleOferta)
    
router.put("/oferta/:id",
    passport.authenticate("jwt", {session: false}),
    ofertaControlador.putOferta)
    
router.delete("/oferta/:id",
    passport.authenticate("jwt", {session: false}),
    ofertaControlador.deleteOferta)


//RUTAS DE RESPUESTAS

router.post("/respuesta",
    passport.authenticate("jwt", {session: false}),
    respuestaControlador.postRespuesta)

router.get("/respuesta",
    respuestaControlador.getRespuesta)
    
router.get("/respuesta/:id",
    passport.authenticate("jwt", {session: false}),
    respuestaControlador.getDetailRespuesta)

export default router;