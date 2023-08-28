import supabase from "../../../../config/database/supabaseClient";

export const signup_get = (req: Request, res: any) => {
  res.send("signup get");
};
export const login_get = (req: Request, res: any) => {
  res.send("login get");
};
export const signup_post = async (req: Request, res: any) => {
  const { email, password }: { email: string; password: string } =
  req.body as any;
  try {
    //console.log(supabase)
    let { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    console.log(data, error)
    res.status(201).send("user created");
  } catch (error) {
    console.log(error);
    res.status(400).send("error, user not created");
  }
};

export const login_post = (req: Request, res: any) => {
  try {
    const { email, password }: { email: string; password: string } =
      req.body as any;
    console.log({ email, password });
  } catch (error) {
    console.log(error);
    res.status(400).send("error in login_post");
  }
};
