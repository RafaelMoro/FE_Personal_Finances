// The pathname in reset password includes "/reset-password/oneTimeToken"
export const RESET_PASSWORD_POST_ROUTE = 'users';
export const RESET_PASSWORD_ERROR_REDIRECT = '/forgot-password';

const ERROR_INVALID_JWT = 'Invalid JWT';
const ERROR_JWT_NOT_FOUND = 'JWT not found';
const ERROR_JWT_EXPIRED = 'JWT Expired';

export const errors = [
  ERROR_INVALID_JWT,
  ERROR_JWT_NOT_FOUND,
  ERROR_JWT_EXPIRED,
];
