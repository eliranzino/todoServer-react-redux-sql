import joi from "@hapi/joi";

export const todoSchema = joi.object({
  userId: joi.number().integer().required(),
  Description: joi.string().min(1).max(500).required(),
  date: joi.date().required(),
});
