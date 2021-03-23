import path from "path";
import Express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import { renderFile } from "ejs";

import App from "../app";

const app = Express();
const port = 3000;

app
  .set("views", path.join(process.cwd(), "dist"))
  .use("/assets", Express.static(path.join(process.cwd(), "dist/assets")))
  .set("view engine", "ejs")
  .engine("html", renderFile)
  .get("*/", handleRender)
  .listen(port);

function handleRender(_, res) {
  const html = renderToString(<App />);

  res.render("index.html", { html });
}
