import React from "react";

import Penguin from "./assets/images/penguin.jpg";
import { print } from "./print";
import "./styles/style.css";
import "./styles/style.scss";

export default function App() {
  print("Webpack!");
  return (
    <div>
      <span className="hello-css">Hello CSS</span>
      <span className="hello-sass">Hello Sass</span>
      <img alt="penguin" src={Penguin} />
    </div>
  );
}
