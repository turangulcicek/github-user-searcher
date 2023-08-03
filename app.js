import { Github } from "./github.js";
import { UI } from "./ui.js";

// class'ın örneğini oluşturma
const github = new Github();
const ui = new UI();

//! Html'den gelenler
const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-btn");
const themeBtn = document.querySelector("#theme-btn");
const body = document.querySelector("body");

//! olay izleyicileri
searchButton.addEventListener("click", getInput);
themeBtn.addEventListener("click", changeTheme);

//! methodlar
function getInput() {
  // arama terimi dolu ise çalışır
  if (searchInput.value) {
    // api 'isteği atar
    github
      .fetchUserData(searchInput.value)
      .then((res) => {
        // eğer kullanıcı bulunamadıysa
        if (res.data.message === "Not Found") {
          ui.showAlert("aradığınız kişi bulunamadı", "alert-info");
        } else {
          // kullanıcı bulunduysa
          ui.showAlert("kişi bulundu", "alert-success");
          ui.renderProfile(res.data);
          ui.renderProjects(res.repos);
        }
      })
      .catch((err) => console.log(err));

    return;
  }

  // arama terimi boş ise çalışır
  ui.showAlert("lütfen isim giriniz", "alert-warning");
}

// temayı değiştirme

function changeTheme() {
  // arka planı değiştirme
  body.classList.toggle("bg-dark");
  body.classList.toggle("text-bg-dark");

  if (body.classList.contains("bg-dark")) {
    themeBtn.innerText = "açık mod";
  } else themeBtn.innerText = "koyu mod";
}
