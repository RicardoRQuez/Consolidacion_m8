import jwt from "jsonwebtoken";
import User from "../models/User.model.js"
import { secretPhrase } from '../config/auth.config.js';

export const emitToken = async (req, res, next) => {
    let { email, password } = req.body;
    let usuario = await User.findOne({
        where: { email, password },
        atributes: ["id", "firtsName", "lastName", "email" ]
    });

    if (!usuario) {
        return res
            .status(400)
            .json({ code: 400, message: "Error de autenticación." });
    }    
    let token = jwt.sign(
        {
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
            data: usuario,
        },
        secretPhrase
    );
    //console.log(token);
    req.token = token;
    next();
};