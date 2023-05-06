const forms = document.querySelector(".forms"),
  pwShowHide = document.querySelectorAll(".eye-icon"),
  links = document.querySelectorAll(".link"),
  users = JSON.parse(localStorage.getItem("users")) || []

pwShowHide.forEach((eyeIcon) => {
  eyeIcon.addEventListener("click", () => {
    let pwFields = eyeIcon.parentElement.parentElement.querySelectorAll(".password")

    pwFields.forEach((password) => {
      if (password.type === "password") {
        password.type = "text"
        eyeIcon.classList.replace("bx-hide", "bx-show")
        return
      }
      password.type = "password"
      eyeIcon.classList.replace("bx-show", "bx-hide")
    })
  })
})

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    forms.classList.toggle("show-signup")
  })
})

// Registrarse

function store() {
  var email = document.getElementById("email")
  var pw = document.getElementById("pw")

  if (email.value.length == 0) {
    alert("Porfavor introducir email")
  } else if (pw.value.length == 0) {
    alert("Porfavor introducir contraseña")
  } else if (email.value.length == 0 && pw.value.length == 0) {
    alert("Porfavor introducir Email y Contraseña")
  } else {
    users.push({email: email.value, pw: pw.value})
    localStorage.setItem("users", JSON.stringify(users))
    alert("Tu cuenta ha sido creada")
    forms.classList.toggle("show-signup")
  }
}

// Iniciar sesión

function check() {
  event.preventDefault()
  var userName = document.getElementById("userName").value
  var userPw = document.getElementById("userPw").value
  var userFound = false

  for (var i = 0; i < users.length; i++) {
    if (users[i].email == userName && users[i].pw == userPw) {
      userFound = true
      break
    }
  }

  if (userFound) {
    window.location.href = "./feed.html"
  } else {
    alert("Esa cuenta no está registrada")
  }
}

let userEmail = localStorage.getItem("userName")
