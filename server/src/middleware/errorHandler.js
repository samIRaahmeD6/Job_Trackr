const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // ← if this line is missing, add it temporarily
  res.status(err.statusCode || 500).json({ message: err.message });
};
export default errorHandler;