import jwt from "jsonwebtoken";

const key = <string>process.env.KEY;

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, key, { ...(options && options) });
}

export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, key);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }
}
