import { Router } from "express";
import passport from "passport";
import usuarioControlador from "../controllers/usuarioControlador.js";
import ofertaControlador from "../controllers/ofertaControlador.js";
import respuestaControlador from "../controllers/respuestaControlador.js";
import multer from "multer";

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//RUTAS DE USUARIOS

router.post("/usuario",
    usuarioControlador.postUsuario)

router.get("/usuario",
    passport.authenticate("jwt", {session: false}),
    usuarioControlador.getUsuario)

router.get("/usuario/:id",
    usuarioControlador.getDetalleUsuario)

router.put("/usuario/:id", upload.single("urlCv"),
    passport.authenticate("jwt", {session: false}),
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

export default router;