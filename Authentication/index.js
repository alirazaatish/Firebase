  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";
  import { getAuth,
           onAuthStateChanged,
           createUserWithEmailAndPassword ,
           signInWithEmailAndPassword,
           signOut 
          } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
 
  const firebaseConfig = {
    apiKey: "AIzaSyC4w33TFf3NAGVdeFNYJc0v38r38gPjJDA",
    authDomain: "practice-app-demo.firebaseapp.com",
    projectId: "practice-app-demo",
    storageBucket: "practice-app-demo.appspot.com",
    messagingSenderId: "862843645808",
    appId: "1:862843645808:web:de4986967f14e57c0969b5"
  };

  // ========================Initialize Firebase==========================================================
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);

  // =====================SignUP DOM Element==============================================================
  const signup_email = document.getElementById("signup_email");
  const signup_password = document.getElementById("signup_password");
  const signup_btn = document.getElementById("signup_btn");

  // =====================SignIn DOM Element==============================================================
  const signin_email = document.getElementById("signin_email");
  const signin_password = document.getElementById("signin_password");
  const signin_btn = document.getElementById("signin_btn");

  // ========================Summitting Form==============================================================
  signup_btn.addEventListener('click', creatUserAccount);
  signin_btn.addEventListener('click', signInAccount);

//================================SignOut Section=========================================================
  const auth_container = document.getElementById("auth_container");
  const user_container =document.getElementById("user_container");

  const user_email = document.getElementById("user_email");
  const signout_btn = document.getElementById("signout_btn");

  signout_btn.addEventListener('click', signout)

// =============================Check User State==========================================================
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log("User is login====>");
      auth_container.style.display="none";
      user_container.style.display="block";
      user_email.innerText = user.email;
      console.log(user.email);
    } else {
      console.log("User is logout!====>");
      auth_container.style.display="block";
      user_container.style.display="none";
    }
  });;

// ===================================Create User Account===================================================
  function creatUserAccount(){
    // console.log("Email====>", signup_email.value);
    // console.log("Password====>", signup_password.value);
    createUserWithEmailAndPassword(auth, signup_email.value, signup_password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User====>", user);
      auth_container.style.display="block";
      user_container.style.display="none";
      alert("User Created Sucessfully!");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      if(error.code === "auth/email-already-in-use"){
        alert("You have already create account! Pleace Login!")
      }
    });
    }

// ===================================Create User Account===================================================
    function signInAccount(){
      console.log("Signin Email is=>", signin_email.value);
      console.log("Signin Password is=>", signin_password.value);
      signInWithEmailAndPassword(auth, signin_email.value, signin_password.value)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(`${signin_email}, is Signin!`); 
        alert("Wellcom! Login Sucessfully.");
      
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if(error.code === "auth/invalid-credential"){
          alert("Invalid Email or Password!");
        }
      });
    }

    // =====================================signOut Function=================================================
    function signout(){
      signOut(auth).then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
    }