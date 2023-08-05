const BASE_URL = "https://ds-elp2-be.herokuapp.com/";

const form = document.querySelector("form");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const termsCheckbox = document.getElementById("terms");
const main = document.querySelector("main");
const popup = document.querySelector(".popup");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!validation()) {
    console.log("niepoprawna walidacja");
  } else {
    console.log("ok");

    const data = {
      email: email.value,
      firstName: firstName.value,
      lastName: lastName.value,
      password: password.value,
    };

    console.log(data);

    (async () => {
      try {
        const response = await fetch(`${BASE_URL}auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (response.status >= 200 && response.status < 300) {
          console.log(response);
          const result = await response.json();
          success();
          console.log(result);
          console.log("Dodano nowego uzytkownika");
        } else if (response.status === 403) {
          console.log("Taki użytkownik już istnieje, użyj innego maila");
          throw new Error(`error: ${response.status}`);
        }
      } catch (error) {
        console.error("error", error);
      }
    })();
  }
});

function validation() {
  const ifContinue = {
    firstName: true,
    lastName: true,
    email: true,
    password: true,
    termsCheckbox: true,
  };

  const firstNameError = document.querySelector("#firstNameError");
  const lastNameError = document.querySelector("#lastNameError");
  const emailError = document.querySelector("#emailError");
  const passwordError = document.querySelector("#passwordError");
  const termsError = document.querySelector("#termsError");

  const firstNameRegex = /^[A-Z][a-z]{1,19}$/;
  const lastNameRegex = /^[A-Z][a-z]{1,19}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!#%*?&])[A-Za-z\d@$!#%*?&]{8,}$/;

  if (!firstNameRegex.test(firstName.value)) {
    firstName.classList.add("error");
    firstNameError.classList.add("visible");
    ifContinue.firstName = false;
  } else {
    firstName.classList.remove("error");
    firstNameError.classList.remove("visible");
    ifContinue.firstName = true;
  }

  if (!lastNameRegex.test(lastName.value)) {
    lastName.classList.add("error");
    lastNameError.classList.add("visible");
    ifContinue.lastName = false;
  } else {
    lastName.classList.remove("error");
    lastNameError.classList.remove("visible");
    ifContinue.lastName = true;
  }

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

  if (!termsCheckbox.checked) {
    termsCheckbox.classList.add("error");
    termsError.classList.add("visible");
    ifContinue.termsCheckbox = false;
  } else {
    termsCheckbox.classList.remove("error");
    termsError.classList.remove("visible");
    ifContinue.termsCheckbox = true;
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
    window.location.href = "./login.html";
  }, 2000);
}
