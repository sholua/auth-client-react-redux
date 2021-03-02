import { rest } from "msw";
import config from "../config.json";

export const handlers = [
  rest.get(`${config.apiUrl}/users`, (req, res, ctx) => {
    return res(
      ctx.json([
        { firstName: "Shol", email: "s.52@ukr.net" },
        { firstName: "Oleksandr", email: "test@test.com" },
      ])
    );
  }),
];
