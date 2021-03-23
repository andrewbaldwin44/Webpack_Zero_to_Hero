import path from "path";
import Express from "express";
import React from "react";
import { Provider } from "react-redux";
import { renderToString } from "react-dom/server";
import { renderFile } from "ejs";
import serialize from "serialize-javascript";

import App from "../app";
import configureStore from "../redux/store";

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
  const store = configureStore({ penguins: 3 });
  const html = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const initialState = `
    <script>
      window.__INITIAL_STATE__ = ${serialize(store.getState())}
    </script>
  `;

  res.render("index.html", { html, initialState });
}
