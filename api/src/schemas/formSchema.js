const mongoose = require('mongoose');

const { Schema } = mongoose;
const FormSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    profession: {
      type: String,
    },
    yearsInProfession: {
      type: Number,
      validate: {
        validator(value) {
          if (this.profession) {
            return value != null;
          }
          return true;
        },
        message: 'yearsInProfession is required when profession is set',
      },
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);

module.exports = mongoose.model('Form', FormSchema);
