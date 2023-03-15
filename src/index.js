import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";
import "tw-elements";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

//? burada sarmallamamızın amacı navigate Router  ıcınde oldugu ıcın BrowserRouter ın  Context ı kapsaması lazım. ancak burada kapsıyor.

//? Burası AuthContextProvider oldugu ıcın burada navıgate() tanımlıyoruz ama App.js de  <AuthContextProvider> <AppRouter /> </AuthContextProvider> olduğu için navigate cağırdığımız yerde BrowserRouter ıle sarmallamamaız lazım. BrowserRouter AppRouter ıcınde olursa Context te kullanamayız. Bu yüzden Browser routerı index.js de cagırdık.
