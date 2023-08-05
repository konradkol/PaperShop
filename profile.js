const access_token = JSON.parse(localStorage.getItem("access_token"));
const rememberMe = JSON.parse(localStorage.getItem("rememberMe"));
const BASE_URL = "https://ds-elp2-be.herokuapp.com/";
const liElements = document.getElementsByTagName("li");

const userContent = document.getElementById("userContent");
const innerContent = document.getElementById("innerContent");
const logoutButton = document.querySelector(".logout");

if (!access_token) {
  userContent.innerHTML = `<h3> Coś poszło nie tak.</h3> <p>Taki użytkownik nie istnieje, lub wystąpił błąd podczas logowania. Spróbuj ponownie później.</p> <a href="login.html">Wróć do strony logowania</a>
  `;
  console.log("nie jestes zalogowany");
} else {
  console.log("profile request");
  (async () => {
    try {
      const response = await fetch(`${BASE_URL}profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      });
      console.log("response", response);

      if (response.ok) {
        const result = await response.json();
        console.log("result", result);
        console.log("Jestes na swoim profilu");
        innerContent.innerHTML = result
          .map(
            (item) =>
              `<li>${item.firstName}, ${item.lastName}, ${new Date(
                item.createdAt
              ).toLocaleDateString()} g.${new Date(
                item.createdAt
              ).toLocaleTimeString()}</li>`
          )
          .join("");
        [...liElements].forEach((li) => {
          if (li.innerText.includes("Pecyna")) {
            li.style = "background-color: red";
          }
        });
      } else if (response.status === 401) {
        userContent.innerHTML = `<h3> Coś poszło nie tak.</h3> <p>${response.statusText}</p> <a href="login.html">Wróć do strony logowania</a>`;
      } else throw new Error(`error: ${response.status}`);
    } catch (error) {
      console.error("error", error);
    }
  })();
}

logoutButton.addEventListener("click", () => {
  logout();
});

function logout() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("rememberMe");
  window.location.href = "./login.html";
}

window.addEventListener("beforeunload", () => {
  if (!rememberMe) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("rememberMe");
  }
});
