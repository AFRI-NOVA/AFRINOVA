/* =====================================================
   AFRINOVA — ADMIN.JS
   ===================================================== */

"use strict";


/* =====================================================
   IDENTIFIANTS
   ===================================================== */

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "afrinova2026";

const STORAGE_KEY = "afrinovaPublications";


/* =====================================================
   ÉLÉMENTS
   ===================================================== */

let loginPage;
let dashboard;
let username;
let password;
let loginButton;
let logoutButton;

let publicationForm;
let editId;
let title;
let category;
let image;
let preview;
let content;
let postsList;

let formTitle;
let publishButton;
let cancelButton;

let loginMessage;
let publicationMessage;


/* =====================================================
   DÉMARRAGE
   ===================================================== */

document.addEventListener("DOMContentLoaded", function(){

    console.log("AFRINOVA ADMIN : JavaScript chargé.");

    loginPage =
        document.getElementById("loginPage");

    dashboard =
        document.getElementById("dashboard");

    username =
        document.getElementById("username");

    password =
        document.getElementById("password");

    loginButton =
        document.getElementById("loginButton");

    logoutButton =
        document.getElementById("logoutButton");

    publicationForm =
        document.getElementById("publicationForm");

    editId =
        document.getElementById("editId");

    title =
        document.getElementById("title");

    category =
        document.getElementById("category");

    image =
        document.getElementById("image");

    preview =
        document.getElementById("preview");

    content =
        document.getElementById("content");

    postsList =
        document.getElementById("postsList");

    formTitle =
        document.getElementById("formTitle");

    publishButton =
        document.getElementById("publishButton");

    cancelButton =
        document.getElementById("cancelButton");

    loginMessage =
        document.getElementById("loginMessage");

    publicationMessage =
        document.getElementById("publicationMessage");


    /* Bouton connexion */

    loginButton.addEventListener(
        "click",
        loginAdmin
    );


    /* Touche Entrée */

    password.addEventListener(
        "keydown",
        function(event){

            if(event.key === "Enter"){
                loginAdmin();
            }

        }
    );


    username.addEventListener(
        "keydown",
        function(event){

            if(event.key === "Enter"){
                loginAdmin();
            }

        }
    );


    /* Déconnexion */

    logoutButton.addEventListener(
        "click",
        logoutAdmin
    );


    /* Formulaire */

    publicationForm.addEventListener(
        "submit",
        savePublication
    );


    /* Annuler */

    cancelButton.addEventListener(
        "click",
        resetForm
    );


    /* Image */

    image.addEventListener(
        "change",
        previewImage
    );


    /* Vérifier connexion */

    if(
        sessionStorage.getItem(
            "afrinovaAdminConnected"
        ) === "true"
    ){

        showDashboard();

    }else{

        showLogin();

    }

});


/* =====================================================
   CONNEXION
   ===================================================== */

function loginAdmin(){

    const user =
        username.value.trim();

    const pass =
        password.value;


    if(
        user === ADMIN_USERNAME &&
        pass === ADMIN_PASSWORD
    ){

        sessionStorage.setItem(
            "afrinovaAdminConnected",
            "true"
        );

        hideLoginMessage();

        username.value = "";
        password.value = "";

        showDashboard();

    }else{

        showLoginMessage(
            "Identifiant ou mot de passe incorrect."
        );

        password.value = "";

        password.focus();

    }

}


/* =====================================================
   AFFICHER CONNEXION
   ===================================================== */

function showLogin(){

    loginPage.style.display = "flex";

    dashboard.style.display = "none";

}


/* =====================================================
   AFFICHER TABLEAU
   ===================================================== */

function showDashboard(){

    loginPage.style.display = "none";

    dashboard.style.display = "block";

    loadPosts();

}


/* =====================================================
   DÉCONNEXION
   ===================================================== */

function logoutAdmin(){

    sessionStorage.removeItem(
        "afrinovaAdminConnected"
    );

    showLogin();

}


/* =====================================================
   MESSAGE CONNEXION
   ===================================================== */

function showLoginMessage(message){

    loginMessage.textContent = message;

    loginMessage.style.display = "block";

}


function hideLoginMessage(){

    loginMessage.textContent = "";

    loginMessage.style.display = "none";

}


/* =====================================================
   MESSAGE PUBLICATION
   ===================================================== */

function showPublicationMessage(
    message,
    type
){

    publicationMessage.textContent =
        message;

    publicationMessage.className =
        "message " + type;

    publicationMessage.style.display =
        "block";

}


function hidePublicationMessage(){

    publicationMessage.textContent = "";

    publicationMessage.style.display =
        "none";

}


/* =====================================================
   RÉCUPÉRER LES PUBLICATIONS
   ===================================================== */

function getPosts(){

    try{

        const data =
            localStorage.getItem(
                STORAGE_KEY
            );

        if(!data){
            return [];
        }

        const posts =
            JSON.parse(data);

        if(!Array.isArray(posts)){
            return [];
        }

        return posts;

    }catch(error){

        console.error(error);

        return [];

    }

}


/* =====================================================
   SAUVEGARDER
   ===================================================== */

function savePosts(posts){

    try{

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(posts)
        );

        return true;

    }catch(error){

        console.error(error);

        alert(
            "Impossible d'enregistrer la publication. " +
            "L'image est peut-être trop lourde."
        );

        return false;

    }

}


/* =====================================================
   IMAGE
   ===================================================== */

function previewImage(){

    const file =
        image.files[0];

    if(!file){

        preview.style.display =
            "none";

        preview.src = "";

        return;

    }


    if(
        !file.type.startsWith("image/")
    ){

        alert(
            "Veuillez choisir une image."
        );

        image.value = "";

        return;

    }


    const reader =
        new FileReader();


    reader.onload =
        function(event){

            preview.src =
                event.target.result;

            preview.style.display =
                "block";

        };


    reader.readAsDataURL(file);

}


/* =====================================================
   ENREGISTRER PUBLICATION
   ===================================================== */

function savePublication(event){

    event.preventDefault();


    const postTitle =
        title.value.trim();

    const postCategory =
        category.value;

    const postContent =
        content.value.trim();

    const selectedFile =
        image.files[0];


    if(!postTitle){

        showPublicationMessage(
            "Veuillez entrer un titre.",
            "error"
        );

        title.focus();

        return;

    }


    if(!postContent){

        showPublicationMessage(
            "Veuillez écrire le contenu.",
            "error"
        );

        content.focus();

        return;

    }


    let posts =
        getPosts();


    /* MODIFICATION */

    if(editId.value){

        const index =
            posts.findIndex(
                function(post){

                    return String(post.id) ===
                        String(editId.value);

                }
            );


        if(index === -1){

            showPublicationMessage(
                "Publication introuvable.",
                "error"
            );

            return;

        }


        posts[index].title =
            postTitle;

        posts[index].category =
            postCategory;

        posts[index].content =
            postContent;

        posts[index].updated =
            new Date().toISOString();


        if(selectedFile){

            readImage(
                selectedFile,
                function(data){

                    posts[index].image =
                        data;

                    finishSave(
                        posts,
                        "Publication modifiée avec succès."
                    );

                }
            );

        }else{

            finishSave(
                posts,
                "Publication modifiée avec succès."
            );

        }


        return;

    }


    /* NOUVELLE PUBLICATION */

    const newPost = {

        id:Date.now(),

        title:postTitle,

        category:postCategory,

        content:postContent,

        image:"plateforme.jpg",

        date:new Date().toISOString()

    };


    if(selectedFile){

        readImage(
            selectedFile,
            function(data){

                newPost.image =
                    data;

                posts.unshift(
                    newPost
                );

                finishSave(
                    posts,
                    "Publication publiée avec succès."
                );

            }
        );

    }else{

        posts.unshift(
            newPost
        );

        finishSave(
            posts,
            "Publication publiée avec succès."
        );

    }

}


/* =====================================================
   LECTURE IMAGE
   ===================================================== */

function readImage(
    file,
    callback
){

    const maxSize =
        4 * 1024 * 1024;


    if(file.size > maxSize){

        showPublicationMessage(
            "Image trop lourde. Utilisez une image de moins de 4 MB.",
            "error"
        );

        return;

    }


    const reader =
        new FileReader();


    reader.onload =
        function(event){

            callback(
                event.target.result
            );

        };


    reader.onerror =
        function(){

            showPublicationMessage(
                "Impossible de lire l'image.",
                "error"
            );

        };


    reader.readAsDataURL(file);

}


/* =====================================================
   FIN SAUVEGARDE
   ===================================================== */

function finishSave(
    posts,
    message
){

    if(
        savePosts(posts)
    ){

        showPublicationMessage(
            message,
            "success"
        );

        resetForm();

        loadPosts();

    }

}


/* =====================================================
   AFFICHER PUBLICATIONS
   ===================================================== */

function loadPosts(){

    const posts =
        getPosts();


    postsList.innerHTML = "";


    if(posts.length === 0){

        postsList.innerHTML = `

            <div class="message success"
                 style="display:block">

                Aucune publication pour le moment.

            </div>

        `;

        return;

    }


    posts.forEach(
        function(post){

            const article =
                document.createElement("article");

            article.className =
                "post";


            const img =
                document.createElement("img");

            img.src =
                post.image ||
                "plateforme.jpg";

            img.onerror =
                function(){

                    this.src =
                        "plateforme.jpg";

                };


            const heading =
                document.createElement("h3");

            heading.textContent =
                post.title;


            const meta =
                document.createElement("div");

            meta.className =
                "post-meta";

            meta.textContent =
                (post.category || "Actualité")
                + " • "
                + formatDate(post.date);


            const text =
                document.createElement("div");

            text.className =
                "post-content";

            text.textContent =
                post.content;


            const actions =
                document.createElement("div");

            actions.className =
                "actions";


            const editButton =
                document.createElement("button");

            editButton.className =
                "secondary";

            editButton.textContent =
                "Modifier";

            editButton.type =
                "button";

            editButton.addEventListener(
                "click",
                function(){

                    editPublication(
                        post.id
                    );

                }
            );


            const deleteButton =
                document.createElement("button");

            deleteButton.className =
                "danger";

            deleteButton.textContent =
                "Supprimer";

            deleteButton.type =
                "button";

            deleteButton.addEventListener(
                "click",
                function(){

                    deletePublication(
                        post.id
                    );

                }
            );


            actions.appendChild(
                editButton
            );

            actions.appendChild(
                deleteButton
            );


            article.appendChild(img);

            article.appendChild(heading);

            article.appendChild(meta);

            article.appendChild(text);

            article.appendChild(actions);


            postsList.appendChild(
                article
            );

        }
    );

}


/* =====================================================
   MODIFIER
   ===================================================== */

function editPublication(id){

    const posts =
        getPosts();


    const post =
        posts.find(
            function(item){

                return String(item.id) ===
                    String(id);

            }
        );


    if(!post){

        alert(
            "Publication introuvable."
        );

        return;

    }


    editId.value =
        post.id;

    title.value =
        post.title;

    category.value =
        post.category ||
        "Actualité";

    content.value =
        post.content;


    if(post.image){

        preview.src =
            post.image;

        preview.style.display =
            "block";

    }


    formTitle.textContent =
        "Modifier la publication";

    publishButton.textContent =
        "Enregistrer les modifications";


    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}


/* =====================================================
   SUPPRIMER
   ===================================================== */

function deletePublication(id){

    const confirmation =
        confirm(
            "Voulez-vous vraiment supprimer cette publication ?"
        );


    if(!confirmation){

        return;

    }


    let posts =
        getPosts();


    posts =
        posts.filter(
            function(post){

                return String(post.id) !==
                    String(id);

            }
        );


    if(
        savePosts(posts)
    ){

        showPublicationMessage(
            "Publication supprimée.",
            "success"
        );

        loadPosts();

    }

}


/* =====================================================
   RESET
   ===================================================== */

function resetForm(){

    publicationForm.reset();

    editId.value = "";

    preview.src = "";

    preview.style.display =
        "none";

    formTitle.textContent =
        "Nouvelle publication";

    publishButton.textContent =
        "Publier";

}


/* =====================================================
   DATE
   ===================================================== */

function formatDate(date){

    try{

        return new Date(date)
            .toLocaleDateString(
                "fr-FR",
                {
                    day:"2-digit",
                    month:"long",
                    year:"numeric"
                }
            );

    }catch(error){

        return "";

    }

}