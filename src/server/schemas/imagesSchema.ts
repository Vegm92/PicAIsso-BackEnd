import { Joi } from "express-validation";

const imagesSchemaJoi = {
  body: Joi.object({
    title: Joi.string().required(),
    subject: Joi.string().required(),
    category: Joi.string().required(),
    description: Joi.string().max(500).required(),
    image: Joi.string().required(),
    promptedBy: Joi.string(),
  }),
};

export default imagesSchemaJoi;
