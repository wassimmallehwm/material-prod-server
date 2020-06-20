import jwt from 'jsonwebtoken';
import { config } from '../../../config/env/dev';

export default {
    sendJWTToken(req, res){
        const token = jwt.sign({id: req.user._id}, config.secretKey, {expiresIn: '1d'});
        // return res.json({
        //     success : true,
        //     token : token
        // });
        res.redirect(config.frontUrl + '/dashboard/invoices?token=' + token);
    },
    authenticate(req, res){
        return res.send(true);
    },
    logout(req, res){
        req.logout();
        return res.json({success : true});
    }
}