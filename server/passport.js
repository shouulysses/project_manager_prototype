import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';

import User from './models/user';

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  function(email, password, done) {
    User.findOne({email})
    .then((user) => {
      if (!user) {
        done(null, false, { message: 'Invalid email' });
      } else if (!user.validatePassword(password, user.password)) {
        done(null, false, { message: 'Invalid password' });
      } else {
        done(null, user);
      }
    })
    .catch((err) => {
      done(err, false);
    }); 
  }
));


const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: 'secret'
};

const jwtSessionOptions = {
  jwtFromRequest: (req) => {
    let token = null;
    if (req && req.session) {
      token = req.session.token;
    }
    return token;
  },
  secretOrKey: 'secret'
};

const jwtCallback = (payload, done) => {
  const cuid = payload.sub;
  User.findOne({ cuid })
  .then((user) => {
    if (!user) {
      done(null, false);
    } else {
      done(null, user);
    }
  })
  .catch((err) => {
    done(err, false);
  });
};

const jwtStrategy = new JwtStrategy(
  jwtOptions, jwtCallback
);

const jwtSessionStrategy = new JwtStrategy(
  jwtSessionOptions, jwtCallback
);

passport.use('jwt', jwtStrategy);
passport.use('jwt-session', jwtSessionStrategy);

export default passport;
