import joi from 'joi';

export default {
    validateCreateSchema(body){
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
            password: joi.string().optional(),
        });
        const {error, value} = joi.validate(body, schema);
        if(error && error.details){
            return {error};
        }
        return {value};
    }
}