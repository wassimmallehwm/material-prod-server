import Client from "./client.model";
import clientService from "./client.service";

export default {
    async findAll(req, res, next){
        try{
            const clients = await Client.find();
            return res.json(clients);
        }
        catch(error){
            res.status(500).json(error);
        }
    },
    async create(req, res){
        try{
            const {value, error} = clientService.validateCreateSchema(req.body);
            if(error && error.details){
                return res.status(400).json(error);
            }
            const client = await Client.create(value);
            return res.json(client);
        } catch(error){
            res.status(500).json(error);
        }
        // .catch(err => res.status(500).json(err));
    },
    async findOne(req, res){
        try{
            const client = await Client.findById(req.params.id);
            return res.json(client);
        }
        catch(error){
            res.status(500).json(error);
        }
    },
    async delete(req, res){
        try{
            const client = await Client.findOneAndRemove({_id: req.params.id});
            if(!client){
                res.status(404).json({error: 'Client Not Found'});
            }
            return res.json(client);
        }
        catch(error){
            res.status(500).json(error);
        }
    },
    async update(req, res){
        try{
            const {value, error} = clientService.validateUpdateSchema(req.body);
            if(error && error.details){
                return res.status(400).json(error);
            }
            const client = await Client.findOneAndUpdate(
                {_id: req.params.id},
                value,
                {new: true}
            );
            return res.json(client);
        } catch(error){
            res.status(500).json(error);
        }
    }
}