const jwt = require('jsonwebtoken');

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};

const isTokenValid = (token) => jwt.verify(token, process.env.JWT_SECRET);

const attachCookiesToResponse = ({res, user, refreshToken})=>{
    const accessTokenJWT = createJWT({ payload: {user}});
    const refreshTokenJWT = createJWT({ payload: {user, refreshToken}});


  const oneDay = 1000 * 60 * 60 * 24;
  const fiveSeconds = 5* 1000;

  res.cookie('accessToken', accessTokenJWT, {
    httpOnly: true,
    // expires: new Date(Date.now() + fiveSeconds),
    secure: process.env.NODE_ENV === 'production',
    signed: true,
    maxAge: 1000,
  });
  res.cookie('refreshToken', refreshTokenJWT, {
    httpOnly: true,
    expires: new Date(Date.now() + fiveSeconds),
    secure: process.env.NODE_ENV === 'production',
    signed: true,
    maxAge: 6000,
  });
}

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
};
