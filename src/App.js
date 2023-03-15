import React from "react";
import AuthContextProvider from "./context/AuthContext";
import AppRouter from "./router/AppRouter";
import { ToastContainer } from "react-toastify";
import MovieContextProvider from "./context/MovieContext";

const App = () => {
  return (
    <div className="dark:bg-gray-dark-main">
      <AuthContextProvider>
        <MovieContextProvider>
          <AppRouter />
          <ToastContainer />
        </MovieContextProvider>
      </AuthContextProvider>
    </div>
  );
};

export default App;

//! TAİLWİND KURULUMU

//? https://beta.reactjs.org/  reactın günlük hayatta kullanılacagımızın %80 burada
//? yarn add -D tailwindcss
//? npx tailwindcss init

//?  content kısmını değiştir  content: [ "./src/**/*.{js,jsx,ts,tsx}",],

//? src altındaki index.css e şunlar ekleniyor
//? @tailwind base;
//? @tailwind components;
//? @tailwind utilities;

//? yarn start

//? https://tailwindui.com/components/preview
//? https://tailwind-elements.com/quick-start/
//? https://tailwind-elements.com/docs/standard/getting-started/quick-start/
//? https://flowbite.com/docs/getting-started/react/
//? https://daisyui.com/docs/install/
//? https://tailwindcomponents.com/

//? Tailwind CSS IntelliSense eklenti ekle
