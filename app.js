
document.addEventListener("DOMContentLoaded", function() {
    if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker.register("./service-worker.js")
        .then(function() {
          console.log("LIFE+ está lista 💜");
        })
        .catch(function(error) {
          console.log("Error:", error);
        });
    });
    }
  const app = document.getElementById("app");

  app.innerHTML = `
    <header class="top">
      <div>
        <p>BIENVENIDA A TU ESPACIO</p>
        <h1>LIFE+ 💜</h1>
      </div>
      <button class="profile" onclick="abrir('Mi perfil')">👤</button>
    </header>

    <main id="pantalla"></main>

    <nav class="bottom">
      <button onclick="inicio()">🏠<span>Inicio</span></button>
      <button onclick="abrir('Organización')">📅<span>Organizar</span></button>
      <button onclick="abrir('Ejercicio')">💪<span>Ejercicio</span></button>
      <button onclick="abrir('Mi perfil')">👤<span>Perfil</span></button>
    </nav>
  `;

  inicio();
});

function inicio() {
  document.getElementById("pantalla").innerHTML = `
    <section class="welcome">
      <p>Tu nueva historia comienza hoy ✨</p>
      <h2>¡Hola! Bienvenida 💜</h2>
      <p>Organiza tu vida, cuida de ti y alcanza tus metas.</p>
    </section>

    <h2 class="section-title">Tu espacio personal</h2>

    <div class="cards">
      <button onclick="abrir('Organización')">📅<span>Organización</span></button>
      <button onclick="abrir('Ejercicio')">💪<span>Ejercicio</span></button>
      <button onclick="abrir('Estudios')">📚<span>Estudios</span></button>
      <button onclick="abrir('Bienestar')">🌸<span>Bienestar</span></button>
      <button onclick="abrir('Mis metas')">🎯<span>Mis metas</span></button>
      <button onclick="abrir('Mi perfil')">👤<span>Mi perfil</span></button>
    </div>
  `;
}

function abrir(seccion) {
  const pantalla = document.getElementById("pantalla");

  pantalla.innerHTML = `
    <button class="back" onclick="inicio()">← Volver al inicio</button>
    <section class="welcome">
      <h2>${seccion}</h2>
      <p>Tu espacio personal de LIFE+ 💜</p>
    </section>
    <p class="coming">Aquí construiremos tus herramientas ✨</p>
  `;

  if (seccion === "Organización") {
    pantalla.innerHTML += `
      <input id="tarea" placeholder="Escribe una tarea">
      <button onclick="guardarTarea()">➕ Agregar tarea</button>
      <ul id="lista"></ul>
    `;
    mostrarTareas();
  }
}

function guardarTarea() {
  const input = document.getElementById("tarea");
  if (!input.value.trim()) return;

  const tareas = JSON.parse(localStorage.getItem("lifeTareas") || "[]");
  tareas.push(input.value.trim());
  localStorage.setItem("lifeTareas", JSON.stringify(tareas));

  input.value = "";
  mostrarTareas();
}

function mostrarTareas() {
  const lista = document.getElementById("lista");
  if (!lista) return;

  const tareas = JSON.parse(localStorage.getItem("lifeTareas") || "[]");
  lista.innerHTML = "";

  tareas.forEach((tarea, i) => {
    const li = document.createElement("li");
    li.textContent = tarea + " ";

    const eliminar = document.createElement("button");
    eliminar.textContent = "❌";
    eliminar.onclick = function() {
      const actualizadas = JSON.parse(localStorage.getItem("lifeTareas") || "[]");
      actualizadas.splice(i, 1);
      localStorage.setItem("lifeTareas", JSON.stringify(actualizadas));
      mostrarTareas();
    };

    li.appendChild(eliminar);
    lista.appendChild(li);
  });
}
