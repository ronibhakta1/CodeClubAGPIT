import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.html(
    '<h1 style="text-align: center ; font-size: 50px">Code Club AGPIT</h1> <h2 style="text-align: center ; font-size: 30px">Backend API</h2> <p style="text-align: center ; font-size: 20px"> <a href="https://codeclubagpit.vercel.app/"> website link </p>'
  );
})
app.get("/", (c) => {
  return c.html(
    '<h1 style="text-align: center ; font-size: 50px">Code Club AGPIT</h1> <h2 style="text-align: center ; font-size: 30px">Backend API</h2> <p style="text-align: center ; font-size: 20px"> <a href="https://codeclubagpit.vercel.app/"> website link </p>'
  );
})
app.get("/staff", (c) => {
  return c.html(
    '<h1 style="text-align: center ; font-size: 50px">Code Club AGPIT</h1> <h2 style="text-align: center ; font-size: 30px">Backend API</h2> <p style="text-align: center ; font-size: 20px"> <a href="https://codeclubagpit.vercel.app/"> website link </p>'
  );
})
app.get("/visitor", (c) => {
  return c.html(
    '<h1 style="text-align: center ; font-size: 50px">Code Club AGPIT</h1> <h2 style="text-align: center ; font-size: 30px">Backend API</h2> <p style="text-align: center ; font-size: 20px"> <a href="https://codeclubagpit.vercel.app/"> website link </p>'
  );
})
app.get("/event", (c) => {
  return c.html(
    '<h1 style="text-align: center ; font-size: 50px">Code Club AGPIT</h1> <h2 style="text-align: center ; font-size: 30px">Backend API</h2> <p style="text-align: center ; font-size: 20px"> <a href="https://codeclubagpit.vercel.app/"> website link </p>'
  );
}) 

app.get("/evenregistration", (c) => {
  return c.html(
    '<h1 style="text-align: center ; font-size: 50px">Code Club AGPIT</h1> <h2 style="text-align: center ; font-size: 30px">Backend API</h2> <p style="text-align: center ; font-size: 20px"> <a href="https://codeclubagpit.vercel.app/"> website link </p>'
  );
})
app.get("/payment", (c) => {
  return c.html(
    '<h1 style="text-align: center ; font-size: 50px">Code Club AGPIT</h1> <h2 style="text-align: center ; font-size: 30px">Backend API</h2> <p style="text-align: center ; font-size: 20px"> <a href="https://codeclubagpit.vercel.app/"> website link </p>'
  );
})
app.get("/users", (c) => {
  return c.html(
    '<h1 style="text-align: center ; font-size: 50px">Code Club AGPIT</h1> <h2 style="text-align: center ; font-size: 30px">Backend API</h2> <p style="text-align: center ; font-size: 20px"> <a href="https://codeclubagpit.vercel.app/"> website link </p>'
  );
})
;

export default app;
