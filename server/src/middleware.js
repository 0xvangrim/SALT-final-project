import token from './businessLayer/token';

const middleware = {};

middleware.validToken = (req, res, next) => {
  const respondWithBadRequest = (err) => {
    res.status(400).send({
      status: 400,
      message: `Bad request. Reason: ${err}`,
    });
  };

  const jwt = token.tokenFromAuthHeader(req.header('Authorization'));

  if (!jwt) {
    return respondWithBadRequest('Missing aothorization header');
  }

  try {
    const decoded = token.verify(jwt);
    req.user = decoded;
    next();
  } catch (e) {
    return respondWithBadRequest('Invalid JWT');
  }
};

module.exports = middleware;
