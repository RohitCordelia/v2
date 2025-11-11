import Joi from "joi";
export const Email = {
  required: { value: true, message: "Please enter email" },
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Please enter valid email'
  },
};
export const Password = {
  required: true,
  minLength: 8,
  maxLength: 80,
};

export const Code = {
  required: true,
  minLength: 6,
  maxLength: 6,
};

export const FullName = {
  required: { value: true, message: "Please enter a valid name" },
  maxLength: { value: 180, message: "Name cannot exceed 180 characters" },
  pattern: {
    value: /^[a-zA-Z][a-zA-Z ]*$/,
    message: "Please enter a valid name (letters and spaces only)"
  },
};

export const Phone = {
  required: { value: true, message: "Please enter phone number" },
  pattern: { value: /^(?!0)([0]|\+91|\+91\s)?\d{10}/i, message: 'Please enter a valid phone number' },
  minLength: { value: 10, message: "Phone number must be 10 digits" },
  maxLength: { value: 10, message: "Phone number must be 10 digits" },
};

export const PhoneOptional = {
  required: false,
  // pattern: { value: /^([0]|\+91|\+91\s)?\d{10}/i },
  pattern: { value: /^(?!0)([0]|\+91|\+91\s)?\d{10}/i, message: 'Please enter a valid phone number' },
  minLength: { value: 10, message: "Phone number must be 10 digits" },
  maxLength: { value: 10, message: "Phone number must be 10 digits" },
};

export const Pincode = {
  required: { value: true, message: "Please enter pincode" },
  pattern: { value: /^[1-9][0-9]{5}$/i, message: 'Please enter a valid pincode' },
  maxLength: 6,
};

export const AnyValidString = {
  required: { value: true, message: "Please enter a value" },
  maxLength: 180,
};
export const FileUpload = {
  required: { value: true, message: "Please select file" },
};

export const SelectAnyValue = {
  required: { value: true, message: "Please select a value" },
};

export const UPIValidation = {
  required: { value: true, message: "Please enter a upi id" },
  maxLength: 80,
};
export const FirstName = {
  required: { value: true, message: "Please enter first name" },
  maxLength: 80,
};
export const LastName = {
  required: { value: true, message: "Please enter last name" },
  maxLength: 80,
};
export const Address_line_1 = {
  required: { value: true, message: "Please enter address line 1" },
  maxLength: 80,
};
export const Address_line_2 = {
  required: { value: true, message: "Please enter address line 2" },
  maxLength: 80,
};
export const CardNumber = {
  required: { value: true, message: "Please enter card number" },
  pattern: { value: /(?:\d[ -]*?){13,19}/gm, message: 'Please enter a valid card number' },
};
export const GSTIN = {
  required: { value: true, message: "Please enter GST number" },
};
export const Cvv = {
  required: { value: true, message: "Please enter cvv" },
  pattern: { value: /^[0-9]{3,4}$/, message: 'Please enter a valid cvv' },
};
export const PanNo = {
  required: { value: true, message: "Please enter pan number" },
  pattern: { value: /[A-Z]{5}[0-9]{4}[A-Z]{1}$/, message: 'Please enter a valid pan number' },
};
export const Address = { required: { value: true, message: "Please enter complete address" }, maxLength: 200 };
export const phone_pattern = /^(\+[0123456789]{2,4}[ ])?[0123456789]{10,12}$/;
export const required = Joi.date().required();
export const phone = Joi.string().pattern(phone_pattern).required();
export const gender = Joi.string().valid("male", "female");
export const guestDocument = Joi.string().valid("passport", "aadhar_card", "pan_card", "election_id", "driving_license", "birth_certificate").required().messages({
  "any.required": "Please select and upload a document",
  "any.only": "Please upload a valid document",
  "string.empty": "Please select and upload a document",
});
export const string = Joi.string().min(2).required();
// export const stringOptional = Joi.string().min(2).optional();
export const stringOptional = Joi.alternatives().try(
  Joi.string().min(2),
  Joi.string().valid('') // explicitly allow empty string
).optional();
export const boolean = Joi.boolean().required();
export const email = Joi.string()
  .email({ minDomainSegments: 2, tlds: { allow: false } })
  .required();
export const date = Joi.date().required();
export const consent = Joi.boolean().valid(true).required().messages({
  'any.only': 'You must agree to the terms',
  'any.required': 'Consent is required',
});

export const Required = {
  required: { value: true, message: "Please enter a value" },
};