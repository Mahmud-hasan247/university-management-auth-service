import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

export const generate_token = (
  data: object,
  secret: Secret,
  expires_in: string
): string => {
  const token = jwt.sign(data, secret, { expiresIn: expires_in });

  return token;
};

export const verify_token = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};
