const BASE_URL = "https://ds-elp2-be.herokuapp.com/";

const form = document.querySelector("form");
const email = document.getElementById("email");
const password = document.getElementById("password");
const rememberMeCheckbox = document.getElementById("rememberMe");
const main = document.querySelector("main");
const popup = document.querySelector(".popup");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!validation()) {
    console.log("niepoprawna walidacja");
  } else {
    // console.log("ok");

    const data = {
      email: email.value,
      password: password.value,
    };

    // console.log(data);

    (async () => {
      try {
        const response = await fetch(`${BASE_URL}auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        // console.log(response);
        if (!response.ok) {
          throw new Error(`error: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
        console.log("Zalogowano sie na konto uzytkownika");
        localStorage.setItem(
          "access_token",
          JSON.stringify(result.access_token)
        );
        if (rememberMeCheckbox.checked) {
          localStorage.setItem("rememberMe", JSON.stringify(true));
        }
        success();
      } catch (error) {
        console.error(error);
        alert(
          `Coś poszło nie tak. Spróbuj zalogować się ponownie. 
          ${error}`
        );
      }
    })();
  }
});

function validation() {
  const ifContinue = {
    email: true,
    password: true,
  };

  const emailError = document.querySelector("#emailError");
  const passwordError = document.querySelector("#passwordError");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!#%*?&])[A-Za-z\d@$!#%*?&]{8,}$/;

  if (!emailRegex.test(email.value)) {
    email.classList.add("error");
    emailError.classList.add("visible");
    ifContinue.email = false;
  } else {
    email.classList.remove("error");
    emailError.classList.remove("visible");
    ifContinue.email = true;
  }

  if (!passwordRegex.test(password.value)) {
    password.classList.add("error");
    passwordError.classList.add("visible");
    ifContinue.password = false;
  } else {
    password.classList.remove("error");
    passwordError.classList.remove("visible");
    ifContinue.password = true;
  }

  function isVaidationOk(obj) {
    return Object.values(obj).every((el) => el === true);
  }

  return isVaidationOk(ifContinue);
}

function success() {
  main.classList.add("blur");
  popup.classList.add("showPopup");
  setTimeout(() => {
    main.classList.remove("blur");
    popup.classList.remove("showPopup");
    window.location.href = "./profile.html";
  }, 2000);
}
