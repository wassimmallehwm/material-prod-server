import joi from 'joi';

export default {
    validateCreateSchema(body){
        const schema = joi.object({
            email: joi.string().email().required(),
            name: joi.string().required(),
            password: joi.string().required(),
        });
        const {error, value} = joi.validate(body, schema);
        if(error && error.details){
            return {error};
        }
        return {value};
    },
    validateLoginSchema(body){
        const schema = joi.object({
            email: joi.string().email().required(),
            password: joi.string().required(),
        });
        const {error, value} = joi.validate(body, schema);
        if(error && error.details){
            return {error};
        }
        return {value};
    },
    validateUpdateSchema(body){
        const schema = joi.object({
            email: joi.string().email().optional(),
            name: joi.string().optional(),
            password: joi.string().optional(),
        });
        const {error, value} = joi.validate(body, schema);
        if(error && error.details){
            return {error};
        }
        return {value};
    },
    getUser(user){
        const resp = {};
        if(user.local.email) {
            resp.name = user.local.name;
            resp.email = user.local.email;
        } else
        if(user.google.email) {
            resp.name = user.google.displayName;
            resp.email = user.google.email;
        } else
        if(user.facebook.email) {
            resp.name = user.facebook.displayName;
            resp.email = user.facebook.email;
        }
        return resp;
    }
}