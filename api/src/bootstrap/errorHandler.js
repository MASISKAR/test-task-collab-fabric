const customErrors = require('../../config/customErrors');

module.exports = (app) => {
  const formatError = (err) => {
    if (err.errors) {
      // format validation errors
      const errorKey = Object.keys(err.errors)[0];
      return {
        ...customErrors.validationError,
        message: err.errors[errorKey].message,
      };
    }
    return {
      message: err.message,
      name: err.name,
      private: err.private || false,
      status: err.status || 500,
    };
  };

  app.use((err, req, res, next) => {
    const error = formatError(err);
    let hasUnexpectedError = false;

    // show errors for developers
    if (!error.status || error.status >= 500 || error.private) {
      hasUnexpectedError = true;
      console.log('####################');
      console.log(err);
      console.log('####################');
    }

    if (error.private) return;

    if (hasUnexpectedError) res.status(500).json({ error: customErrors.defaultError });
    else res.status(error.status).json({ error });
  });
};
