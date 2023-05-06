// Agregar evento para el formulario de publicación
document.querySelector(".publicar__formulario").addEventListener("submit", function (e) {
  e.preventDefault()

  // Obtener los valores de los campos del formulario
  var titulo = document.querySelector("#titulo").value
  var imagen = document.querySelector("#imagen").files[0]
  var descripcion = document.querySelector("#descripcion").value
  var imagenURL = URL.createObjectURL(imagen)

  // Crear un nuevo elemento li con los valores del formulario
  var li = document.createElement("li")
  li.classList.add("publicaciones__item")
  li.setAttribute("data-id", "4") // Cambiar el valor del atributo data-id al siguiente número disponible
  li.innerHTML = `
    <div class="publication-content">
      <h2 class="publication-title">${titulo}</h2>
      <img class="publication-image" src="${imagenURL}" alt="Descripción de la imagen" />
      <p class="publication-description">${descripcion}</p>
    </div>
    <div class="publication-actions">
      <button class="like-button"><i class="bx bx-like"></i> Me gusta</button>
      <button class="share-button"><i class="bx bx-share"></i> Compartir</button>
    </div>
  `

  // Agregar el nuevo elemento li al contenedor de nuevos posts
  var newPostsContainer = document.querySelector(".new-posts-container")
  newPostsContainer.insertBefore(li, newPostsContainer.firstChild)

  // Limpiar los campos del formulario
  document.querySelector("#titulo").value = ""
  document.querySelector("#imagen").value = ""
  document.querySelector("#descripcion").value = ""

  // Mostrar el contenedor de nuevos posts y ocultar el formulario de publicación
  document.querySelector(".publicar").style.display = "none"
  newPostsContainer.style.display = "block"
})

const publicarBoton = document.querySelector(".site-navbar #crear-publicacion")
const publicarSection = document.querySelector(".publicar")

publicarBoton.addEventListener("click", function () {
  publicarSection.style.display = "block"
})

//Search

const searchBar = document.querySelector(".search-box")

searchBar.addEventListener("input", (event) => {
  const searchText = event.target.value.toLowerCase()

  const publicaciones = document.querySelectorAll(".publicaciones__item")

  publicaciones.forEach((publicacion) => {
    const titulo = publicacion
      .querySelector(".publication-title")
      .textContent.toLowerCase()

    if (titulo.includes(searchText)) {
      publicacion.style.display = "block"
    } else {
      publicacion.style.display = "none"
    }
  })
})

// Obtener el botón de like y el ID del post correspondiente
const likeButtons = document.querySelectorAll(".like-button")
const postIDs = document.querySelectorAll(".publicaciones__item")
const savedPostsIDs = JSON.parse(localStorage.getItem("savedPostsIDs")) || []

// Agregar evento click a los botones de "Me gusta"
likeButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    // Obtener el ID del post correspondiente al botón de "Me gusta"
    const postID = postIDs[index].getAttribute("data-id")

    // Verificar si el post ya tiene like
    const isSaved = savedPostsIDs.includes(postID)

    if (isSaved) {
      savedPostsIDs.splice(savedPostsIDs.indexOf(postID), 1)
      button.innerHTML = "Me gusta"
    } else {
      savedPostsIDs.push(postID)
      button.innerHTML = "Ya te gusta"
    }

    // Guardar la lista de IDs de posts guardados en localStorage
    localStorage.setItem("savedPostsIDs", JSON.stringify(savedPostsIDs))
  })
})

// Agregar evento click al botón "Guardados"
const savedButton = document.querySelector("#saved-button")
savedButton.addEventListener("click", () => {
  // Obtener la lista de publicaciones y mostrar solo las que han sido guardadas
  const publicaciones = document.querySelectorAll(".publicaciones__item")
  publicaciones.forEach((publicacion) => {
    const publicacionID = publicacion.getAttribute("data-id")
    const isSaved = savedPostsIDs.includes(publicacionID)

    if (isSaved) {
      publicacion.style.display = "block"
    } else {
      publicacion.style.display = "none"
    }
  })

  // Cambiar la URL para que muestre la sección de guardados
  window.location.hash = "guardados"
})
// Agregar evento click al botón "Inicio"
const homeButton = document.querySelector("#home-button")
homeButton.addEventListener("click", () => {
  // Obtener la lista de publicaciones y mostrar todas
  const publicaciones = document.querySelectorAll(".publicaciones__item")
  publicaciones.forEach((publicacion) => {
    publicacion.style.display = "block"
  })
})

const navToggler = document.querySelector(".nav-toggler")
const navMenu = document.querySelector(".site-navbar ul")

navToggler.addEventListener("click", () => {
  navMenu.classList.toggle("open")
})
const navItems = document.querySelectorAll(".site-navbar ul li a")

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navMenu.classList.remove("open")
  })
})
