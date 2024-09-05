export function validate(schema) {
    return async (req, res, next) => {
      const { error, value } = schema.validate(req.body);
  
      if (error) {
        return res.status(400).json({
          message: "Error de validación",
          details: error.details,
        });
      }
      req.body = value
      
  
      next();
    };
  }

