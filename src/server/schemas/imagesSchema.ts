import { Joi } from "express-validation";

const imagesSchemaJoi = {
  body: Joi.object({
    title: Joi.string().required(),
    category: Joi.string().required(),
    description: Joi.string().max(500).required(),
    prompt: Joi.string().required(),
  }),
};

export default imagesSchemaJoi;
