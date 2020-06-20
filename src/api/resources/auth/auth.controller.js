import jwt from 'jsonwebtoken';
import { config } from '../../../config/env/dev';

export default {
    sendJWTToken(req, res){
        const token = jwt.sign({id: req.user._id}, config.secretKey, {expiresIn: '1d'});
        return res.json({
            success : true,
            token : token
        });
    }
}