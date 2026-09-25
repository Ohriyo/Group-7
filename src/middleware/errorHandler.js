import { AppError } from "../utils/AppError.js";

const errorHandler = (err, req, res, next) => {
  const isKnownError = err instanceof AppError;

  const statusCode = isKnownError ? err.statusCode : 500;
  const errorCode = isKnownError ? err.errorCode : "INTERNAL_ERROR";
  const message = isKnownError
    ? err.message
    : "Something went wrong. Please try again later.";
  const details = isKnownError ? err.details : null;

  if (!isKnownError) {
    console.error("Unexpected error:", err);
  }

  res.status(statusCode).json({
    success: false,
    error: {
      code: errorCode,
      message,
      details,
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
    },
  });
};

export default errorHandler;