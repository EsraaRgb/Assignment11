const methods = ["headers", "params", "query", "body"];

export const validate = (Schema, redirectPath) => {
  return (req, res, next) => {
    const validationErrors = [];
    methods.forEach((method) => {
      if (Schema[method]) {
        const result = Schema[method].validate(req[method],{abortEarly:false});
        if (result.error) {
          for (const ele of result.error.details) {
            validationErrors.push(ele.context.label);
          }
        }
      }
    });
    if (validationErrors.length) {
      console.log("validatio");
      req.flash("oldInputs", req.body);
      req.flash("validationErr", validationErrors);
      res.redirect(redirectPath);
    } else {
      next();
    }
  };
};
