import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string(),
    pin: z.string(),
  }),
});

export const AuthValidations = {
  loginValidationSchema,
};
