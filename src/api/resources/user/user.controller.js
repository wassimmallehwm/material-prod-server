import userService from "./user.service";
import User from "./user.model";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {config} from '../../../config/env/dev'

export default {
    async signup(req, res){
        try{
            const {value, error} = userService.validateCreateSchema(req.body);
            if(error && error.details){
                return res.status(400).json(error);
            }
            const user = await User.create(value);
            return res.json({
                success : true,
                message : 'User created successfully'
            });
        } catch(error){
            res.status(500).json(error);
        }
    }, 
    
    async login(req, res){
        try{
            const {value, error} = userService.validateCreateSchema(req.body);
            if(error && error.details){
                return res.status(400).json(error);
            }
            const user = await User.findOne({email: value.email});
            if(!user) {
                return res.status(400).json({error: 'User Not Found'});
            }
            const match = bcryptjs.compare(value.password, user.password);
            if(!match) {
                return res.status(401).json({error: 'Invalid Credentials'});
            }
            const token = jwt.sign({id: user._id}, config.secretKey, {expiresIn: '1d'});
            return res.json({
                success : true,
                token : token
            });
        } catch(error){
            res.status(500).json(error);
        }
    },
    async test (req, res) {
        return res.json(req.user);
    }
}