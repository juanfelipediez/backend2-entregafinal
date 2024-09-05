import {authToken, generateToken, jwtKey} from '../utils/jwtFunctions.js'

class SessionController{
    register(req, res) {
        return res.status(200).json({status: 'success', message: 'New user created!'})
    }
    
    login(req, res){
        const payload = {
            email: req.user.email,
            role: req.user.role
        }
        const token = generateToken(payload)
        res.cookie('token', token, {
            maxAge: 1000*60*5,
            httpOnly: true
        })
        res.status(200).json({status: 'success', details: 'success login'})
    }
    logout(req, res){
        req.clearCookie("token");
        res.json({ message: "Sesión cerrada" });
    }

    loginError(req, res){
        res.status(401).json({mensaje: 'Hubo un error'});
    }

    current(req, res){
        res.status(200).json({status: 'success', details: 'Active session', user: req.user})
    }

    auth(req, res){
        res.status(200).json({status: 'success', details: 'Active session', user: req.user})
    }
}

export const sessionController = new SessionController



