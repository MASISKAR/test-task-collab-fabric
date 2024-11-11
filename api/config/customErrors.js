module.exports = {
  defaultError: {
    name: 'somethingWentWrong',
    message: 'Something went wrong please try again later',
    private: true,
    status: 500,
  },
  formNotFound: {
    name: 'formNotFound',
    message: 'Form not found',
    private: false,
    status: 404,
  },
  validationError: {
    name: 'validationError',
    private: false,
    status: 422,
  },
  yearsInProfessionRequired: {
    name: 'yearsInProfessionRequired',
    message: 'yearsInProfession is required when profession is set',
    private: false,
    status: 422,
  },
};
