import jwt from 'jsonwebtoken';

export class JwtAdapter {
  static async generateToken(
    payload: Object,
    duration: string = '2h'
  ): Promise<string | null> {
    return new Promise((resolve) => {
      jwt.sign(payload, 'AAA', { expiresIn: duration }, (err, token) => {
        if (err) return resolve(null);

        resolve(token!);
      });
    });
  }

  static validateToken<T>(token: string): Promise<T | null> {
    return new Promise((resolve) => {
      jwt.verify(token, 'AAA', (err, decoded) => {
        if (err) return resolve(null);

        resolve(decoded as T);
      });
    });
  }
}
