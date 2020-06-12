import joi from 'joi';
import Invoice from "../models/invoice.model";

export default {
    findAll(req, res, next){
        const {page = 1, perPage = 10, filter, sortField, sortDir} = req.query;
        const options = {
            page : parseInt(page, 10),
            limit : parseInt(perPage, 10)
        };
        const query = {};
        if(filter){
            query.item = {
                $regex: filter
            };
        }
        if(sortField && sortDir){
            options.sort = {
                [sortField]: sortDir
            }
        }
        Invoice.paginate(query, options)
        .then(invoices => res.json(invoices))
        .catch(error => res.status(500).json(error));
    },
    create(req, res){
        const schema = joi.object({
            item: joi.string().required(),
            qty: joi.number().integer().required(),
            date: joi.date().required(),
            due: joi.date().required(),
            tax: joi.number().optional(),
            rate: joi.number().optional()
        });

        const {error, value} = joi.validate(req.body, schema);
        if(error && error.details){
            return res.status(400).json(error);
        }
        Invoice.create(value)
        .then(invoice => res.json(invoice))
        .catch(err => res.status(500).json(err));
    },
    findOne(req, res){
        Invoice.findById(req.params.id)
        .then(invoice => {
            if(!invoice){
                return res.status(404).json({error: 'Invoice not found !'});
            }
            return res.json(invoice);
        }).catch(error => res.status(500).json(error))
    },
    delete(req, res){
        Invoice.findOneAndRemove(req.params.id)
        .then(invoice => {
            if(!invoice){
                return res.status(404).json({error: 'Invoice not found !'});
            }
            return res.json(invoice);
        }).catch(error => res.status(500).json(error))
    },
    update(req, res){
        const schema = joi.object({
            item: joi.string().optional(),
            qty: joi.number().optional(),
            date: joi.date().optional(),
            due: joi.date().optional(),
            tax: joi.number().optional(),
            rate: joi.number().optional()
        });

        const {error, value} = joi.validate(req.body, schema);
        if(error && error.details){
            return res.status(400).json(error);
        }
        Invoice.findOneAndUpdate({_id: req.params.id}, value, {new: true})
        .then(invoice => {
            return res.json(invoice);
        }).catch(error => res.status(500).json(error))
    }
}