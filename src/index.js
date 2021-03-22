import _ from "lodash";

import { print } from "./print";
import Penguin from "./assets/images/penguin.jpg";
import "./styles/style.css";
import "./styles/style.scss";

function component() {
  const element = document.createElement("div");
  const cssSpan = document.createElement("span");
  const scssSpan = document.createElement("span");
  const myPenguin = new Image();

  cssSpan.innerHTML = _.join(["Hello", "css"], " ");
  cssSpan.classList.add("hello-css");
  scssSpan.innerHTML = _.join(["Hello", "sass"], " ");
  scssSpan.classList.add("hello-sass");

  myPenguin.src = Penguin;

  element.appendChild(cssSpan);
  element.appendChild(scssSpan);
  element.appendChild(myPenguin);

  return element;
}

print("webpack");

document.body.appendChild(component());
