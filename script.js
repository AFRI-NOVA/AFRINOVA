/* ================================
   AFRINOVA - SCRIPT PRINCIPAL
================================ */


/* MENU MOBILE */

function toggleMenu() {
  const nav = document.getElementById("mainNav");

  if (nav) {
    nav.classList.toggle("open");
  }
}


/* FERMER MENU APRÈS CLIC */

document.querySelectorAll(".nav a").forEach(function(link) {

  link.addEventListener("click", function() {

    const nav = document.getElementById("mainNav");

    if (nav) {
      nav.classList.remove("open");
    }

  });

});


/* ================================
   LANGUES
================================ */

function changeLanguage(language) {

  document.querySelectorAll("[data-fr]").forEach(function(element) {

    const translation = element.getAttribute("data-" + language);

    if (translation) {
      element.textContent = translation;
    }

  });

  document.querySelectorAll(".lang-btn").forEach(function(button) {
    button.classList.remove("active");
  });

  const activeButton = document.querySelector(
    ".lang-btn[onclick=\"changeLanguage('" + language + "')\"]"
  );

  if (activeButton) {
    activeButton.classList.add("active");
  }

  localStorage.setItem("afrinovaLanguage", language);
}


/* RESTAURER LANGUE */

document.addEventListener("DOMContentLoaded", function() {

  const savedLanguage =
    localStorage.getItem("afrinovaLanguage") || "fr";

  changeLanguage(savedLanguage);

  loadPublications();

});


/* ================================
   PUBLICATIONS
================================ */

function getPublications() {

  try {

    const data =
      localStorage.getItem("afrinovaPublications");

    if (!data) {
      return [];
    }

    return JSON.parse(data);

  } catch (error) {

    console.error("Erreur publications :", error);

    return [];

  }

}


/* SAUVEGARDE */

function savePublications(publications) {

  localStorage.setItem(
    "afrinovaPublications",
    JSON.stringify(publications)
  );

}


/* AFFICHAGE */

function loadPublications() {

  const container =
    document.getElementById("publicationsContainer");

  if (!container) {
    return;
  }

  const publications = getPublications();

  if (publications.length === 0) {

    container.innerHTML = `
      <div class="empty-news">
        <p>Aucune publication pour le moment.</p>
      </div>
    `;

    return;
  }


  const sorted = publications.sort(function(a, b) {

    return new Date(b.date) - new Date(a.date);

  });


  container.innerHTML = "";


  sorted.forEach(function(publication) {

    const card =
      document.createElement("article");

    card.className = "news-card";


    const image =
      publication.image ||
      "plateforme.jpg";


    const title =
      escapeHTML(publication.title);


    const category =
      escapeHTML(publication.category || "Actualité");


    const excerpt =
      escapeHTML(
        publication.content.substring(0, 150)
      );


    const date =
      formatDate(publication.date);


    card.innerHTML = `

      <img
        src="${image}"
        alt="${title}"
        class="news-image"
        onerror="this.src='plateforme.jpg'"
      >

      <div class="news-body">

        <span class="article-category">
          ${category}
        </span>

        <h3>
          ${title}
        </h3>

        <p>
          ${excerpt}${publication.content.length > 150 ? "..." : ""}
        </p>

        <div class="article-date">
          ${date}
        </div>

        <button
          class="read-more"
          onclick="openArticle('${publication.id}')"
        >
          Lire la publication →
        </button>

      </div>

    `;


    container.appendChild(card);

  });

}


/* ================================
   ARTICLE
================================ */

function openArticle(id) {

  const publications = getPublications();

  const publication =
    publications.find(function(item) {

      return String(item.id) === String(id);

    });


  if (!publication) {
    return;
  }


  document.getElementById("modalImage").src =
    publication.image || "plateforme.jpg";

  document.getElementById("modalCategory").textContent =
    publication.category || "Actualité";

  document.getElementById("modalTitle").textContent =
    publication.title;

  document.getElementById("modalDate").textContent =
    formatDate(publication.date);

  document.getElementById("modalText").textContent =
    publication.content;


  document
    .getElementById("articleModal")
    .classList.add("show");

  document.body.style.overflow = "hidden";
}


function closeArticle() {

  document
    .getElementById("articleModal")
    .classList.remove("show");

  document.body.style.overflow = "";

}


/* FERMER EN CLIQUANT À L'EXTÉRIEUR */

const modal =
  document.getElementById("articleModal");

if (modal) {

  modal.addEventListener("click", function(event) {

    if (event.target === modal) {
      closeArticle();
    }

  });

}


/* ================================
   DATE
================================ */

function formatDate(date) {

  if (!date) {
    return "";
  }

  try {

    return new Date(date).toLocaleDateString(
      "fr-FR",
      {
        day: "2-digit",
        month: "long",
        year: "numeric"
      }
    );

  } catch (error) {

    return date;

  }

}


/* ================================
   PROTECTION HTML
================================ */

function escapeHTML(text) {

  if (!text) {
    return "";
  }

  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}


/* ================================
   CONTACT
================================ */

function sendContact(event) {

  event.preventDefault();

  const name =
    document.getElementById("contactName").value;

  alert(
    "Merci " +
    name +
    ". Votre message est prêt à être envoyé."
  );

}


/* ================================
   RAFRAÎCHISSEMENT
================================ */

window.addEventListener("storage", function() {

  loadPublications();

});