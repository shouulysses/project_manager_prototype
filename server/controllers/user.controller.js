import jwt from 'jsonwebtoken';
import User from '../models/user'
import passport from '../passport';

export function signup(req, res, next) {
  if(!req.body.user.email || !req.body.user.password || !req.body.user.confirmPassword) {
    return res.status(403).json({
      user: { ok: false },
      message: 'Please fill in the information'
    });
  }
  if(req.body.user.password !== req.body.user.confirmPassword){
    return res.status(403).json({
      user: { ok: false },
      message: 'Password does not match'
    });
  }
  
  User.findOne({ email: req.body.user.email }).exec((err, repeatUser) => {
    if(err){
      res.satus(500).send(err);
    }
    if(repeatUser){
      return res.status(403).json({
        user: { ok: false },
        message: 'Email already exists'
      });
    } else {
      const user = new User({
        email: req.body.user.email,
        password: req.body.user.password
      });
      user.password = user.generateHash(user.password);
      user.save((err, saved) => {
        if(err)
          console.log(err);
          
        const token = jwt.sign({ email: saved.email }, 'secret', { subject: saved.cuid});
        return res.status(200).json({
          user: { ok: true, token},
          message: 'success'
        });
      });
    }
  });
}
