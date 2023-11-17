export const allowedOrigins = ["http://localhost:3000", "http://localhost:8000"];

export const corsOptions = {
  origin: (origin: string | undefined, callback: (arg0: Error | null, arg1: boolean) => void) => {
    if ((origin && allowedOrigins.indexOf(origin) !== -1) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("not allowed by CORS policies"), false);
    }
  },
  optionsSucessStatus: 200,
};

export const ROLES_LIST = {
  admin: 1,
  user: 2,
  presign: 3,
};
