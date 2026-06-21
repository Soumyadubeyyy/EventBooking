/**
 * Creates a validation middleware for a given Joi schema and request source.
 * @param {import('joi').ObjectSchema} schema - Joi schema to validate against
 * @param {'body' | 'query' | 'params'} source - The part of the request to validate
 * @returns {import('express').RequestHandler}
 */
const validate = (schema, source = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[source], {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message,
      }));

      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors,
      });
    }

    // Replace source with validated (and stripped) value
    req[source] = value;
    next();
  };
};

module.exports = validate;
