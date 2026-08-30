"use strict";


/* =====================================================
   AFRINOVA — SCRIPT PRINCIPAL
   Langues : FR / EN / ES / PT
===================================================== */


/* =====================================================
   MENU MOBILE
===================================================== */

const menuToggle =
    document.getElementById("menuToggle");

const mainNav =
    document.getElementById("mainNav");


if(menuToggle){

    menuToggle.addEventListener(
        "click",
        function(){

            mainNav.classList.toggle(
                "active"
            );

        }
    );

}


/* Fermer le menu après clic */

document.querySelectorAll(
    "#mainNav a"
).forEach(
    function(link){

        link.addEventListener(
            "click",
            function(){

                mainNav.classList.remove(
                    "active"
                );

            }
        );

    }
);


/* =====================================================
   LANGUES
===================================================== */

const languageButton =
    document.getElementById(
        "languageButton"
    );

const languageMenu =
    document.getElementById(
        "languageMenu"
    );


languageButton.addEventListener(
    "click",
    function(event){

        event.stopPropagation();

        languageMenu.classList.toggle(
            "active"
        );

    }
);


document.addEventListener(
    "click",
    function(){

        languageMenu.classList.remove(
            "active"
        );

    }
);


document.querySelectorAll(
    "#languageMenu button"
).forEach(
    function(button){

        button.addEventListener(
            "click",
            function(event){

                event.stopPropagation();

                const language =
                    button.dataset.lang;

                changeLanguage(
                    language
                );

                languageMenu.classList.remove(
                    "active"
                );

            }
        );

    }
);


/* =====================================================
   TRADUCTIONS
===================================================== */

const translations = {


/* =========================
   FRANÇAIS
========================= */

fr:{

    brandSub:
        "LABORATOIRE DE TRANSFORMATION DIGITALE",

    navHome:
        "Accueil",

    navLab:
        "Laboratoire",

    navAxes:
        "Domaines",

    navInitiatives:
        "Initiatives",

    navTeam:
        "Équipe",

    navNews:
        "Actualités",

    navContact:
        "Contact",

    heroEyebrow:
        "AFRIQUE · EUROPE · AMÉRIQUE DU NORD",

    heroTitle:
        "La science au service de la transformation digitale",

    heroText:
        "Laboratoire collaboratif international qui relie recherche, innovation et développement durable entre trois continents.",

    heroButton1:
        "Découvrir notre travail",

    heroButton2:
        "Parler à l'équipe",

    contextLabel:
        "LE CONTEXTE",

    contextTitle:
        "Le contexte qui nous a conduits ici",

    stat1:
        "Marché mondial du conseil en transformation digitale en 2026",

    stat2:
        "Taux de croissance annuel du marché en Afrique et au Moyen-Orient",

    stat3:
        "D'Africains ayant accès à Internet, révélant un important potentiel",

    stat4:
        "Continents connectés par notre réseau de recherche",

    labLabel:
        "NOTRE LABORATOIRE",

    labTitle:
        "Recherche appliquée. Technologie transférée. Impact réel.",

    labText1:
        "AFRINOVA est un laboratoire collaboratif international où la recherche appliquée et la mise en œuvre pratique coexistent.",

    labText2:
        "Nous ne sommes ni une consultance traditionnelle ni une organisation académique isolée. Nous créons un espace où les connaissances produites répondent aux besoins réels des organisations.",

    axesTitle:
        "Quatre axes. Un laboratoire.",

    axesIntro:
        "La recherche et la livraison pratique au service de la transformation digitale.",

    axis1Title:
        "Recherche appliquée",

    axis1Text:
        "Produire des connaissances orientées vers l'application et répondre à des problématiques réelles.",

    axis2Title:
        "Transfert de technologie",

    axis2Text:
        "Développer des solutions africaines en Afrique et adaptées aux problématiques Africaines capables de les mettre en œuvre, et inversement.",

    axis3Title:
        "Formation spécialisée",

    axis3Text:
        "Renforcer les capacités des équipes et institutions pour leur permettre d'opérer avec autonomie numérique.",

    axis4Title:
        "Incubation et accompagnement",

    axis4Text:
        "Soutenir les startups et initiatives présentant un potentiel d'impact sur les marchés où nous opérons.",

    initiativeLabel:
        "INITIATIVES",

    initiativeTitle:
        "Le travail que nous construisons",

    initiative1Title:
        "Transformation digitale des administrations publiques",

    initiative1Text:
        "Analyse et accompagnement de la modernisation digitale des institutions publiques, des services locaux à la gouvernance électronique nationale.",

    initiative2Title:
        "Économie digitale et fiscalité digitale",

    initiative2Text:
        "Étude des transformations économiques liées à la digitalisation et de leurs implications fiscales et réglementaires.",

    initiative3Title:
        "Gouvernance digitale et politiques publiques",

    initiative3Text:
        "Mécanismes de gouvernance digitale et intégration des technologies dans les politiques publiques, avec un accent sur les données et l'inclusion.",

    tagPublic:
        "Administration publique",

    teamLabel:
        "QUI SOMMES-NOUS ?",

    teamTitle:
        "Les personnes derrière le laboratoire",

    member1Role:
        "Fondateur & Directeur du Développement et de l'Innovation",

    member1Bio:
        "Fondateur du Laboratoire de Transformation Digitale AFRINOVA. Spécialiste en économie digitale, chaîne d'approvisionnement digitale et logistique.",

    member2Role:
        "Directeur de la Recherche Scientifique",

    member2Bio:
        "Professeur et consultant spécialisé dans l'optimisation et la gouvernance des processus métier, BPM, architecture d'entreprise et transformation digitale.",

    member3Role:
        "Directeur des Techniques et Applications",

    member3Bio:
        "Fullstack Developer, support informatique et designer digital. React.js, Next.js, Node.js et PostgreSQL.",

    locationLabel:
        "PRÉSENCE INTERNATIONALE",

    locationTitle:
        "Fondé à Lisbonne. Enraciné sur trois continents.",

    locationText:
        "AFRINOVA opère à l'intersection de l'Europe, de l'Afrique et de l'Amérique du Nord.",

    lisbon:
        "Siège principal · Hub européen",

    yaounde:
        "Délégation · Hub africain",

    quebec:
        "Délégation · Hub nord-américain",

    newsLabel:
        "ACTUALITÉS",

    newsTitle:
        "Publications AFRINOVA",

    emptyNews:
        "Les prochaines publications AFRINOVA apparaîtront ici.",

    contactTitle:
        "Faites partie du laboratoire",

    contactText:
        "Que vous soyez associé, partenaire institutionnel ou collaborateur, AFRINOVA dispose d'une manière de travailler avec vous.",

    addressLabel:
        "Siège",

    phoneLabel:
        "Téléphone",

    formTitle:
        "Entrer en contact",

    formText:
        "Remplissez le formulaire et notre équipe vous répondra dans les meilleurs délais.",

    selectMembership:
        "Type de demande",

    membership1:
        "Associé",

    membership2:
        "Associé honoraire",

    membership3:
        "Partenariat institutionnel",

    membership4:
        "Collaboration",

    sendMessage:
        "Envoyer le message",

    footerText:
        "Recherche appliquée. Technologie transférée. Impact réel.",

    footerLab:
        "Laboratoire",

    footerServices:
        "Services",

    footerOrganization:
        "Organisation",

    footerLegal:
        "Association sans but lucratif."

},


/* =========================
   ENGLISH
========================= */

en:{

    brandSub:
        "DIGITAL TRANSFORMATION LABORATORY",

    navHome:
        "Home",

    navLab:
        "Laboratory",

    navAxes:
        "Areas",

    navInitiatives:
        "Initiatives",

    navTeam:
        "Team",

    navNews:
        "News",

    navContact:
        "Contact",

    heroEyebrow:
        "AFRICA · EUROPE · NORTH AMERICA",

    heroTitle:
        "Science for digital transformation",

    heroText:
        "An international collaborative laboratory connecting research, innovation and sustainable development across three continents.",

    heroButton1:
        "Discover our work",

    heroButton2:
        "Talk to the team",

    contextLabel:
        "THE CONTEXT",

    contextTitle:
        "The context that brought us here",

    stat1:
        "Global digital transformation consulting market in 2026",

    stat2:
        "Annual market growth rate in Africa and the Middle East",

    stat3:
        "Africans with Internet access, highlighting a major opportunity",

    stat4:
        "Continents connected through our research network",

    labLabel:
        "OUR LABORATORY",

    labTitle:
        "Applied research. Technology transfer. Real impact.",

    labText1:
        "AFRINOVA is an international collaborative laboratory where applied research and practical delivery coexist.",

    labText2:
        "We are neither a traditional consultancy nor an isolated academic organization. We create a space where knowledge responds to real organizational needs.",

    axesTitle:
        "Four areas. One laboratory.",

    axesIntro:
        "Research and practical delivery serving digital transformation.",

    axis1Title:
        "Applied Research",

    axis1Text:
        "Producing knowledge designed for application and addressing real-world challenges.",

    axis2Title:
        "Technology Transfer",

    axis2Text:
        "Connecting solutions developed in Europe with African contexts able to deploy them, and vice versa.",

    axis3Title:
        "Specialized Training",

    axis3Text:
        "Building the capacity of teams and institutions to operate with digital autonomy.",

    axis4Title:
        "Incubation & Support",

    axis4Text:
        "Supporting startups and initiatives with potential for impact in the markets where we operate.",

    initiativeLabel:
        "INITIATIVES",

    initiativeTitle:
        "The work we are building",

    initiative1Title:
        "Digital transformation of public administrations",

    initiative1Text:
        "Analysis and support for the digital modernization of public institutions, from local services to national e-government.",

    initiative2Title:
        "Digital economy and digital taxation",

    initiative2Text:
        "Economic transformations driven by digitalization and their fiscal and regulatory implications.",

    initiative3Title:
        "Digital governance and public policy",

    initiative3Text:
        "Digital governance mechanisms and technology integration into public policies, with a focus on data and inclusion.",

    tagPublic:
        "Public administration",

    teamLabel:
        "WHO WE ARE",

    teamTitle:
        "The people behind the laboratory",

    member1Role:
        "Founder & Director of Development and Innovation",

    member1Bio:
        "Founder of the AFRINOVA Digital Transformation Laboratory. Specialist in digital economy, digital supply chain and logistics.",

    member2Role:
        "Director of Scientific Research",

    member2Bio:
        "Professor and consultant specializing in business process optimization and governance, BPM, enterprise architecture and digital transformation.",

    member3Role:
        "Director of Technology and Applications",

    member3Bio:
        "Fullstack Developer, IT support and digital designer. React.js, Next.js, Node.js and PostgreSQL.",

    locationLabel:
        "INTERNATIONAL PRESENCE",

    locationTitle:
        "Founded in Lisbon. Rooted across three continents.",

    locationText:
        "AFRINOVA operates at the intersection of Europe, Africa and North America.",

    lisbon:
        "Main headquarters · European hub",

    yaounde:
        "Branch · African hub",

    quebec:
        "Branch · North American hub",

    newsLabel:
        "NEWS",

    newsTitle:
        "AFRINOVA Publications",

    emptyNews:
        "Upcoming AFRINOVA publications will appear here.",

    contactTitle:
        "Join the laboratory",

    contactText:
        "Whether as an associate, institutional partner or collaborator, AFRINOVA has a way to work with you.",

    addressLabel:
        "Headquarters",

    phoneLabel:
        "Phone",

    formTitle:
        "Get in touch",

    formText:
        "Fill in the form and our team will respond as soon as possible.",

    selectMembership:
        "Request type",

    membership1:
        "Associate",

    membership2:
        "Honorary associate",

    membership3:
        "Institutional partnership",

    membership4:
        "Collaboration",

    sendMessage:
        "Send message",

    footerText:
        "Applied research. Technology transfer. Real impact.",

    footerLab:
        "Laboratory",

    footerServices:
        "Services",

    footerOrganization:
        "Organization",

    footerLegal:
        "Non-profit association."

},


/* =========================
   ESPAÑOL
========================= */

es:{

    brandSub:
        "LABORATORIO DE TRANSFORMACIÓN DIGITAL",

    navHome:
        "Inicio",

    navLab:
        "Laboratorio",

    navAxes:
        "Áreas",

    navInitiatives:
        "Iniciativas",

    navTeam:
        "Equipo",

    navNews:
        "Noticias",

    navContact:
        "Contacto",

    heroEyebrow:
        "ÁFRICA · EUROPA · AMÉRICA DEL NORTE",

    heroTitle:
        "La ciencia al servicio de la transformación digital",

    heroText:
        "Laboratorio colaborativo internacional que conecta investigación, innovación y desarrollo sostenible entre tres continentes.",

    heroButton1:
        "Descubrir nuestro trabajo",

    heroButton2:
        "Hablar con el equipo",

    contextLabel:
        "EL CONTEXTO",

    contextTitle:
        "El contexto que nos ha traído hasta aquí",

    stat1:
        "Mercado mundial de consultoría en transformación digital en 2026",

    stat2:
        "Tasa anual de crecimiento del mercado en África y Oriente Medio",

    stat3:
        "Africanos con acceso a Internet, mostrando una gran oportunidad",

    stat4:
        "Continentes conectados por nuestra red de investigación",

    labLabel:
        "NUESTRO LABORATORIO",

    labTitle:
        "Investigación aplicada. Tecnología transferida. Impacto real.",

    labText1:
        "AFRINOVA es un laboratorio colaborativo internacional donde conviven la investigación aplicada y la implementación práctica.",

    labText2:
        "No somos una consultoría tradicional ni una organización académica aislada. Creamos un espacio donde el conocimiento responde a las necesidades reales de las organizaciones.",

    axesTitle:
        "Cuatro áreas. Un laboratorio.",

    axesIntro:
        "Investigación y ejecución práctica al servicio de la transformación digital.",

    axis1Title:
        "Investigación aplicada",

    axis1Text:
        "Producimos conocimiento orientado a la aplicación y respondemos a problemas reales.",

    axis2Title:
        "Transferencia tecnológica",

    axis2Text:
        "Conectamos soluciones desarrolladas en Europa con contextos africanos capaces de implementarlas, y viceversa.",

    axis3Title:
        "Formación especializada",

    axis3Text:
        "Desarrollamos las capacidades de equipos e instituciones para operar con autonomía digital.",

    axis4Title:
        "Incubación y apoyo",

    axis4Text:
        "Apoyamos startups e iniciativas con potencial de impacto en los mercados donde operamos.",

    initiativeLabel:
        "INICIATIVAS",

    initiativeTitle:
        "El trabajo que estamos construyendo",

    initiative1Title:
        "Transformación digital de las administraciones públicas",

    initiative1Text:
        "Análisis y apoyo a la modernización digital de instituciones públicas, desde servicios locales hasta gobierno electrónico nacional.",

    initiative2Title:
        "Economía digital y fiscalidad digital",

    initiative2Text:
        "Transformaciones económicas impulsadas por la digitalización y sus implicaciones fiscales y regulatorias.",

    initiative3Title:
        "Gobernanza digital y políticas públicas",

    initiative3Text:
        "Mecanismos de gobernanza digital e integración de tecnologías en políticas públicas, con enfoque en datos e inclusión.",

    tagPublic:
        "Administración pública",

    teamLabel:
        "QUIÉNES SOMOS",

    teamTitle:
        "Las personas detrás del laboratorio",

    member1Role:
        "Fundador y Director de Desarrollo e Innovación",

    member1Bio:
        "Fundador del Laboratorio de Transformación Digital AFRINOVA. Especialista en economía digital, cadena de suministro digital y logística.",

    member2Role:
        "Director de Investigación Científica",

    member2Bio:
        "Profesor y consultor especializado en optimización y gobernanza de procesos empresariales, BPM, arquitectura empresarial y transformación digital.",

    member3Role:
        "Director de Técnicas y Aplicaciones",

    member3Bio:
        "Desarrollador Fullstack, soporte informático y diseñador digital. React.js, Next.js, Node.js y PostgreSQL.",

    locationLabel:
        "PRESENCIA INTERNACIONAL",

    locationTitle:
        "Fundado en Lisboa. Arraigado en tres continentes.",

    locationText:
        "AFRINOVA opera en la intersección de Europa, África y América del Norte.",

    lisbon:
        "Sede principal · Hub europeo",

    yaounde:
        "Delegación · Hub africano",

    quebec:
        "Delegación · Hub norteamericano",

    newsLabel:
        "NOTICIAS",

    newsTitle:
        "Publicaciones AFRINOVA",

    emptyNews:
        "Las próximas publicaciones de AFRINOVA aparecerán aquí.",

    contactTitle:
        "Forma parte del laboratorio",

    contactText:
        "Como asociado, socio institucional o colaborador, AFRINOVA tiene una forma de trabajar contigo.",

    addressLabel:
        "Sede",

    phoneLabel:
        "Teléfono",

    formTitle:
        "Contactar",

    formText:
        "Completa el formulario y nuestro equipo responderá lo antes posible.",

    selectMembership:
        "Tipo de solicitud",

    membership1:
        "Asociado",

    membership2:
        "Asociado honorario",

    membership3:
        "Alianza institucional",

    membership4:
        "Colaboración",

    sendMessage:
        "Enviar mensaje",

    footerText:
        "Investigación aplicada. Tecnología transferida. Impacto real.",

    footerLab:
        "Laboratorio",

    footerServices:
        "Servicios",

    footerOrganization:
        "Organización",

    footerLegal:
        "Asociación sin ánimo de lucro."

},


/* =========================
   PORTUGUÊS
========================= */

pt:{

    brandSub:
        "LABORATÓRIO DE TRANSFORMAÇÃO DIGITAL",

    navHome:
        "Início",

    navLab:
        "Laboratório",

    navAxes:
        "Áreas",

    navInitiatives:
        "Iniciativas",

    navTeam:
        "Equipa",

    navNews:
        "Notícias",

    navContact:
        "Contacto",

    heroEyebrow:
        "ÁFRICA · EUROPA · AMÉRICA DO NORTE",

    heroTitle:
        "Ciência para a transformação digital",

    heroText:
        "Laboratório colaborativo internacional que conecta investigação, inovação e desenvolvimento sustentável entre três continentes.",

    heroButton1:
        "Conheça o nosso trabalho",

    heroButton2:
        "Falar com a equipa",

    contextLabel:
        "O CONTEXTO",

    contextTitle:
        "O contexto que nos trouxe até aqui",

    stat1:
        "Mercado global de consultoria em transformação digital em 2026",

    stat2:
        "Taxa de crescimento anual do mercado em África e Médio Oriente",

    stat3:
        "Africanos com acesso à Internet, revelando uma grande oportunidade",

    stat4:
        "Continentes conectados pela nossa rede de investigação",

    labLabel:
        "O NOSSO LABORATÓRIO",

    labTitle:
        "Investigação aplicada. Tecnologia transferida. Impacto real.",

    labText1:
        "A AFRINOVA é um laboratório colaborativo internacional onde a investigação aplicada e a implementação prática coexistem.",

    labText2:
        "Não somos uma consultora tradicional nem uma organização académica isolada. Criamos um espaço onde o conhecimento responde às necessidades reais das organizações.",

    axesTitle:
        "Quatro eixos. Um laboratório.",

    axesIntro:
        "Investigação e execução prática ao serviço da transformação digital.",

    axis1Title:
        "Investigação Aplicada",

    axis1Text:
        "Produzimos conhecimento orientado para a aplicação e respondemos a problemas reais.",

    axis2Title:
        "Transferência de Tecnologia",

    axis2Text:
        "Ligamos soluções desenvolvidas na Europa a contextos africanos que as podem implementar, e vice-versa.",

    axis3Title:
        "Formação Especializada",

    axis3Text:
        "Capacitamos equipas e instituições para operarem com autonomia digital.",

    axis4Title:
        "Incubação e Suporte",

    axis4Text:
        "Apoiamos startups e iniciativas com potencial de impacto nos mercados onde operamos.",

    initiativeLabel:
        "INICIATIVAS",

    initiativeTitle:
        "O trabalho que estamos a construir",

    initiative1Title:
        "Transformação Digital das Administrações Públicas",

    initiative1Text:
        "Análise e apoio à modernização digital de instituições públicas — dos serviços locais à governação eletrónica nacional.",

    initiative2Title:
        "Economia Digital e Fiscalidade Digital",

    initiative2Text:
        "Transformações económicas impulsionadas pela digitalização e as suas implicações fiscais e regulamentares.",

    initiative3Title:
        "Governação Digital e Políticas Públicas",

    initiative3Text:
        "Mecanismos de governação digital e integração de tecnologias nas políticas públicas, com foco nos dados e na inclusão.",

    tagPublic:
        "Administração Pública",

    teamLabel:
        "QUEM SOMOS",

    teamTitle:
        "As pessoas por trás do laboratório",

    member1Role:
        "Fundador e Diretor de Desenvolvimento e Inovação",

    member1Bio:
        "Fundador do Laboratório de Transformação Digital AFRINOVA. Especialista em Economia Digital, Cadeia de Suprimentos Digital e Logística.",

    member2Role:
        "Diretor de Investigação Científica",

    member2Bio:
        "Professor e consultor especializado em otimização e governação de processos de negócio, BPM, arquitetura empresarial e transformação digital.",

    member3Role:
        "Diretor de Técnicas e Aplicações",

    member3Bio:
        "Fullstack Developer, suporte de TI e designer digital. React.js, Next.js, Node.js e PostgreSQL.",

    locationLabel:
        "PRESENÇA INTERNACIONAL",

    locationTitle:
        "Fundado em Lisboa. Enraizado em três continentes.",

    locationText:
        "A AFRINOVA opera no cruzamento entre a Europa, África e América do Norte.",

    lisbon:
        "Sede principal · Hub europeu",

    yaounde:
        "Delegação · Hub africano",

    quebec:
        "Delegação · Hub norte-americano",

    newsLabel:
        "NOTÍCIAS",

    newsTitle:
        "Publicações AFRINOVA",

    emptyNews:
        "As próximas publicações da AFRINOVA aparecerão aqui.",

    contactTitle:
        "Faça parte do laboratório",

    contactText:
        "Seja como associado, parceiro institucional ou colaborador, a AFRINOVA tem uma forma de trabalhar consigo.",

    addressLabel:
        "Sede",

    phoneLabel:
        "Telefone",

    formTitle:
        "Entrar em contacto",

    formText:
        "Preencha o formulário e a nossa equipa responderá assim que possível.",

    selectMembership:
        "Tipo de pedido",

    membership1:
        "Associado",

    membership2:
        "Associado Honorário",

    membership3:
        "Parceria Institucional",

    membership4:
        "Colaboração",

    sendMessage:
        "Enviar mensagem",

    footerText:
        "Investigação aplicada. Tecnologia transferida. Impacto real.",

    footerLab:
        "Laboratório",

    footerServices:
        "Serviços",

    footerOrganization:
        "Organização",

    footerLegal:
        "Associação sem fins lucrativos."

}

};


/* =====================================================
   CHANGER LANGUE
===================================================== */

function changeLanguage(
    language
){

    if(!translations[language]){
        return;
    }


    const dictionary =
        translations[language];


    document.querySelectorAll(
        "[data-i18n]"
    ).forEach(
        function(element){

            const key =
                element.dataset.i18n;

            if(
                dictionary[key] !== undefined
            ){

                element.textContent =
                    dictionary[key];

            }

        }
    );


    document.querySelectorAll(
        "[data-placeholder]"
    ).forEach(
        function(element){

            const key =
                element.dataset.placeholder;

            const placeholders = {

                fr:{
                    name:"Nom complet",
                    email:"Votre email",
                    organization:"Organisation / Institution",
                    message:"Votre message"
                },

                en:{
                    name:"Full name",
                    email:"Your email",
                    organization:"Organization / Institution",
                    message:"Your message"
                },

                es:{
                    name:"Nombre completo",
                    email:"Su correo electrónico",
                    organization:"Organización / Institución",
                    message:"Su mensaje"
                },

                pt:{
                    name:"Nome completo",
                    email:"O seu email",
                    organization:"Empresa / Instituição",
                    message:"A sua mensagem"
                }

            };


            if(
                placeholders[language] &&
                placeholders[language][key]
            ){

                element.placeholder =
                    placeholders[language][key];

            }

        }
    );


    const codes = {

        fr:"FR",
        en:"EN",
        es:"ES",
        pt:"PT"

    };


    languageButton.textContent =
        codes[language] + " ▾";


    document.documentElement.lang =
        language;


    localStorage.setItem(
        "afrinovaLanguage",
        language
    );


    loadPublications(
        language
    );

}


/* =====================================================
   PUBLICATIONS
===================================================== */

function getPublications(){

    try{

        const data =
            localStorage.getItem(
                "afrinovaPublications"
            );

        if(!data){
            return [];
        }

        const publications =
            JSON.parse(data);

        return Array.isArray(
            publications
        )
            ? publications
            : [];

    }catch(error){

        console.error(error);

        return [];

    }

}


/* =====================================================
   AFFICHER PUBLICATIONS
===================================================== */

function loadPublications(
    language
){

    const container =
        document.getElementById(
            "publicationsContainer"
        );

    const empty =
        document.getElementById(
            "emptyPublications"
        );


    if(!container){
        return;
    }


    const publications =
        getPublications();


    container.innerHTML =
        "";


    if(
        publications.length === 0
    ){

        empty.style.display =
            "block";

        return;

    }


    empty.style.display =
        "none";


    publications.forEach(
        function(post){

            const card =
                document.createElement(
                    "article"
                );

            card.className =
                "publication-card";


            const image =
                document.createElement(
                    "img"
                );

            image.className =
                "publication-image";

            image.src =
                post.image ||
                "plateforme.jpg";


            image.onerror =
                function(){

                    this.src =
                        "plateforme.jpg";

                };


            const body =
                document.createElement(
                    "div"
                );

            body.className =
                "publication-body";


            const author =
                document.createElement(
                    "div"
                );

            author.className =
                "publication-author";


            const authorImage =
                document.createElement(
                    "img"
                );

            authorImage.src =
                post.admin &&
                post.admin.photo
                    ? post.admin.photo
                    : "logo2.jpg";


            const authorInfo =
                document.createElement(
                    "div"
                );


            const authorName =
                document.createElement(
                    "strong"
                );

            authorName.textContent =
                post.admin &&
                post.admin.name
                    ? post.admin.name
                    : "AFRINOVA";


            const authorRole =
                document.createElement(
                    "span"
                );

            authorRole.textContent =
                post.admin &&
                post.admin.role
                    ? post.admin.role
                    : "Administration";


            authorInfo.appendChild(
                authorName
            );

            authorInfo.appendChild(
                authorRole
            );


            author.appendChild(
                authorImage
            );

            author.appendChild(
                authorInfo
            );


            const category =
                document.createElement(
                    "span"
                );

            category.className =
                "publication-category";

            category.textContent =
                post.category ||
                "Actualité";


            const heading =
                document.createElement(
                    "h3"
                );

            heading.textContent =
                post.title;


            const text =
                document.createElement(
                    "p"
                );

            text.textContent =
                post.content;


            const date =
                document.createElement(
                    "span"
                );

            date.className =
                "publication-date";

            date.textContent =
                formatDate(
                    post.date,
                    language
                );


            body.appendChild(
                author
            );

            body.appendChild(
                category
            );

            body.appendChild(
                heading
            );

            body.appendChild(
                text
            );

            body.appendChild(
                date
            );


            card.appendChild(
                image
            );

            card.appendChild(
                body
            );


            container.appendChild(
                card
            );

        }
    );

}


/* =====================================================
   DATE
===================================================== */

function formatDate(
    date,
    language
){

    if(!date){
        return "";
    }


    const locales = {

        fr:"fr-FR",
        en:"en-US",
        es:"es-ES",
        pt:"pt-PT"

    };


    try{

        return new Date(
            date
        ).toLocaleDateString(
            locales[language] ||
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


/* =====================================================
   FORMULAIRE CONTACT
===================================================== */

const contactForm =
    document.getElementById(
        "contactForm"
    );


if(contactForm){

    contactForm.addEventListener(
        "submit",
        function(event){

            event.preventDefault();


            const status =
                document.getElementById(
                    "formStatus"
                );


            status.textContent =
                "Votre message est prêt à être envoyé à AFRINOVA.";


            status.style.color =
                "#027A48";


            const name =
                document.getElementById(
                    "contactName"
                ).value.trim();

            const email =
                document.getElementById(
                    "contactEmail"
                ).value.trim();

            const organization =
                document.getElementById(
                    "contactOrganization"
                ).value.trim();

            const type =
                document.getElementById(
                    "contactType"
                ).value;

            const message =
                document.getElementById(
                    "contactMessage"
                ).value.trim();


            if(
                !name ||
                !email ||
                !type ||
                !message
            ){

                status.textContent =
                    "Veuillez remplir les champs obligatoires.";

                status.style.color =
                    "#B42318";

                return;

            }


            const mailBody =
                encodeURIComponent(

                    "Nom : " +
                    name +

                    "\nEmail : " +
                    email +

                    "\nOrganisation : " +
                    organization +

                    "\nType : " +
                    type +

                    "\n\nMessage :\n" +
                    message

                );


            window.location.href =
                "mailto:moisefomo2014@gmail.com" +
                "?subject=" +
                encodeURIComponent(
                    "Contact AFRINOVA"
                ) +
                "&body=" +
                mailBody;

        }
    );

}


/* =====================================================
   INITIALISATION
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function(){

        const savedLanguage =
            localStorage.getItem(
                "afrinovaLanguage"
            );


        const browserLanguage =
            (
                navigator.language ||
                ""
            ).toLowerCase();


        let language =
            "fr";


        if(savedLanguage &&
           translations[savedLanguage]){

            language =
                savedLanguage;

        }else if(
            browserLanguage.startsWith("pt")
        ){

            language =
                "pt";

        }else if(
            browserLanguage.startsWith("en")
        ){

            language =
                "en";

        }else if(
            browserLanguage.startsWith("es")
        ){

            language =
                "es";

        }


        changeLanguage(
            language
        );


        loadPublications(
            language
        );

    }
);