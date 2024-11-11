const customErrors = require('../../config/customErrors');
const formSchema = require('../schemas/formSchema');

class FormController {
  create = async (req, res, next) => {
    try {
      const { form } = req.body;
      if (form.profession && !form.yearsInProfession) {
        throw customErrors.yearsInProfessionRequired;
      }
      const newForm = await formSchema.create(form);
      res.status(201).json(newForm);
    } catch (err) {
      next(err);
    }
  };

  details = async (req, res, next) => {
    try {
      const form = await formSchema
        .find({ _id: req.params.id, deleted: false })
        .lean();

      if (!form) throw customErrors.formNotFound;
      res.status(200).json(form);
    } catch (err) {
      next(err);
    }
  };

  list = async (req, res, next) => {
    try {
      const categories = await formSchema
        .find({ deleted: false })
        .lean();
      res.status(200).json(categories);
    } catch (err) {
      next(err);
    }
  };

  update = async (req, res, next) => {
    try {
      const { form } = req.body;
      if (form.profession && !form.yearsInProfession) {
        throw customErrors.yearsInProfessionRequired;
      }
      const updatedForm = await formSchema
        .findOneAndUpdate(
          { _id: req.params.id, deleted: false },
          form,
          { new: true },
        )
        .lean();
      if (!updatedForm) throw customErrors.formNotFound;

      res.status(200).json(updatedForm);
    } catch (err) {
      next(err);
    }
  };

  delete = async (req, res, next) => {
    try {
      const form = await formSchema.findOneAndUpdate(
        { _id: req.params.id, deleted: false },
        { deleted: true },
        { new: true },
      );
      if (!form) throw customErrors.formNotFound;

      res.send(204);
    } catch (err) {
      next(err);
    }
  };
}

module.exports = new FormController();
