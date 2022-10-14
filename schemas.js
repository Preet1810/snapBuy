const Joi=require('joi');

module.exports.productSchema=Joi.object({
    product: Joi.object({
        title: Joi.string().required(),
        price: Joi.number().required().min(0),
        // image: Joi.string().required(),
        categories: Joi.string().required(),
        description: Joi.string().required()
    }).required(),
    deleteImages: Joi.array()
});

module.exports.reviewSchema=Joi.object({
    review: Joi.object({
        body: Joi.string().required(),
        rating: Joi.number().required().min(1).max(5)
    }).required()
})

module.exports.enquirySchema=Joi.object({
    enquiry: Joi.object({
        productname: Joi.string().required(),
        quantity: Joi.number().required().min(1),
        unit: Joi.string().required(),
        buyingBody: Joi.string(),
        email: Joi.string().required(),
        contact: Joi.number().required(),
        seller: Joi.string().required()
    }).required()
})