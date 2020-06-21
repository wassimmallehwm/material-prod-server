import userService from "./user.service";
import User from "./user.model";
import { getJWTToken, encryptPassword } from "../../modules/utils";
import bcryptjs from 'bcryptjs';


export default {
    async signup(req, res){
        try{
            const {value, error} = userService.validateCreateSchema(req.body);
            if(error && error.details){
                return res.status(400).json(error);
            }
            const checkUser = await User.findOne({'local.email': value.email});
            if(checkUser) {
                return res.status(400).json({
                    success : false,
                    message : 'Email already exist !'
                });
            } else {
                const hashedPassword = await encryptPassword(value.password);
                const user = await new User({});
                user.local.email = value.email;
                user.local.name = value.name;
                user.local.password = hashedPassword;
                await user.save();
                return res.json({
                    success : true,
                    message : 'User created successfully'
                });
            }
        } catch(error){
            res.status(500).json(error);
        }
    }, 
    async login(req, res){
        try{
            const {value, error} = userService.validateLoginSchema(req.body);
            if(error && error.details){
                return res.status(400).json(error);
            }
            const user = await User.findOne({'local.email': value.email});
            if(!user) {
                return res.status(400).json({error: 'User Not Found'});
            }
            const match = bcryptjs.compare(value.password, user.password);
            if(!match) {
                return res.status(401).json({error: 'Invalid Credentials'});
            }
            const token = getJWTToken({id: user._id});
            return res.json({
                success : true,
                token : token
            });
        } catch(error){
            console.log(error);
            res.status(500).json(error);
        }
    },
    async refreshToken(req, res){
        try{
            const user = await User.findOne({'_id': req.user._id});
            if(!user) {
                return res.status(400).json({error: 'User Not Found'});
            }
            const token = getJWTToken({id: user._id});
            return res.json({
                success : true,
                token : token
            });
        } catch(error){
            console.log(error);
            res.status(500).json(error);
        }
    },
    async forgotPassword(req, res){
        try{
            const {value, error} = userService.validateForgotPAsswordSchema(req.body);
            if(error && error.details){
                return res.status(400).json(error);
            }
            const criteria = {
                $or: [
                    {'google.email' : value.email},
                    {'facebook.email' : value.email},
                    {'local.email' : value.email}
                ]
            }
            const user = await User.findOne(criteria);
            if(!user){
                res.status(500).json({message : 'User Not Found !'});
            }
            const token = getJWTToken({id: user._id});
            const sanitizedUser = userService.getUser(user);
            userService.sendResetPasswordMail(sanitizedUser, token);
            return res.json({
                message : "Reset Email has been sent"
            });
        } catch(error){
            console.log(error);
            res.status(500).json(error);
        }
    },
    async resetPassword(req, res){
        try{
            let {password} = req.body;
            if(!password) {
                return res.status(400).json({error: 'Password is required !'});
            }

            const user = await User.findOne({'_id': req.user._id});
            const sanitizedUser = userService.getUser(user);
            if(!user.local.email) {
                user.local.email = sanitizedUser.email;
                user.local.name = sanitizedUser.name;
            }

            const hashedPassword = await encryptPassword(password);
            user.local.password = hashedPassword;
            await user.save();

            return res.json({
                message : 'Password reseted'
            });
        } catch(error){
            console.log(error);
            res.status(500).json(error);
        }
    }
}