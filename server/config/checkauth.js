const verify = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const token = bearer[1];
    req.token = token;
    next();
  } else {
    res.status(403).json({
      status: 403,
      error: 'Forbidden route',
    });
  }
};

export default verify;
