import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../auth/firebase";
import {
  toastErrorNotify,
  toastSuccessNotify,
  toastWarnNotify,
} from "../helpers/ToastNotify";

// export const {Provider} = createContext()
export const AuthContext = createContext();
//* with custom hook
// export const useAuthContext = () => {
//     return useContext(AuthContext);
//   };

const AuthContextProvider = ({ children }) => {
  //? Burası AuthContextProvider oldugu ıcın burada navıgate() tanımlıyoruz ama App.js de  <AuthContextProvider> <AppRouter /> </AuthContextProvider> olduğu için navigate cağırdığımız yerde BrowserRouter ıle sarmallamamaız lazım. BrowserRouter AppRouter ıcınde olursa Context te kullanamayız. Bu yüzden Browser routerı index.js de cagırdık.

  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user")) || false
  );
  //? giriş yaptıgında seesıonstorage  e attık o yuzden currentuserın ınıtal yanı ılk değerini seesiondan atayabiliriz.giriş yaptığımızda navbar da ismimizin görünmesi için...

  useEffect(() => {
    //!sayfa render olduğunda kullanıcı bilgilerini tutmak için firebas de oluşan sessionStorage buraya eklendi
    // setCurrentUser(JSON.parse(sessionStorage.getItem("user")));
    //? bir kez çalışması yetiyor o yüzden useEffect ıle cağırdık.sonrasında kendı userın logın ve logout olup olmadıgını yakıp etdiyor.
    userObserver();
  }, []);

  const createUser = async (email, password, displayName) => {
    try {
      //? yeni bir kullanıcı oluşturmak için kullanılan firebase metodu
      let userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      //? kullanıcı profilini güncellemek için kullanılan firebase metodu
      await updateProfile(auth.currentUser, {
        displayName: displayName,
      });
      navigate("/");
      toastSuccessNotify("Registered successfully!");
    } catch (error) {
      toastErrorNotify(error.message);
    }
  };
  //* https://console.firebase.google.com/
  //* => Authentication => sign-in-method => enable Email/password
  //! Email/password ile girişi enable yap
  const signIn = async (email, password) => {
    //? mevcut kullanıcının giriş yapması için kullanılan firebase metodu
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
      toastSuccessNotify("Logged in successfully!");
    } catch (error) {
      toastErrorNotify(error.message);
    }
  };

  const logOut = () => {
    signOut(auth);
  };

  const userObserver = () => {
    //? Kullanıcının signin olup olmadığını takip eden ve kullanıcı değiştiğinde yeni kullanıcıyı response olarak dönen firebase metodu
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, displayName, photoURL } = user;
        // ? SessionStorage !!!
        setCurrentUser({ email, displayName, photoURL });
        sessionStorage.setItem(
          "user",
          JSON.stringify({ email, displayName, photoURL })
        );
      } else {
        setCurrentUser(false);
        sessionStorage.clear();
        // console.log("logged out");
      }
    });
  };

  //* https://console.firebase.google.com/
  //* => Authentication => sign-in-method => enable Google
  //! Google ile girişi enable yap
  //* => Authentication => settings => Authorized domains => add domain
  //! Projeyi deploy ettikten sonra google sign-in çalışması için domain listesine deploy linkini ekle
  const signUpProvider = () => {
    //? Google ile giriş yapılması için kullanılan firebase metodu
    const provider = new GoogleAuthProvider();
    //? Açılır pencere ile giriş yapılması için kullanılan firebase metodu
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        navigate("/");
        toastSuccessNotify("Logged in successfully!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const forgotPassword = (email) => {
    //? Email yoluyla şifre sıfırlama için kullanılan firebase metodu
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        toastWarnNotify("Please check your mail box!");
        // alert("Please check your mail box!");
      })
      .catch((err) => {
        toastErrorNotify(err.message);
        // alert(err.message);
        // ..
      });
  };



 const values = {
   createUser,
   signIn,
   logOut,
   signUpProvider,
   forgotPassword,
   currentUser,
 };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;

//? Hook  ile cağırırısam  import etmeden ve belirtmeden kullanabılecegim....
//? export const AuthContext = createContext();
//? //* with custom hook
//? // export const useAuthContext = () => {
//? //     return useContext(AuthContext);
//? //   };


