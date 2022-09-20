const Joi=require('joi');

module.exports.productSchema=Joi.object({
    product: Joi.object({
        title: Joi.string().required(),
        price: Joi.number().required().min(0),
        image: Joi.string().required(),
        categories: Joi.string().required(),
        description: Joi.string().required()
    }).required()
});