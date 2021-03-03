import { rest } from "msw";
import config from "../config.json";

export const handlers = [
  rest.post(`${config.apiUrl}/auth/register`, (req, res, ctx) => {
    return res(
      ctx.json({
        firstName: "Test",
        email: "test@test.com",
      })
    );
  }),
  rest.post(`${config.apiUrl}/auth/login`, (req, res, ctx) => {
    return res(ctx.json({ firstName: "Test", email: "test@test.com" }));
  }),
  rest.get(`${config.apiUrl}/users`, (req, res, ctx) => {
    return res(
      ctx.json([
        { firstName: "Shol", email: "s.52@ukr.net" },
        { firstName: "Oleksandr", email: "test@test.com" },
      ])
    );
  }),
];
