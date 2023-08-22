const form = document.querySelector("form");
const email = document.getElementById("email");

const info = document.querySelector(".info");
const main = document.querySelector("main");
const popup = document.querySelector(".popup");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!validation()) {
    showInfoFailure("Podano niepoprawny adres e-mail.");
    console.log("niepoprawna walidacja");
  } else {
    loader();
  }
});

function validation() {
  const ifContinue = {
    email: true,
  };

  const emailError = document.querySelector("#emailError");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email.value)) {
    email.classList.add("error");
    emailError.classList.add("visible");
    ifContinue.email = false;
  } else {
    email.classList.remove("error");
    emailError.classList.remove("visible");
    ifContinue.email = true;
  }

  function isVaidationOk(obj) {
    return Object.values(obj).every((el) => el === true);
  }

  return isVaidationOk(ifContinue);
}

function loader() {
  main.classList.add("blur");
  popup.classList.add("showPopup");
  setTimeout(() => {
    main.classList.remove("blur");
    popup.classList.remove("showPopup");
    window.location.href = "#";
    showInfoSuccess("Sprawdź swoją pocztę e-mail");
  }, 2000);
}

function showInfoSuccess(message) {
  info.innerText = message;
  info.classList.add("showInfo");
  setTimeout(() => {
    info.classList.remove("showInfo");
  }, 2000);
}

function showInfoFailure(message) {
  info.innerText = message;
  info.classList.add("showInfo", "addErrorInfo");
  setTimeout(() => {
    info.classList.remove("showInfo", "addErrorInfo");
  }, 2000);
}
