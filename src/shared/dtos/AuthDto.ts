import z from "zod";

export const signinSchema = z.object({
    email: z.email().nonempty('O campo de e-mail não deve estar vazio'),
    password: z.string().min(8).max(20).nonempty('O campo de senha não deve estar vazio')
});

export const signupSchema = z.object({
    email: z.email().nonempty('O campo de e-mail não deve estar vazio'),
    password: z.string().min(8).max(20).nonempty('O campo de senha não deve estar vazio')
});

export type SigninDto = z.infer<typeof signinSchema>;
export type SignupDto = z.infer<typeof signupSchema>;