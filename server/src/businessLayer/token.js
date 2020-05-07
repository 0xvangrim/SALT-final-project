import jwt from 'jsonwebtoken';
import config from '../config';

class Token {
  tokenFromAuthHeader(authorization) {
    if (!authorization || authorization.trim().length == 0) {
      return null;
    }

    return authorization.trim().substr(4);
  }

  verify(token, ignoreExpiration = false) {
    return jwt.verify(token, config.jwt.secret, { ignoreExpiration });
  }

  sign(payload) {
    return jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn,
      algorithm: config.jwt.algorithm,
    });
  }
}

const instance = new Token();
export default instance;
