const BaseJoi=require('joi');
const sanitizeHtml=require('sanitize-html');

const extension=(joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean=sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean!==value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});

const Joi=BaseJoi.extend(extension)

module.exports.productSchema=Joi.object({
    product: Joi.object({
        title: Joi.string().required().escapeHTML(),
        price: Joi.number().required().min(0),
        // image: Joi.string().required(),
        categories: Joi.string().required().escapeHTML(),
        description: Joi.string().required().escapeHTML()
    }).required(),
    deleteImages: Joi.array()
});

module.exports.reviewSchema=Joi.object({
    review: Joi.object({
        body: Joi.string().required().escapeHTML(),
        rating: Joi.number().required().min(1).max(5)
    }).required()
})

module.exports.enquirySchema=Joi.object({
    enquiry: Joi.object({
        productname: Joi.string().required().escapeHTML(),
        quantity: Joi.number().required().min(1),
        unit: Joi.string().required().escapeHTML(),
        buyingBody: Joi.string().escapeHTML(),
        email: Joi.string().required().escapeHTML(),
        contact: Joi.number().required(),
        seller: Joi.string().required().escapeHTML()
    }).required()
})