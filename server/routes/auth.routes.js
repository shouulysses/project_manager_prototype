import { Router } from 'express';
import jwt from 'jsonwebtoken';
import passport from '../passport';
import User from '../models/user';
import * as UserController from '../controllers/user.controller';

const router = new Router();

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {session: false}, (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({
        user: { ok: false },
        message: info.message,
      });
    } else {
      const payload = {email: user.email};
      const options = {subject: user.cuid};
      const token = jwt.sign(payload, 'secret', options);
      return res.json({
        message: '',
        user: { ok: true, token }
      });
    }
  })(req, res, next);
});

router.route('/signup').post(UserController.signup); 
  
router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
  return res.json({
    user: { ok: true }
  });
});

export default router;
