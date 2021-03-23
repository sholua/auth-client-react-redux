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
  rest.delete(`${config.apiUrl}/auth/logout`, (req, res, ctx) => {
    return res(ctx.json("User logged out!"));
  }),
  rest.post(`${config.apiUrl}/auth/forgot_password`, (req, res, ctx) => {
    return res(ctx.json("Email sent"));
  }),
  rest.post(`${config.apiUrl}/auth/reset_password`, (req, res, ctx) => {
    return res(ctx.json("Password changed!"));
  }),
  rest.get(`${config.apiUrl}/auth/me`, (req, res, ctx) => {
    return res(
      ctx.json({
        _id: "test",
        firstName: "Test",
        email: "test@test.com",
        role: "pupil",
      })
    );
  }),
  rest.get(`${config.apiUrl}/users`, (req, res, ctx) => {
    return res(
      ctx.json([
        { _id: "1", firstName: "Test1", email: "test1@test.com" },
        { _id: "2", firstName: "Test2", email: "test2@test.com" },
      ])
    );
  }),
  rest.get(`${config.apiUrl}/users`, (req, res, ctx) => {
    return res(
      ctx.json([
        { firstName: "Shol", email: "s.52@ukr.net" },
        { firstName: "Oleksandr", email: "test@test.com" },
      ])
    );
  }),
  rest.post(`${config.apiUrl}/profile/upload/avatar`, (req, res, ctx) => {
    return res(
      ctx.json({
        _id: "test",
        email: "test@test.com",
        firstName: "Test",
        role: "admin",
        avatar: "avatar-test.jpg",
      })
    );
  }),
];
