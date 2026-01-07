export const throwHttpError = (message, statusCode = 500 ) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  throw error;
};