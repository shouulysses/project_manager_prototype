import jwt from 'jsonwebtoken';
import User from '../models/user';

/**
 * Sign up a user
 * @param req.body: { user: { email, password, confirmPassword } }
 * @param res
 * @returns void; res.status({ user: { ok, token }, message })
 */

export function signup(req, res) {
  if (!req.body.user.email || !req.body.user.password || !req.body.user.confirmPassword) {
    res.status(403).json({
      user: { ok: false },
      message: 'Please fill in the information'
    });
  }
  if (req.body.user.password !== req.body.user.confirmPassword) {
    res.status(403).json({
      user: { ok: false },
      message: 'Password does not match'
    });
  }

  User.findOne({ email: req.body.user.email }).exec((err, repeatUser) => {
    if (err) {
      res.satus(500).send(err);
    }
    if (repeatUser) {
      res.status(403).json({
        user: { ok: false },
        message: 'Email already exists'
      });
    } else {
      const user = new User({
        email: req.body.user.email,
        password: req.body.user.password
      });
      user.password = user.generateHash(user.password);
      user.save((saveErr, saved) => {
        if (saveErr){
          res.status(403).json({
            message: 'user error'   
          });
        }

        const token = jwt.sign({ email: saved.email }, 'secret', { subject: saved.cuid });
        res.status(200).json({
          user: { ok: true, token },
          message: 'success'
        });
      });
    }
  });
}
