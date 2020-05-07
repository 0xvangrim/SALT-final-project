import token from '../../businessLayer/token';

class UserController {
  /**
     * Just some mock login endpoint
     * @param {*} req
     * @param {*} res
     */
  login(req, res) {
    res.status(200).send({
      token: token.sign({
        username: req.body.username,
      }),
      username: req.body.username,
    });
  }
}

const instance = new UserController();
export default instance;
