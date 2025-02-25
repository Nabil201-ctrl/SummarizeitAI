// middleware/errorHandler.js
module.exports = (err, req, res, next) => {
    // Comment: Handles errors with fade-in animation, optimized for performance
    console.error(err.stack);
    res.status(err.status || 500).render('error', {
      message: err.message || 'An unexpected error occurred.',
      status: err.status || 500,
      user: req.user,
      title: 'Error'
    });
  };