import joi from 'joi';
import Invoice from "../models/invoice.model";

const invoices = [
    {_id: "1", item: 'Amazon Product', qty: 10, date: new Date()},
    {_id: "2", item: 'Facebook Product', qty: 5, date: new Date()},
    {_id: "3", item: 'Google Product', qty: 1, date: new Date()}
];
export default {
    findAll(req, res, next){
        Invoice.find()
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