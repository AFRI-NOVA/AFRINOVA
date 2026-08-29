/* =====================================
   AFRINOVA - ADMINISTRATION
===================================== */


/* IDENTIFIANTS DE DÉMONSTRATION */

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "afrinova2026";


/* ================================
   CONNEXION
================================ */

function loginAdmin() {

  const username =
    document.getElementById("adminUsername").value.trim();

  const password =
    document.getElementById("adminPassword").value;


  if (
    username === ADMIN_USERNAME &&
    password === ADMIN_PASSWORD
  ) {

    sessionStorage.setItem(
      "afrinovaAdmin",
      "true"
    );

    showDashboard();

  } else {

    const error =
      document.getElementById("loginError");

    error.style.display = "block";

  }

}


/* ================================
   AFFICHER DASHBOARD
================================ */

function showDashboard() {

  document.getElementById("loginScreen").style.display =
    "none";

  document.getElementById("adminDashboard").style.display =
    "block";

  loadAdminPosts();

}


/* ================================
   DÉCONNEXION
================================ */

function logoutAdmin() {

  sessionStorage.removeItem(
    "afrinovaAdmin"
  );

  location.reload();

}


/* ================================
   VÉRIFICATION
================================ */

document.addEventListener(
  "DOMContentLoaded",
  function() {

    if (
      sessionStorage.getItem("afrinovaAdmin") === "true"
    ) {

      showDashboard();

    }

    const fileInput =
      document.getElementById("postImageFile");

    if (fileInput) {

      fileInput.addEventListener(
        "change",
        previewImage
      );

    }

  }
);


/* ================================
   PUBLICATIONS
================================ */

function getPosts() {

  try {

    const data =
      localStorage.getItem(
        "afrinovaPublications"
      );

    return data ? JSON.parse(data) : [];

  } catch (error) {

    return [];

  }

}


function savePosts(posts) {

  localStorage.setItem(
    "afrinovaPublications",
    JSON.stringify(posts)
  );

}


/* ================================
   APERÇU IMAGE
================================ */

function previewImage(event) {

  const file =
    event.target.files[0];

  const preview =
    document.getElementById("imagePreview");


  if (!file) {

    preview.style.display = "none";

    return;

  }


  const reader =
    new FileReader();


  reader.onload =
    function(e) {

      preview.src =
        e.target.result;

      preview.style.display =
        "block";

    };


  reader.readAsDataURL(file);

}


/* ================================
   CRÉER / MODIFIER
================================ */

function savePublication(event) {

  event.preventDefault();


  const title =
    document.getElementById("postTitle").value.trim();

  const category =
    document.getElementById("postCategory").value;

  const content =
    document.getElementById("postContent").value.trim();

  const editId =
    document.getElementById("editId").value;


  const file =
    document.getElementById("postImageFile").files[0];


  if (!title || !content) {

    alert(
      "Veuillez remplir le titre et le contenu."
    );

    return;

  }


  const posts =
    getPosts();


  /* MODIFICATION */

  if (editId) {

    const index =
      posts.findIndex(function(post) {

        return String(post.id) === String(editId);

      });


    if (index !== -1) {

      posts[index].title =
        title;

      posts[index].category =
        category;

      posts[index].content =
        content;


      if (file) {

        readImage(
          file,
          function(imageData) {

            posts[index].image =
              imageData;

            savePosts(posts);

            finishSave();

          }
        );

      } else {

        savePosts(posts);

        finishSave();

      }

    }

    return;

  }


  /* NOUVELLE PUBLICATION */

  const newPost = {

    id:
      Date.now(),

    title:
      title,

    category:
      category,

    content:
      content,

    image:
      "plateforme.jpg",

    date:
      new Date().toISOString()

  };


  if (file) {

    readImage(
      file,
      function(imageData) {

        newPost.image =
          imageData;

        posts.push(newPost);

        savePosts(posts);

        finishSave();

      }
    );

  } else {

    posts.push(newPost);

    savePosts(posts);

    finishSave();

  }

}


/* ================================
   LECTURE IMAGE
================================ */

function readImage(file, callback) {

  const reader =
    new FileReader();


  reader.onload =
    function(event) {

      callback(
        event.target.result
      );

    };


  reader.onerror =
    function() {

      alert(
        "Impossible de charger cette image."
      );

    };


  reader.readAsDataURL(file);

}


/* ================================
   APRÈS SAUVEGARDE
================================ */

function finishSave() {

  alert(
    "Publication enregistrée avec succès."
  );

  resetForm();

  loadAdminPosts();

}


/* ================================
   AFFICHER LES PUBLICATIONS
================================ */

function loadAdminPosts() {

  const container =
    document.getElementById("adminPosts");


  if (!container) {
    return;
  }


  const posts =
    getPosts();


  if (posts.length === 0) {

    container.innerHTML = `
      <div class="empty-admin">
        Aucune publication pour le moment.
      </div>
    `;

    return;

  }


  posts.sort(function(a, b) {

    return new Date(b.date) -
           new Date(a.date);

  });


  container.innerHTML = "";


  posts.forEach(function(post) {

    const article =
      document.createElement("div");

    article.className =
      "admin-post";


    article.innerHTML = `

      <img
        src="${post.image || "plateforme.jpg"}"
        alt=""
        onerror="this.src='plateforme.jpg'"
      >

      <div>

        <h3>
          ${escapeHTML(post.title)}
        </h3>

        <p>
          ${escapeHTML(post.category)}
          ·
          ${formatDate(post.date)}
        </p>

      </div>

      <div class="post-buttons">

        <button
          class="small-btn btn-secondary"
          onclick="editPublication('${post.id}')"
        >
          Modifier
        </button>

        <button
          class="small-btn btn-danger"
          onclick="deletePublication('${post.id}')"
        >
          Supprimer
        </button>

      </div>

    `;


    container.appendChild(article);

  });

}


/* ================================
   MODIFIER
================================ */

function editPublication(id) {

  const posts =
    getPosts();


  const post =
    posts.find(function(item) {

      return String(item.id) === String(id);

    });


  if (!post) {
    return;
  }


  document.getElementById("editId").value =
    post.id;

  document.getElementById("postTitle").value =
    post.title;

  document.getElementById("postCategory").value =
    post.category;

  document.getElementById("postContent").value =
    post.content;


  const preview =
    document.getElementById("imagePreview");


  if (post.image) {

    preview.src =
      post.image;

    preview.style.display =
      "block";

  }


  document.getElementById("formTitle").textContent =
    "Modifier la publication";


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* ================================
   SUPPRIMER
================================ */

function deletePublication(id) {

  const confirmation =
    confirm(
      "Voulez-vous vraiment supprimer cette publication ?"
    );


  if (!confirmation) {
    return;
  }


  let posts =
    getPosts();


  posts =
    posts.filter(function(post) {

      return String(post.id) !== String(id);

    });


  savePosts(posts);

  loadAdminPosts();

}


/* ================================
   RESET
================================ */

function resetForm() {

  const form =
    document.getElementById("publicationForm");


  if (form) {
    form.reset();
  }


  document.getElementById("editId").value =
    "";


  document.getElementById("formTitle").textContent =
    "Nouvelle publication";


  const preview =
    document.getElementById("imagePreview");


  preview.src = "";

  preview.style.display =
    "none";

}


/* ================================
   DATE
================================ */

function formatDate(date) {

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

    return "";

  }

}


/* ================================
   PROTECTION
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