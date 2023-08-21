export const signup_get = (req: Request, res: any) => {
  res.send("signup get");
};
export const login_get = (req: Request, res: any) => {
  res.send("login get");
};
export const signup_post = (req: Request, res: any) => {
  const { email, password }: { email: string; password: string } =
    req.body as any;
  console.log({ email, password });
  res.send("signup_post");
};
export const login_post = (req: Request, res: any) => {
  try {
    const { email, password }: { email: string; password: string } =
      req.body as any;
    console.log({ email, password });
  } catch (error) {
    console.log(error);
  }
};
