/* =====================================================================
   CONTENIDO DE LA WEB  (aquí editas textos, proyectos, enlaces, etc.)
   Todo lo bilingüe se escribe como { es: "...", en: "..." }.
   Los textos entre [corchetes] son placeholders pendientes de rellenar.
   ===================================================================== */

const SITE = {
  name: "Ángel Vilariño García",
  email: "angelvg333@gmail.com",
  phone: "684 647 952",
  phoneLink: "+34684647952",
  github: "https://github.com/angelvilarino",
  linkedin: "https://linkedin.com/in/%C3%A1ngel-vilari%C3%B1o-garc%C3%ADa-181594156",
  // CV descargable (cuando tengas el CV en inglés, cambia la ruta de "en")
  cv: { es: "assets/CV_ESP.pdf", en: "assets/CV_ENG.pdf" },
  photo: "assets/foto.jpg",
  // Fotos de "Vida personal": añade más objetos { src, alt } y aparecerán debajo
  lifePhotos: [
    { src: "assets/vida/roma.jpg", alt: { es: "Ángel frente al Coliseo de Roma", en: "Ángel in front of the Colosseum in Rome" } }
  ]
};

/* ---------- Textos de la interfaz ---------- */
const UI = {
  es: {
    nav_home: "Inicio", nav_about: "Sobre mí", nav_projects: "Proyectos",
    lang_switch: "English", theme_dark: "Modo oscuro", theme_light: "Modo claro",
    role: "Científico e Ingeniero de Datos",
    hero_desc: "Graduado en Ciencia e Ingeniería de Datos por la Universidad de A Coruña, con conocimientos de ingeniería de datos, estadística, machine learning, IA generativa y visualización.",
    cta_projects: "Ver proyectos", cta_cv: "Ver CV", cta_contact: "Contacto",
    toc: "En esta página",
    s_about: "Sobre mí", s_recog: "Reconocimientos", s_projects: "Proyectos",
    s_skills: "Habilidades", s_contact: "Contacto",
    s_experience: "Experiencia", s_education: "Formación",
    more_about: "Conocer más sobre mí", more_recog: "Ver toda mi trayectoria académica",
    all_projects: "Ver todos los proyectos",
    r_avg: "Nota media del grado", r_honors: "Matrículas de honor", r_tfg: "Nota del TFG",
    r_abau: "Reconocimiento a los mejores expedientes de Bachillerato (ABAU 2022)",
    // Sobre mí
    a_title: "Sobre mí", a_edu: "Formación académica", a_exp: "Experiencia profesional",
    a_excel: "Excelencia académica", a_cert: "Certificaciones",
    a_skills: "Habilidades y competencias", a_personal: "Vida personal",
    a_skills_intro: "Mi formación combina la ingeniería de datos (modelado, pipelines, almacenes de datos, plataformas cloud) con la ciencia de datos (estadística, aprendizaje automático, NLP, visión artificial y sistemas de recomendación). A continuación, un resumen por áreas, junto con las habilidades personales que me definen.",
    soft: "Habilidades personales", languages: "Idiomas",
    honors_btn: "Ver en qué asignaturas las obtuve", honors_hide: "Ocultar asignaturas",
    honors_note: "Matrículas de honor por asignatura",
    cert_view: "Ver certificado", cert_featured: "Destacada",
    avg_label: "Nota media", honors_label: "Matrículas", tfg_label: "TFG",
    // Proyectos
    p_title: "Proyectos",
    p_intro: "Una selección de trabajos académicos y personales. Pulsa en uno para ver todos los detalles.",
    p_back: "Volver a proyectos", p_overview: "Resumen", p_detail: "Descripción detallada",
    p_stack: "Tecnologías", p_results: "Resultados", p_gallery: "Galería", p_links: "Enlaces", p_metrics: "Cifras clave", p_pipeline: "Pipeline experimental",
    p_img: "Imagen del proyecto", p_notfound: "Este proyecto no existe.",
    l_demo: "Ver demo", l_memoria: "Memoria", l_repo: "Repositorio", l_web: "Web",
    // Contacto
    c_email: "Correo electrónico", c_phone: "Teléfono",
    c_github: "GitHub", c_linkedin: "LinkedIn", c_cv: "Descargar CV",
    hero_hint: "Mueve el cursor sobre los puntos y haz clic",
    filters: "Filtrar habilidades",
    f_all: "Todas", f_code: "Programación", f_ai: "IA y ciencia de datos", f_data: "Ingeniería de datos", f_viz: "Visualización y BI", f_work: "Herramientas y gestión",
    tile_place: "Desde", tile_where: "A Coruña, Galicia", tile_time: "Hora local",
    cert_open: "Ver los 12 cursos", cert_close: "Ocultar cursos",
    copy_email: "Copiar correo", copied: "¡Correo copiado!", copied_btn: "Copiado",
    back_top: "Volver arriba", foot_by: "Hecho a mano con HTML, CSS y JavaScript.",
    foot_role: "Científico e Ingeniero de Datos en A Coruña.", foot_nav: "Navegación", foot_links: "Enlaces",
    close: "Cerrar", open_img: "Ampliar foto",
    footer: "© 2026 Ángel Vilariño García"
  },
  en: {
    nav_home: "Home", nav_about: "About me", nav_projects: "Projects",
    lang_switch: "Español", theme_dark: "Dark mode", theme_light: "Light mode",
    role: "Data Scientist & Data Engineer",
    hero_desc: "Graduate in Data Science and Engineering from the University of A Coruña, with knowledge of data engineering, statistics, machine learning, generative AI and visualization.",
    cta_projects: "View projects", cta_cv: "View CV", cta_contact: "Contact",
    toc: "On this page",
    s_about: "About me", s_recog: "Achievements", s_projects: "Projects",
    s_skills: "Skills", s_contact: "Contact",
    s_experience: "Experience", s_education: "Education",
    more_about: "Learn more about me", more_recog: "See my full academic record",
    all_projects: "View all projects",
    r_avg: "Final degree GPA (out of 10)", r_honors: "Honors distinctions", r_tfg: "Thesis grade",
    r_abau: "Recognition for the best high-school academic records (ABAU 2022)",
    a_title: "About me", a_edu: "Education", a_exp: "Professional experience",
    a_excel: "Academic excellence", a_cert: "Certifications",
    a_skills: "Skills & competencies", a_personal: "Personal life",
    a_skills_intro: "My background blends data engineering (modelling, pipelines, data warehouses, cloud platforms) with data science (statistics, machine learning, NLP, computer vision and recommender systems). Below is a summary by area, along with the personal skills that define me.",
    soft: "Soft skills", languages: "Languages",
    honors_btn: "See which courses they were earned in", honors_hide: "Hide courses",
    honors_note: "Honors distinctions by course",
    cert_view: "View certificate", cert_featured: "Featured",
    avg_label: "Final GPA", honors_label: "Honors", tfg_label: "Thesis",
    p_title: "Projects",
    p_intro: "A selection of academic and personal work. Click on one to see all the details.",
    p_back: "Back to projects", p_overview: "Overview", p_detail: "Detailed description",
    p_stack: "Tech stack", p_results: "Results", p_gallery: "Gallery", p_links: "Links", p_metrics: "Key figures", p_pipeline: "Experimental pipeline",
    p_img: "Project image", p_notfound: "This project does not exist.",
    l_demo: "Live demo", l_memoria: "Thesis report", l_repo: "Repository", l_web: "Website",
    c_email: "Email", c_phone: "Phone",
    c_github: "GitHub", c_linkedin: "LinkedIn", c_cv: "Download CV",
    hero_hint: "Move your cursor over the dots and click",
    filters: "Filter skills",
    f_all: "All", f_code: "Programming", f_ai: "AI & data science", f_data: "Data engineering", f_viz: "Visualization & BI", f_work: "Tools & management",
    tile_place: "Based in", tile_where: "A Coruña, Galicia", tile_time: "Local time",
    cert_open: "See all 12 courses", cert_close: "Hide courses",
    copy_email: "Copy email", copied: "Email copied!", copied_btn: "Copied",
    back_top: "Back to top", foot_by: "Handmade with HTML, CSS and JavaScript.",
    foot_role: "Data Scientist & Data Engineer in A Coruña.", foot_nav: "Navigation", foot_links: "Links",
    close: "Close", open_img: "Enlarge photo",
    footer: "© 2026 Ángel Vilariño García"
  }
};

/* ---------- Sobre mí ---------- */
const ABOUT = {
  short: {
    es: "Graduado en <strong>Ciencia e Ingeniería de Datos</strong> con una sólida base en <strong>modelado predictivo</strong>, <strong>aprendizaje automático</strong>, <strong>estadística</strong> e <strong>ingeniería de datos</strong>. Sigo de cerca los avances en <strong>inteligencia artificial</strong> y me interesan las nuevas tecnologías, modelos y herramientas que están transformando el sector.",
    en: "Graduate in <strong>Data Science and Engineering</strong> with a solid foundation in <strong>predictive modelling</strong>, <strong>machine learning</strong>, <strong>statistics</strong> and <strong>data engineering</strong>. I closely follow advances in <strong>artificial intelligence</strong> and I'm keen on the new technologies, models and tools that are transforming the field."
  },
  long: {
    es: [
      "Soy graduado en <strong>Ciencia e Ingeniería de Datos</strong> por la <strong>Universidad de A Coruña</strong>, con una formación que une la parte más técnica de la ingeniería de datos (bases de datos, almacenes de datos, procesamiento distribuido y plataformas cloud) con la ciencia de datos: estadística avanzada, aprendizaje automático, series temporales, NLP, visión por computador y sistemas de recomendación.",
      "He realizado prácticas en el departamento de <strong>AI &amp; Data de Deloitte</strong>, donde trabajé con <strong>Snowflake, dbt y Palantir</strong> en proyectos de ingeniería de datos en un entorno profesional real, colaborando con equipos multidisciplinares. Mi <strong>Trabajo de Fin de Grado</strong>, calificado con un <strong>9</strong>, aplicó aprendizaje automático a la detección temprana del trastorno del espectro autista.",
      "Próximamente cursaré el <strong>Máster en Análisis y Visualización de Datos Masivos (Big Data)</strong> en <strong>UNIR</strong>. Me define la curiosidad, la agilidad de aprendizaje y las ganas de seguir creciendo en un sector que no deja de evolucionar."
    ],
    en: [
      "I hold a degree in <strong>Data Science and Engineering</strong> from the <strong>University of A Coruña</strong>, with training that combines the technical side of data engineering (databases, data warehouses, distributed processing and cloud platforms) with data science: advanced statistics, machine learning, time series, NLP, computer vision and recommender systems.",
      "I completed an internship in the <strong>AI &amp; Data department at Deloitte</strong>, working with <strong>Snowflake, dbt and Palantir</strong> on data engineering projects in a real professional environment, collaborating with multidisciplinary teams. My <strong>Bachelor's thesis</strong>, graded <strong>9</strong>, applied machine learning to the early detection of autism spectrum disorder.",
      "I will soon start the <strong>Master's in Big Data Analysis and Visualization</strong> at <strong>UNIR</strong>. Curiosity, fast learning and the drive to keep growing in a constantly evolving field define me."
    ]
  }
};

const EXPERIENCE = [
  {
    org: "Deloitte", url: "https://www.deloitte.com/es/es.html",
    role: { es: "Prácticas curriculares en el departamento de AI & Data", en: "Curricular internship in the AI & Data department" },
    short: { es: "Prácticas en AI & Data", en: "Internship in AI & Data" },
    dates: "Sep 2025 – Nov 2025",
    place: "A Coruña",
    bullets: {
      es: [
        "Formación y trabajo con herramientas de ingeniería de datos: Snowflake, dbt y Palantir.",
        "Participación en proyectos de ingeniería de datos en un entorno profesional real, colaborando con equipos multidisciplinares en iniciativas de transformación digital.",
        "Modelado y orquestación ELT con dbt (tests de calidad, linaje y snapshots SCD2) y gestión del almacén de datos en Snowflake (stages, streams y tasks).",
        "Documentación técnica de procesos y resultados de proyectos de datos."
      ],
      en: [
        "Training and hands-on work with data engineering tools: Snowflake, dbt and Palantir.",
        "Took part in data engineering projects in a real professional environment, collaborating with multidisciplinary teams on digital transformation initiatives.",
        "ELT modelling and orchestration with dbt (quality tests, lineage and SCD2 snapshots) and data warehouse management in Snowflake (stages, streams and tasks).",
        "Technical documentation of processes and results of data projects."
      ]
    }
  }
];

const EDUCATION = [
  {
    org: "UNIR", orgFull: "UNIR, Universidad Internacional de La Rioja", url: "https://www.unir.net",
    title: { es: "Máster en Análisis y Visualización de Datos Masivos (Big Data)", en: "Master's in Big Data Analysis and Visualization" },
    dates: "Nov 2026 – Jul 2027",
    place: { es: "Online", en: "Online" },
    detail: { es: "Hadoop, Spark, Kafka, Docker/Kubernetes, NoSQL, D3.js, Tableau, Power BI", en: "Hadoop, Spark, Kafka, Docker/Kubernetes, NoSQL, D3.js, Tableau, Power BI" },
    upcoming: { es: "Próximamente", en: "Upcoming" }
  },
  {
    org: { es: "Universidad de A Coruña", en: "University of A Coruña" }, url: "https://www.udc.es",
    title: { es: "Grado en Ciencia e Ingeniería de Datos", en: "Bachelor's in Data Science and Engineering" },
    dates: "Sep 2022 – Jun 2026",
    place: "A Coruña",
    detail: { es: "Nota media final de 8,7, 12 matrículas de honor y TFG con un 9.", en: "Final GPA of 8.7, 12 honors distinctions and a thesis graded 9." }
  },
  {
    org: "Calasanz PP Escolapios", url: "https://www.escolapiosacoruna.com/es/",
    title: { es: "Bachillerato Científico", en: "Science Baccalaureate" },
    dates: "Sep 2020 – Jun 2022",
    place: "A Coruña",
    detail: { es: "Reconocimiento a los mejores expedientes (ABAU 2022).", en: "Recognition for the best academic records (ABAU 2022)." }
  },
  {
    org: "Code Monsters", url: "https://www.codemonsters.es",
    title: { es: "Curso de Python", en: "Python course" },
    dates: "100 h", place: "",
    detail: null
  },
  {
    org: "Centro de Formación Easy System", url: "https://www.easysystem.es",
    title: { es: "Curso de Java", en: "Java course" },
    dates: "100 h", place: "",
    detail: null
  }
];

const RECOGNITIONS = {
  avg: { es: "8,7", en: "8.7" },
  honors: "12",
  tfg: "9"
};

/* Matrículas de honor (has indicado 11 asignaturas; falta 1 por añadir) */
const HONORS_COURSES = [
  { es: "Métodos Numéricos para Ciencia de Datos", en: "Numerical Methods for Data Science" },
  { es: "Gestión de Datos en Escenarios Inteligentes", en: "Data Management in Smart Scenarios" },
  { es: "Cálculo Multivariable", en: "Multivariable Calculus" },
  { es: "Modelos de Regresión", en: "Regression Models" },
  { es: "Señales y Sistemas", en: "Signals and Systems" },
  { es: "Protección, Privacidad y Seguridad de Datos", en: "Data Protection, Privacy and Security" },
  { es: "Teoría de la Información", en: "Information Theory" },
  { es: "Aprendizaje Automático I", en: "Machine Learning I" },
  { es: "Gestión de Proyectos de Ingeniería de Datos", en: "Data Engineering Project Management" },
  { es: "Procesamiento de Lenguaje Escrito", en: "Written Language Processing" },
  { es: "Tecnologías de Integración", en: "Integration Technologies" },
  { es: "Prácticas universitarias", en: "University internship" }
];

/* Certificaciones por grupos. featured: true -> tarjeta destacada.
   logo: ruta de imagen · file: PDF del certificado (opcional) */
const CERT_GROUPS = [
  {
    title: { es: "Idiomas", en: "Languages" },
    items: [
      { title: { es: "Inglés, nivel C1", en: "English, C1 level" },
        meta: { es: "Marco Común Europeo de Referencia (MCER)", en: "Common European Framework (CEFR)" },
        logo: "assets/logos/c1.svg" }
    ]
  },
  {
    title: { es: "Datos y análisis", en: "Data & analytics" },
    items: [
      { title: { es: "Excel: de intermedio a avanzado", en: "Excel: intermediate to advanced" },
        meta: { es: "Santander Open Academy. 8 horas y 2 módulos. Finalizado el 2 de octubre de 2026.", en: "Santander Open Academy. 8 hours, 2 modules. Completed on 2 October 2026." },
        logo: "assets/logos/excel.svg", file: "assets/certs/Excel-Intermedio-Avanzado.pdf" },
      { title: { es: "Power BI Intermedio: análisis y modelado de datos", en: "Power BI Intermediate: data analysis and modelling" },
        meta: { es: "Santander Open Academy. 8 horas y 2 módulos. Finalizado el 5 de octubre de 2026.", en: "Santander Open Academy. 8 hours, 2 modules. Completed on 5 October 2026." },
        logo: "assets/logos/powerbi.svg", file: "assets/certs/PowerBI_Intermedio.pdf" }
    ]
  },
  {
    title: { es: "Inteligencia artificial con Claude (Anthropic Academy)", en: "AI with Claude (Anthropic Academy)" },
    collapsible: true,
    summary: { es: "12 cursos completados entre septiembre y octubre de 2026", en: "12 courses completed between September and October 2026" },
    items: [
      { title: "Building with the Claude API", featured: true,
        meta: { es: "Construcción de aplicaciones sobre la API de Claude.", en: "Building applications on top of the Claude API." } },
      { title: "AI Fluency: Framework & Foundations" },
      { title: "Claude 101" },
      { title: "Claude Code 101" },
      { title: "Claude Code in Action" },
      { title: "Claude Platform 101" },
      { title: "Introduction to Claude Cowork" },
      { title: "Introduction to MCP" },
      { title: { es: "MCP: Temas avanzados", en: "MCP: Advanced Topics" } },
      { title: "Introduction to subagents" },
      { title: "Introduction to agent skills" },
      { title: { es: "El manual del SDLC nativo de IA", en: "The AI-native SDLC Handbook" } }
    ],
    logo: "assets/logos/claude.svg"
  }
];

/* ---------- Habilidades ----------
   i: nombre del archivo en assets/logos/ (sin .svg) · null -> sin logo.
   Para cambiar un logo, sustituye el SVG de esa carpeta por el oficial. */
const SKILLS = [
  {
    cat: "code",
    title: { es: "Lenguajes de programación", en: "Programming languages" },
    items: [
      { n: "Python", i: "python" }, { n: "SQL", i: "sql" }, { n: "R", i: "r" },
      { n: "Java", i: "java" }, { n: "MATLAB", i: "matlab" }, { n: "Bash", i: "bash" }
    ]
  },
  {
    cat: "ai",
    title: { es: "Ciencia y análisis de datos", en: "Data science & analysis" },
    items: [
      { n: "Pandas", i: "pandas" }, { n: "NumPy", i: "numpy" }, { n: "SciPy", i: "scipy" },
      { n: "EDA", i: null },
      { n: { es: "Estadística avanzada", en: "Advanced statistics" }, i: null }
    ]
  },
  {
    cat: "ai",
    title: { es: "Machine Learning e IA", en: "Machine Learning & AI" },
    items: [
      { n: "Scikit-learn", i: "scikitlearn" }, { n: "TensorFlow", i: "tensorflow" },
      { n: "Keras", i: "keras" }, { n: "PyTorch", i: "pytorch" },
      { n: "Hugging Face", i: "huggingface" }, { n: "XGBoost / LightGBM", i: null },
      { n: { es: "NLP y minería de textos", en: "NLP & text mining" }, i: null },
      { n: { es: "Visión por computador", en: "Computer vision" }, i: "opencv" },
      { n: { es: "Aprendizaje federado", en: "Federated learning" }, i: null },
      { n: { es: "Series temporales", en: "Time series" }, i: null },
      { n: { es: "Sistemas recomendadores", en: "Recommender systems" }, i: null }
    ]
  },
  {
    cat: "ai",
    title: { es: "IA generativa", en: "Generative AI" },
    items: [
      { n: "Claude", i: "claude" }, { n: "ChatGPT", i: "openai" }, { n: "Gemini", i: "googlegemini" },
      { n: "Copilot", i: "githubcopilot" }, { n: "LLMs", i: null },
      { n: { es: "Agentes de IA", en: "AI agents" }, i: null },
      { n: "Skills", i: null }, { n: "MCP", i: "mcp" },
      { n: "Prompt engineering", i: null }
    ]
  },
  {
    cat: "data",
    title: { es: "Ingeniería de datos y cloud", en: "Data engineering & cloud" },
    items: [
      { n: "Snowflake", i: "snowflake" }, { n: "dbt", i: "dbt" }, { n: "Palantir Foundry", i: "palantir" },
      { n: "Apache Spark", i: "spark" }, { n: "Hadoop", i: "hadoop" },
      { n: "Talend", i: "talend" }, { n: "Denodo", i: "denodo" },
      { n: "AWS", i: "aws" }, { n: "Azure", i: "azure" },
      { n: "Docker", i: "docker" }
    ]
  },
  {
    cat: "data",
    title: { es: "Bases de datos", en: "Databases" },
    items: [
      { n: "PostgreSQL / PostGIS", i: "postgresql" }, { n: "Oracle", i: "oracle" },
      { n: "MongoDB", i: "mongodb" }, { n: "SQLite", i: "sqlite" }, { n: "Apache Jena", i: null }
    ]
  },
  {
    cat: "viz",
    title: { es: "Visualización, BI y mapas", en: "Visualization, BI & maps" },
    items: [
      { n: "Tableau", i: "tableau" }, { n: "Power BI", i: "powerbi" },
      { n: "Matplotlib / Seaborn", i: "matplotlib" }, { n: "Streamlit", i: "streamlit" },
      { n: "QGIS", i: "qgis" }, { n: "Leaflet", i: "leaflet" }
    ]
  },
  {
    cat: "work",
    title: { es: "Desarrollo y herramientas", en: "Development & tools" },
    items: [
      { n: "FastAPI", i: "fastapi" }, { n: "Flask", i: "flask" }, { n: "Postman", i: "postman" },
      { n: "Git", i: "git" }, { n: "GitHub", i: "github" }, { n: "VirtualBox", i: "virtualbox" }
    ]
  },
  {
    cat: "work",
    title: { es: "Microsoft 365", en: "Microsoft 365" },
    items: [
      { n: "Excel", i: "excel" }, { n: "Word", i: "word" }, { n: "PowerPoint", i: "powerpoint" },
      { n: "Outlook", i: "outlook" }, { n: "Teams", i: "teams" }
    ]
  },
  {
    cat: "work",
    title: { es: "Metodologías ágiles y gestión", en: "Agile methodologies & management" },
    items: [
      { n: "Agile", i: null }, { n: "Scrum", i: null }, { n: "Kanban", i: null },
      { n: { es: "Gestión de backlog y sprints", en: "Backlog & sprint management" }, i: null },
      { n: "Jira", i: "jira" }
    ]
  }
];

const LANGUAGES = [
  { n: { es: "Español / Gallego", en: "Spanish / Galician" }, level: { es: "Nativo", en: "Native" }, pct: 100 },
  { n: { es: "Inglés", en: "English" }, level: "C1", pct: 85 }
];

const SOFT_SKILLS = {
  es: ["Trabajo en equipo", "Comunicación", "Proactividad", "Agilidad de aprendizaje", "Adaptabilidad", "Resolución de problemas", "Creatividad", "Curiosidad", "Actitud positiva"],
  en: ["Teamwork", "Communication", "Proactivity", "Fast learning", "Adaptability", "Problem solving", "Creativity", "Curiosity", "Positive attitude"]
};

const PERSONAL_INTRO = {
  es: "Fuera de la pantalla soy una persona curiosa y sociable. Me muevo entre el deporte, la música y el cine, y lo que más disfruto es compartir tiempo, ideas y aprendizajes con la gente que tengo cerca.",
  en: "Away from the screen I'm a curious and sociable person. I move between sport, music and film, and what I enjoy most is sharing time, ideas and lessons with the people around me."
};

const INTERESTS = [
  { title: { es: "Deporte", en: "Sport" },
    text: { es: "El deporte siempre ha estado presente en mi vida: he jugado al fútbol, al baloncesto y al fútbol sala, y he practicado atletismo. Hoy sigo yendo al gimnasio con regularidad, porque me aporta constancia, disciplina y energía para el resto del día.",
            en: "Sport has always been part of my life: I've played football, basketball and futsal, and I've done athletics. Today I still go to the gym regularly, because it gives me consistency, discipline and energy for the rest of the day." } },
  { title: { es: "Música y cine", en: "Music and film" },
    text: { es: "Estudié solfeo y toqué la guitarra durante cinco años, y la música sigue acompañándome a diario. También me encanta el cine: una buena película es una forma estupenda de desconectar y de descubrir otras historias y puntos de vista.",
            en: "I studied music theory and played the guitar for five years, and music still keeps me company every day. I also love film: a good movie is a great way to switch off and discover other stories and points of view." } },
  { title: { es: "Amigos y aprendizaje", en: "Friends and learning" },
    text: { es: "Me gusta quedar con mis amigos, charlar, compartir ideas y aprender de ellos. Creo que muchas de las mejores ideas nacen de una buena conversación, y que se aprende más cuando se aprende en compañía.",
            en: "I like meeting up with my friends, chatting, sharing ideas and learning from them. I believe many of the best ideas come from a good conversation, and that you learn more when you learn together." } },
  { title: { es: "Viajes", en: "Travel" },
    text: { es: "Me apasiona conocer otros países y culturas. Viajar me abre la mente, me saca de la rutina y me enseña a ver las cosas desde perspectivas muy distintas a la mía.",
            en: "I'm passionate about discovering other countries and cultures. Travelling opens my mind, takes me out of my routine and teaches me to see things from perspectives very different from my own." } }
];

/* ---------- Proyectos (PLACEHOLDERS: rellenar más adelante) ----------
   image: ruta de la imagen (p. ej. "assets/proyecto1.jpg") o null
   links: url real -> botón activo · "#" -> botón "pendiente" · null -> no se muestra */
const PROJECTS = [
  {
    id: "tfg",
    date: { es: "Octubre 2025 – Julio 2026", en: "October 2025 – July 2026" },
    title: {
      es: "TFG: Aprendizaje automático para la detección temprana del TEA",
      en: "Thesis: Machine learning for early detection of ASD"
    },
    short: {
      es: "Un sistema de inteligencia artificial que ayuda a detectar el autismo (TEA) de forma temprana a partir de cuestionarios clínicos. Con solo 20 de las 216 variables recogidas, clasifica bien a casi 9 de cada 10 personas.",
      en: "An artificial intelligence system that helps detect autism (ASD) early from clinical questionnaires. Using only 20 of the 216 variables collected, it classifies almost 9 out of 10 people correctly."
    },
    by: { es: "Dirigido por Verónica Bolón Canedo y Brais Cancela Barizo · Universidade da Coruña", en: "Supervised by Verónica Bolón Canedo and Brais Cancela Barizo · University of A Coruña" },
    image: { es: "assets/proyectos/tfg/pipeline.jpg", en: "assets/proyectos/tfg/pipeline-en.jpg" },
    fit: "contain",
    links: { demo: null, memoria: { es: "assets/TFG_memoria.pdf", en: "assets/TFG_memoria.pdf" }, repo: "https://github.com/angelvilarino/TFG", web: null },
    blocks: [
      { type: "h", t: { es: "Introducción", en: "Introduction" } },
      { type: "p", t: {
        es: "Mi Trabajo de Fin de Grado es un <strong>sistema de cribado del Trastorno del Espectro Autista (TEA)</strong> basado en aprendizaje automático, es decir, programas que aprenden patrones a partir de ejemplos. No busca sustituir al profesional, sino ayudarle a decidir <strong>a qué personas conviene hacer una evaluación en profundidad</strong>, de forma más rápida y con menos cuestionarios.",
        en: "My Bachelor's thesis is a <strong>screening system for Autism Spectrum Disorder (ASD)</strong> based on machine learning, that is, programs that learn patterns from examples. It does not aim to replace the professional, but to help decide <strong>which people should get an in-depth assessment</strong>, faster and with fewer questionnaires." } },
      { type: "p", t: {
        es: "Dirigido por dos investigadores del grupo <strong>LIDIA</strong> (inteligencia artificial) del <strong>CITIC</strong>, con datos clínicos reales cedidos por una investigadora del TEA:",
        en: "Supervised by two researchers from the <strong>LIDIA</strong> group (artificial intelligence) at <strong>CITIC</strong>, with real clinical data provided by an ASD researcher:" } },
      { type: "people", items: [
        { name: "Verónica Bolón Canedo", url: "https://www.veronicabolon.com",
          role: { es: "Profesora Titular · Universidade da Coruña", en: "Associate Professor · University of A Coruña" },
          bio: { es: "Experta en aprendizaje automático y <strong>selección de características</strong>, la técnica central de este TFG. Premio Nacional de Investigación para Jóvenes María Andresa Casamayor en Matemáticas y TIC.",
                 en: "Expert in machine learning and <strong>feature selection</strong>, the core technique of this thesis. María Andresa Casamayor National Research Award for Young Researchers in Mathematics and ICT." } },
        { name: "Brais Cancela Barizo", url: "https://portalinvestigacion.udc.gal/investigadores/212827/detalle",
          role: { es: "Profesor Titular · Universidade da Coruña", en: "Associate Professor · University of A Coruña" },
          bio: { es: "Doctor en Inteligencia Artificial y Ciencias de la Computación, con una tesis sobre modelado de escenas dinámicas y comportamiento de trayectorias.",
                 en: "PhD in Artificial Intelligence and Computer Science, with a thesis on dynamic scene modelling and trajectory behaviour." } }
      ] },

      { type: "h", t: { es: "Por qué", en: "Why" } },
      { type: "p", t: {
        es: "El TEA es una condición del neurodesarrollo que afecta a la comunicación, a la relación con los demás y al comportamiento. <strong>No existe una prueba objetiva</strong> (como un análisis de sangre) que lo detecte: el diagnóstico se basa en observar la conducta y en entrevistas y cuestionarios a las familias.",
        en: "ASD is a neurodevelopmental condition that affects communication, relationships with others and behaviour. <strong>There is no objective test</strong> (like a blood test) to detect it: diagnosis relies on observing behaviour and on interviews and questionnaires with families." } },
      { type: "tiles", items: [
        { t: { es: "Un proceso lento y subjetivo", en: "A slow, subjective process" }, d: { es: "La demanda crece y los servicios sanitarios están saturados, con largas listas de espera.", en: "Demand keeps growing and health services are saturated, with long waiting lists." } },
        { t: { es: "Cuanto antes, mejor", en: "The earlier, the better" }, d: { es: "Detectarlo pronto (idealmente entre los 18 y los 30 meses) aumenta el impacto de los apoyos.", en: "Detecting it early (ideally between 18 and 30 months) increases the impact of support." } },
        { t: { es: "Desigualdad de acceso", en: "Unequal access" }, d: { es: "Los apoyos exigen personal especializado, lo que perjudica a países y familias con menos recursos.", en: "Support requires specialised staff, which hurts countries and families with fewer resources." } },
        { t: { es: "1 de cada 100 niños", en: "1 in 100 children" }, d: { es: "Es la prevalencia del autismo según la OMS.", en: "That is the prevalence of autism according to the WHO." } }
      ] },
      { type: "p", t: {
        es: "De ahí la idea de una herramienta <strong>rápida, objetiva y escalable</strong> que complemente el cribado tradicional.",
        en: "Hence the idea of a <strong>fast, objective and scalable</strong> tool that complements traditional screening." } },

      { type: "h", t: { es: "Los datos y el reto", en: "The data and the challenge" } },
      { type: "p", t: {
        es: "Trabajé con una base de datos clínica real de <strong>209 personas</strong> (111 con TEA y 98 sin él, como grupo de control) de <strong>Galicia y Uruguay</strong>. De cada una se recogieron <strong>216 datos</strong>: edad, sexo, salud, medicación y las respuestas a dos cuestionarios estándar:",
        en: "I worked with a real clinical database of <strong>209 people</strong> (111 with ASD and 98 without, as a control group) from <strong>Galicia and Uruguay</strong>. For each one, <strong>216 data points</strong> were collected: age, sex, health, medication and the answers to two standard questionnaires:" } },
      { type: "tiles", items: [
        { t: "ICAP", d: { es: "Mide las habilidades del día a día (comunicarse, moverse por el barrio, relacionarse) y los problemas de conducta.", en: "Measures everyday skills (communicating, getting around the neighbourhood, relating to others) and behavioural problems." } },
        { t: "GARS-2", d: { es: "La escala de Gilliam, que valora conductas típicas del autismo.", en: "The Gilliam scale, which assesses behaviours typical of autism." } }
      ] },
      { type: "h3", t: { es: "Tres obstáculos", en: "Three obstacles" } },
      { type: "tiles", items: [
        { t: { es: "Más datos que personas", en: "More data than people" }, d: { es: "Con 216 datos y solo 209 personas, es fácil que un modelo «memorice» en lugar de aprender (sobreajuste).", en: "With 216 data points and only 209 people, a model can easily “memorise” instead of learn (overfitting)." } },
        { t: { es: "Datos incompletos", en: "Incomplete data" }, d: { es: "El 12,39 % de las respuestas estaba vacío.", en: "12.39% of the answers were empty." } },
        { t: { es: "Muestra con sesgo", en: "Biased sample" }, d: { es: "La parte uruguaya procede sobre todo de centros de educación especial (58 casos con TEA frente a 12 controles).", en: "The Uruguayan part comes mostly from special-education centres (58 ASD cases versus 12 controls)." } }
      ] },
      { type: "fig", src: "assets/proyectos/tfg/matriz-nulos.jpg",
        alt: { es: "Matriz de valores ausentes del dataset", en: "Missing value matrix of the dataset" },
        caption: { es: "Cada fila es una persona y cada columna una pregunta; los huecos blancos son respuestas que faltan. Se concentran en un grupo de preguntas y en parte de la muestra.", en: "Each row is a person and each column a question; white gaps are missing answers. They are concentrated in one group of questions and part of the sample." } },
      { type: "h3", t: { es: "Primer vistazo", en: "A first look" } },
      { type: "p", t: {
        es: "Antes de entrenar nada, exploré los datos con técnicas que resumen muchas dimensiones en un plano (PCA, t-SNE y UMAP). Los dos grupos se <strong>separan en parte, pero se solapan bastante</strong>, lo que anticipa que no es un problema trivial.",
        en: "Before training anything, I explored the data with techniques that squeeze many dimensions into a plane (PCA, t-SNE and UMAP). The two groups <strong>partly separate, but overlap quite a lot</strong>, which hints that this is not a trivial problem." } },
      { type: "fig", src: "assets/proyectos/tfg/proyecciones-bloques.jpg",
        alt: { es: "Proyecciones PCA, t-SNE y UMAP de los bloques funcionales", en: "PCA, t-SNE and UMAP projections of the functional blocks" },
        caption: { es: "Cada punto es una persona (azul: TEA, rojo: control). Proyecciones PCA, t-SNE y UMAP.", en: "Each dot is a person (blue: ASD, red: control). PCA, t-SNE and UMAP projections." } },

      { type: "h", t: { es: "Cómo lo hice", en: "How I did it" } },
      { type: "p", t: {
        es: "El esquema resume el recorrido completo, desde los datos originales hasta el ranking final de las configuraciones probadas.",
        en: "The diagram summarises the whole journey, from the original data to the final ranking of the configurations tested." } },
      { type: "fig", src: { es: "assets/proyectos/tfg/pipeline.jpg", en: "assets/proyectos/tfg/pipeline-en.jpg" },
        alt: { es: "Esquema del pipeline experimental", en: "Experimental pipeline diagram" },
        caption: { es: "Pipeline completo del proyecto.", en: "Full project pipeline." } },
      { type: "p", t: { es: "Pulsa en cada paso para ver el detalle.", en: "Click each step to see the details." } },
      { type: "tabs", variant: "steps", items: [
        { t: { es: "Preparar", en: "Prepare" },
          d: { es: "Convertí las respuestas a números, descarté las 25 preguntas con más de la mitad de respuestas vacías, <strong>rellené el resto de huecos</strong> usando personas parecidas (imputación KNN) y puse todas las variables en una <strong>misma escala</strong>, para que ninguna pese más solo por sus unidades.",
               en: "I converted the answers to numbers, dropped the 25 questions with more than half of their answers missing, <strong>filled the remaining gaps</strong> using similar people (KNN imputation) and put all variables on the <strong>same scale</strong>, so none weighs more just because of its units." } },
        { t: { es: "Validar", en: "Validate" },
          d: { es: "Dividí a las personas en <strong>5 grupos</strong>: se entrena con 4 y se prueba con el 5.º, rotando. Así <strong>cada persona se evalúa sin que el modelo la haya visto antes</strong>, y los resultados son fiables aun con pocos datos. Todo el preprocesado usa solo los datos de entrenamiento de cada ronda, para no «hacer trampas» (fuga de información).",
               en: "I split the people into <strong>5 groups</strong>: train on 4 and test on the 5th, rotating. This way <strong>every person is evaluated without the model having seen them before</strong>, and results are reliable even with little data. All preprocessing uses only the training data of each round, to avoid “cheating” (data leakage)." } },
        { t: { es: "Elegir variables", en: "Select features" },
          d: { es: "Probé <strong>6 métodos de selección de variables</strong> (Información Mutua, ANOVA, ReliefF, mRMR, SVM-RFE y E2EFS) que puntúan qué datos aportan más. E2EFS es una red neuronal que aprende a elegir sus propias variables mientras se entrena. Cada método se quedaba con las 5, 10, 20, 30 o 50 mejores.",
               en: "I tried <strong>6 feature selection methods</strong> (Mutual Information, ANOVA, ReliefF, mRMR, SVM-RFE and E2EFS) that score which data contribute most. E2EFS is a neural network that learns to choose its own variables while it trains. Each method kept the best 5, 10, 20, 30 or 50." } },
        { t: { es: "Entrenar", en: "Train" },
          d: { es: "Combiné cada método con <strong>6 algoritmos de clasificación</strong>: SVM, red neuronal (MLP), árbol de decisión, Random Forest, Gradient Boosting y regresión logística.",
               en: "I combined each method with <strong>6 classification algorithms</strong>: SVM, neural network (MLP), decision tree, Random Forest, Gradient Boosting and logistic regression." } },
        { t: { es: "Medir", en: "Measure" },
          d: { es: "Evalué cada combinación con 5 métricas. La principal fue el <strong>F1</strong>, que equilibra dos cosas: no dar falsas alarmas y no dejar casos sin detectar.",
               en: "I evaluated each combination with 5 metrics. The main one was the <strong>F1</strong>, which balances two things: avoiding false alarms and not missing cases." } },
        { t: { es: "Afinar", en: "Fine-tune" },
          d: { es: "Con las 20 variables finales, probé de forma sistemática muchas configuraciones de cada modelo (GridSearch) para sacarle el máximo partido.",
               en: "With the final 20 variables, I systematically tried many settings for each model (GridSearch) to get the most out of it." } }
      ] },
      { type: "h3", t: { es: "Decisiones tomadas con datos", en: "Decisions backed by data" } },
      { type: "accordion", items: [
        { t: { es: "Descartar preguntas casi vacías en vez de rellenarlas", en: "Drop nearly empty questions rather than fill them" },
          d: { es: "Rellenar distorsionaba menos los datos, pero al comparar ambas estrategias, descartar dio resultados algo mejores (menos de 2 puntos de diferencia) y un proceso más simple.",
               en: "Filling distorted the data less, but when comparing both strategies, dropping gave slightly better results (less than 2 points of difference) and a simpler process." } },
        { t: { es: "Quitar el país de procedencia", en: "Remove the country of origin" },
          d: { es: "Si se incluía, el modelo podía «aprender» que Uruguay significa TEA, lo cual no es medicina sino sesgo de muestreo. Quitarlo no empeoró los resultados, comprobado con una prueba estadística (Wilcoxon).",
               en: "If included, the model could “learn” that Uruguay means ASD, which is not medicine but sampling bias. Removing it did not hurt the results, checked with a statistical test (Wilcoxon)." } },
        { t: { es: "Quedarse con 20 variables", en: "Keep 20 variables" },
          d: { es: "A partir de ahí, añadir más mejora menos de 1 punto, y 20 es lo bastante pequeño como para interpretarlo clínicamente.",
               en: "Beyond that, adding more improves less than 1 point, and 20 is small enough to interpret clinically." } }
      ] },

      { type: "h", t: { es: "Resultados", en: "Results" } },
      { type: "kpis", items: [
        { v: { es: "0,87", en: "0.87" }, count: { to: 0.87, dec: 2 }, pct: 87, l: { es: "F1: equilibrio entre falsas alarmas y casos no detectados", en: "F1: balance between false alarms and missed cases" } },
        { v: { es: "0,92", en: "0.92" }, count: { to: 0.92, dec: 2 }, pct: 92, l: { es: "ROC-AUC: capacidad de distinguir ambos grupos (1 = perfecto, 0,5 = azar)", en: "ROC-AUC: ability to tell both groups apart (1 = perfect, 0.5 = chance)" } },
        { v: { es: "89 %", en: "89%" }, count: { to: 89, suffix: { es: " %", en: "%" } }, pct: 89, l: { es: "Precisión: de cada 100 casos marcados como TEA, 89 lo son", en: "Precision: of every 100 cases flagged as ASD, 89 are" } },
        { v: { es: "87 %", en: "87%" }, count: { to: 87, suffix: { es: " %", en: "%" } }, pct: 87, l: { es: "Recall: de cada 100 personas con TEA, detecta 87", en: "Recall: of every 100 people with ASD, it detects 87" } },
        { v: "20 / 216", l: { es: "variables bastan: se reduce el cuestionario en un 91 %", en: "variables are enough: the questionnaire shrinks by 91%" } },
        { v: "184 / 209", l: { es: "personas bien clasificadas", en: "people correctly classified" } }
      ] },
      { type: "p", t: {
        es: "El mejor modelo fue una <strong>red neuronal sencilla (MLP)</strong> de una sola capa con 50 neuronas, que mejoró casi 10 puntos al afinarla. La regresión logística, mucho más simple, quedó muy cerca (con un ROC-AUC incluso mayor, 0,93), así que <strong>no hace falta un modelo complejo</strong>: lo que importa es elegir bien las variables.",
        en: "The best model was a <strong>simple neural network (MLP)</strong> with a single layer of 50 neurons, which improved by almost 10 points once tuned. Logistic regression, much simpler, came very close (with an even higher ROC-AUC, 0.93), so <strong>a complex model is not needed</strong>: what matters is choosing the variables well." } },
      { type: "fig", src: "assets/proyectos/tfg/evaluacion-mlp.jpg",
        alt: { es: "Evaluación del modelo ganador", en: "Winning model evaluation" },
        caption: { es: "Arriba a la izquierda: aciertos y errores. Acertó con 85 controles y 99 personas con TEA, y falló con 13 y 12. Los errores se reparten por igual y se concentran en los casos más ambiguos.", en: "Top left: hits and misses. It got 85 controls and 99 people with ASD right, and missed 13 and 12. Errors are evenly split and concentrated in the most ambiguous cases." } },
      { type: "p", t: {
        es: "Además, el umbral de decisión es ajustable: en un uso real se podría priorizar detectar más casos aunque suba el número de falsas alarmas.",
        en: "The decision threshold can also be adjusted: in real use, one could prioritise detecting more cases even if false alarms increase." } },

      { type: "h3", t: { es: "Las variables elegidas tienen sentido clínico", en: "The selected variables make clinical sense" } },
      { type: "p", t: {
        es: "Lo más valioso quizá no son los números: las <strong>20 variables</strong> que los métodos eligieron <strong>no son casuales</strong>. Se reparten entre los <strong>3 dominios</strong> con los que el manual diagnóstico DSM-5 describe el autismo, vienen de los dos cuestionarios y cada una tiene respaldo en la literatura clínica.",
        en: "Perhaps the most valuable part is not the numbers: the <strong>20 variables</strong> the methods chose <strong>are not random</strong>. They are spread across the <strong>3 domains</strong> that the DSM-5 diagnostic manual uses to describe autism, come from both questionnaires and each one is backed by clinical literature." } },
      { type: "chipgroups", items: [
        { t: { es: "Interacción social", en: "Social interaction" },
          chips: { es: ["Permanecer apartado", "Evitar el contacto ocular", "Esperar el turno", "Ofrecer ayuda", "Moverse con autonomía por el barrio"], en: ["Staying apart from others", "Avoiding eye contact", "Waiting for one's turn", "Offering help", "Getting around the neighbourhood independently"] } },
        { t: { es: "Comunicación", en: "Communication" },
          chips: { es: ["Intercambiar objetos", "Contar una historia", "No iniciar conversaciones", "Repetir sonidos sin significado"], en: ["Exchanging objects", "Telling a story", "Not starting conversations", "Repeating meaningless sounds"] } },
        { t: { es: "Conductas repetitivas y restrictivas", en: "Restricted and repetitive behaviours" },
          chips: { es: ["Hacer cosas repetidamente", "Frecuencia de estereotipias", "Responder negativamente a órdenes", "Retraimiento"], en: ["Doing things repeatedly", "Frequency of stereotyped movements", "Responding negatively to instructions", "Withdrawal"] } }
      ] },
      { type: "p", t: {
        es: "También aparece un dato clínico, la <strong>medicación activa</strong>, relacionada con condiciones frecuentes junto al TEA, como el TDAH. Que los datos y la clínica coincidan es un resultado en sí mismo: el modelo no solo acierta, sino que lo hace <strong>por motivos razonables</strong>.",
        en: "A clinical variable also appears, <strong>current medication</strong>, linked to conditions that often accompany ASD, such as ADHD. That the data and the clinic agree is a result in itself: the model not only gets it right, it does so <strong>for sensible reasons</strong>." } },

      { type: "h", t: { es: "Limitaciones y trabajo futuro", en: "Limitations and future work" } },
      { type: "p", t: { es: "Es una herramienta de <strong>apoyo al cribado, no un diagnóstico</strong>, y conviene conocer sus límites:", en: "It is a <strong>screening support tool, not a diagnosis</strong>, and its limits are worth knowing:" } },
      { type: "accordion", items: [
        { t: { es: "Pocos datos", en: "Little data" }, d: { es: "Con 209 personas, los resultados podrían variar con otra muestra.", en: "With 209 people, results could change with another sample." } },
        { t: { es: "Sesgo geográfico", en: "Geographic bias" }, d: { es: "La muestra no representa a toda la población con TEA.", en: "The sample does not represent the whole ASD population." } },
        { t: { es: "Subjetividad", en: "Subjectivity" }, d: { es: "Los cuestionarios los responden familiares y distintas personas puntúan distinto.", en: "Questionnaires are answered by relatives and different people score differently." } },
        { t: { es: "Sin validación externa", en: "No external validation" }, d: { es: "Solo se probó con estos mismos datos (validación cruzada), no con un grupo independiente.", en: "It was only tested on this same data (cross-validation), not on an independent group." } }
      ] },
      { type: "h3", t: { es: "Próximos pasos", en: "Next steps" } },
      { type: "tiles", variant: "next", items: [
        { t: { es: "Más datos", en: "More data" }, d: { es: "Ampliar con más centros clínicos y más casos de control de centros ordinarios.", en: "Extend with more clinical centres and more control cases from mainstream schools." } },
        { t: { es: "Otras fuentes", en: "Other sources" }, d: { es: "Incorporar EEG, resonancia, análisis del lenguaje y seguimiento a lo largo del tiempo.", en: "Add EEG, MRI, language analysis and follow-up over time." } },
        { t: { es: "Validación externa", en: "External validation" }, d: { es: "Probar el modelo con un grupo independiente en centros colaboradores.", en: "Test the model with an independent group at collaborating centres." } },
        { t: { es: "Aplicación web o móvil", en: "Web or mobile app" }, d: { es: "Una herramienta donde el profesional introduzca los datos y obtenga una estimación del riesgo, con las variables que más han pesado.", en: "A tool where the professional enters the data and gets a risk estimate, along with the variables that weighed most." } }
      ] },

      { type: "h", t: { es: "Tecnologías", en: "Technologies" } },
      { type: "tech", items: [
        { n: "Python", i: "python" }, { n: "Jupyter", i: "jupyter" }, { n: "Visual Studio Code", i: "vscode" },
        { n: "pandas", i: "pandas" }, { n: "NumPy", i: "numpy" }, { n: "scikit-learn", i: "scikitlearn" },
        { n: "PyTorch", i: "pytorch" }, { n: "PyTorch Lightning", i: "lightning" },
        { n: "Matplotlib", i: "matplotlib" }, { n: "Seaborn", i: "seaborn" },
        { n: "skrebate (ReliefF)", i: null }, { n: "mRMR", i: null },
        { n: "LaTeX", i: "latex" }, { n: "GitHub", i: "github" }
      ] }
    ]
  },
  {
    id: "bicicoruna",
    date: { es: "2026", en: "2026" },
    title: {
      es: "PedalIA: predicción y operaciones para BiciCoruña",
      en: "PedalIA: forecasting and operations for BiciCoruña"
    },
    short: {
      es: "Una aplicación web que sigue en tiempo real las estaciones de BiciCoruña y predice cuántas bicis habrá en cada una durante las próximas 12 horas. Un modelo XGBoost por estación, con un error medio de 0,65 bicis, y un sistema que se actualiza solo.",
      en: "A web app that tracks BiciCoruña stations in real time and forecasts how many bikes each one will have over the next 12 hours. One XGBoost model per station, with a mean error of 0.65 bikes, and a system that updates itself."
    },
    image: "assets/proyectos/bicicoruna/mapa.jpg",
    links: { demo: "https://angelvilarino.github.io/BiciCoru/", memoria: null, repo: "https://github.com/angelvilarino/BiciCoru", web: null },
    blocks: [
      { type: "h", t: { es: "Introducción", en: "Introduction" } },
      { type: "p", t: {
        es: "<strong>PedalIA</strong> es un proyecto personal de principio a fin: recoge datos del sistema público de bicicletas de A Coruña, <strong>entrena modelos de aprendizaje automático</strong> con ellos y ofrece el resultado en una aplicación web pública. Responde a la pregunta que se hace cualquier usuario antes de salir de casa: <strong>¿habrá una bici (o un hueco para dejarla) cuando llegue?</strong>",
        en: "<strong>PedalIA</strong> is an end-to-end personal project: it collects data from A Coruña's public bike system, <strong>trains machine learning models</strong> on it and delivers the result in a public web app. It answers the question every user asks before leaving home: <strong>will there be a bike (or a free slot to leave it) when I get there?</strong>" } },

      { type: "h", t: { es: "Por qué", en: "Why" } },
      { type: "p", t: {
        es: "Los mapas de bicicletas solo muestran el <strong>estado actual</strong>, pero lo que importa es el estado <strong>cuando llegas</strong>: una estación con 6 bicis ahora puede estar vacía en media hora. Por eso la aplicación se diseñó para tres perfiles:",
        en: "Bike maps only show the <strong>current state</strong>, but what matters is the state <strong>when you arrive</strong>: a station with 6 bikes now can be empty in half an hour. That is why the app was designed for three types of user:" } },
      { type: "tiles", items: [
        { t: { es: "Usuario diario", en: "Daily commuter" }, d: { es: "Consulta la predicción de su estación habitual antes de salir de casa o del trabajo.", en: "Checks the forecast for their usual station before leaving home or work." } },
        { t: { es: "Turista u ocasional", en: "Tourist or occasional user" }, d: { es: "Descubre rutas, desniveles y el estado del tiempo y del mar.", en: "Discovers routes, slopes and the weather and sea conditions." } },
        { t: { es: "Gestor de flota", en: "Fleet operator" }, d: { es: "Detecta estaciones vacías o saturadas que necesitan rebalanceo.", en: "Spots empty or full stations that need rebalancing." } }
      ] },

      { type: "h", t: { es: "Arquitectura", en: "Architecture" } },
      { type: "p", t: {
        es: "Todo el sistema es <strong>serverless</strong>: las tareas programadas corren en GitHub Actions, los datos viven en PostgreSQL gestionado y la web es estática. No hay ningún servidor propio que mantener.",
        en: "The whole system is <strong>serverless</strong>: scheduled tasks run on GitHub Actions, data lives in managed PostgreSQL and the web app is static. There is no server of my own to maintain." } },
      { type: "fig", src: { es: "assets/proyectos/bicicoruna/arquitectura.svg", en: "assets/proyectos/bicicoruna/arquitectura-en.svg" },
        alt: { es: "Arquitectura de PedalIA", en: "PedalIA architecture" },
        caption: { es: "De las fuentes de datos a la aplicación, con tres flujos automáticos.", en: "From data sources to the app, with three automated workflows." } },

      { type: "h", t: { es: "Cómo lo hice", en: "How I did it" } },
      { type: "p", t: { es: "Pulsa en cada paso para ver el detalle.", en: "Click each step to see the details." } },
      { type: "tabs", variant: "steps", items: [
        { t: { es: "Recoger", en: "Collect" },
          d: { es: "Un script en Python consulta la <strong>API de BiciCoruña</strong> (estándar GBFS / CityBikes) y <strong>Open-Meteo</strong> (clima y oleaje). GitHub Actions lo ejecuta <strong>cada 10 minutos</strong> en horas de uso y cada hora de madrugada, guardando una «foto» (<em>snapshot</em>) de cada estación.",
               en: "A Python script queries the <strong>BiciCoruña API</strong> (GBFS / CityBikes standard) and <strong>Open-Meteo</strong> (weather and waves). GitHub Actions runs it <strong>every 10 minutes</strong> in busy hours and hourly overnight, saving a snapshot of every station." } },
        { t: { es: "Guardar", en: "Store" },
          d: { es: "Los datos se normalizan en <strong>PostgreSQL (Supabase)</strong>, en cinco tablas. La seguridad por filas (<strong>RLS</strong>) permite lectura pública y deja la escritura solo a los procesos automáticos.",
               en: "Data is normalised in <strong>PostgreSQL (Supabase)</strong> across five tables. Row Level Security (<strong>RLS</strong>) allows public reads and restricts writes to the automated jobs." } },
        { t: { es: "Variables", en: "Features" },
          d: { es: "Preparo variables de calendario, meteorología y de <strong>memoria de la propia estación</strong>. La hora se codifica con <strong>seno y coseno</strong> para que el modelo entienda que las 23:00 y las 00:00 están cerca, algo que un número del 0 al 23 no refleja.",
               en: "I build calendar, weather and <strong>station-memory</strong> features. The hour is encoded with <strong>sine and cosine</strong> so the model understands that 23:00 and 00:00 are close, something a plain 0–23 number does not capture." } },
        { t: { es: "Entrenar", en: "Train" },
          d: { es: "Un modelo de regresión <strong>XGBoost por estación</strong>, porque cada una tiene su propio patrón (una cerca de la universidad no se comporta como una del paseo marítimo). Un workflow <strong>reentrena cada semana</strong> para seguir el ritmo de la ciudad.",
               en: "One <strong>XGBoost</strong> regression model <strong>per station</strong>, since each has its own pattern (one near the university does not behave like one on the seafront). A workflow <strong>retrains every week</strong> to keep up with the city." } },
        { t: { es: "Predecir", en: "Forecast" },
          d: { es: "Otro workflow genera la disponibilidad esperada de <strong>cada estación para cada una de las próximas 12 horas</strong> y la guarda en la tabla de predicciones, lista para que la web la pinte al instante.",
               en: "Another workflow produces the expected availability of <strong>every station for each of the next 12 hours</strong> and stores it in the predictions table, ready for the web app to draw instantly." } },
        { t: { es: "Mostrar", en: "Deliver" },
          d: { es: "Una aplicación en <strong>JavaScript puro</strong> (sin frameworks, de carga rápida) lee la base de datos por REST, dibuja el mapa con <strong>Leaflet</strong>, las gráficas con <strong>Chart.js</strong> y se instala como <strong>PWA</strong> con soporte sin conexión.",
               en: "A <strong>vanilla JavaScript</strong> app (no frameworks, fast to load) reads the database over REST, draws the map with <strong>Leaflet</strong> and charts with <strong>Chart.js</strong>, and installs as a <strong>PWA</strong> with offline support." } }
      ] },

      { type: "h3", t: { es: "Modelo de datos y variables", en: "Data model and features" } },
      { type: "fig", src: "assets/proyectos/bicicoruna/modelo-datos.svg",
        alt: { es: "Modelo de datos de PedalIA", en: "PedalIA data model" },
        caption: { es: "Esquema relacional en PostgreSQL: el clima es una serie temporal independiente.", en: "Relational schema in PostgreSQL: weather is an independent time series." } },
      { type: "chipgroups", items: [
        { t: { es: "Calendario", en: "Calendar" }, chips: { es: ["Hora (seno y coseno)", "Día de la semana", "Fin de semana o festivo"], en: ["Hour (sine and cosine)", "Day of the week", "Weekend or holiday"] } },
        { t: { es: "Meteorología", en: "Weather" }, chips: { es: ["Temperatura", "Lluvia (mm)", "Viento"], en: ["Temperature", "Rainfall (mm)", "Wind"] } },
        { t: { es: "Historia de la estación", en: "Station history" }, chips: { es: ["Bicis en horas anteriores", "Bicis del día anterior", "Tendencia reciente"], en: ["Bikes in previous hours", "Bikes the day before", "Recent trend"] } }
      ] },

      { type: "h", t: { es: "Resultados", en: "Results" } },
      { type: "kpis", items: [
        { v: { es: "0,65", en: "0.65" }, count: { to: 0.65, dec: 2 }, l: { es: "MAE medio: la predicción se desvía, de media, menos de una bici", en: "mean MAE: on average the forecast is off by less than one bike" } },
        { v: { es: "0,789", en: "0.789" }, count: { to: 0.789, dec: 3 }, pct: 79, l: { es: "R² medio: explica en torno al 79 % de la variación de bicis", en: "mean R²: explains around 79% of the variation in bikes" } },
        { v: "80", count: { to: 80 }, pct: 100, l: { es: "modelos XGBoost entrenados: uno por cada una de las 80 estaciones", en: "XGBoost models trained: one for each of the 80 stations" } },
        { v: { es: "+136.000", en: "+136,000" }, count: { to: 136000, prefix: "+", group: true }, l: { es: "registros históricos de snapshots usados para entrenar", en: "historical snapshot records used for training" } },
        { v: { es: "+424.000", en: "+424,000" }, count: { to: 424000, prefix: "+", group: true }, l: { es: "filas de entrenamiento tras procesar las variables", en: "training rows after feature processing" } },
        { v: { es: "+1.800", en: "+1,800" }, count: { to: 1800, prefix: "+", group: true }, pct: 99, l: { es: "predicciones guardadas en cada ejecución, para 79 de las 80 estaciones", en: "predictions stored in each run, for 79 of the 80 stations" } }
      ] },
      { type: "note", t: { es: "Cifras del último entrenamiento. Crecen y se recalculan cada semana con el nuevo historial.", en: "Figures from the latest training run. They grow and are recalculated every week with the new history." } },
      { type: "p", t: {
        es: "Un error medio inferior a una bici basta para decidir si salir de casa: la diferencia entre «hay 6» y «hay 7» rara vez importa; la que importa es entre «hay» y «no hay».",
        en: "A mean error below one bike is enough to decide whether to leave home: the difference between “there are 6” and “there are 7” rarely matters; the one that matters is between “there are some” and “there are none”." } },

      { type: "h", t: { es: "La aplicación", en: "The app" } },
      { type: "p", t: { es: "Explora las pantallas y funciones. Pulsa en una captura para ampliarla.", en: "Explore the screens and features. Click a screenshot to enlarge it." } },
      { type: "tabs", items: [
        { t: { es: "Mapa en vivo", en: "Live map" },
          d: { es: "Todas las estaciones coloreadas según su disponibilidad (verde: 5 o más bicis, naranja: de 1 a 4, rojo: vacía), con buscador, filtros (favoritas, con bicis, con huecos) y geolocalización. Arriba a la derecha, el tiempo y el oleaje de A Coruña.",
               en: "Every station coloured by availability (green: 5+ bikes, orange: 1–4, red: empty), with search, filters (favourites, with bikes, with free slots) and geolocation. Top right, the weather and waves in A Coruña." },
          img: "assets/proyectos/bicicoruna/mapa.jpg", alt: { es: "Mapa interactivo de PedalIA", en: "PedalIA interactive map" } },
        { t: { es: "Ficha de estación", en: "Station card" }, side: true,
          d: { es: "Bicis y huecos libres en vivo, historial de ocupación de las últimas 24 horas y acceso a la <strong>predicción IA a 12 horas</strong>, a las rutas a pie o en bici y al reporte de incidencias (bici dañada, anclaje bloqueado, tótem, limpieza).",
               en: "Live bikes and free slots, occupancy history for the last 24 hours and access to the <strong>12-hour AI forecast</strong>, walking or cycling routes and incident reports (damaged bike, blocked dock, totem, cleanliness)." },
          img: "assets/proyectos/bicicoruna/prediccion.jpg", alt: { es: "Ficha de estación de PedalIA", en: "PedalIA station card" } },
        { t: { es: "Dashboard de red", en: "Network dashboard" },
          d: { es: "Bicis disponibles, huecos libres, estaciones activas e <strong>índice de salud del sistema</strong>, con la distribución de disponibilidad y los rankings de estaciones. Otras pestañas listan la ocupación por estación y las alertas de rebalanceo.",
               en: "Available bikes, free slots, active stations and a <strong>system health index</strong>, with the availability distribution and station rankings. Other tabs list occupancy per station and rebalancing alerts." },
          img: "assets/proyectos/bicicoruna/dashboard.jpg", alt: { es: "Dashboard de la red", en: "Network dashboard" } },
        { t: { es: "Rutas y altimetría", en: "Routes and elevation" },
          d: { es: "Rutas a pie o en bici hasta cualquier estación, con tiempo, distancia y un <strong>perfil de altitud</strong> cuyo cursor se sincroniza con un marcador sobre el mapa.",
               en: "Walking or cycling routes to any station, with time, distance and an <strong>elevation profile</strong> whose cursor is synced with a marker on the map." } },
        { t: { es: "Mi actividad", en: "My activity" },
          d: { es: "Un registro de tus viajes con distancia, duración, ahorro de CO₂ y, al llegar, <strong>cuánto acertó la predicción</strong> frente a la disponibilidad real.",
               en: "A log of your trips with distance, duration, CO₂ savings and, on arrival, <strong>how accurate the forecast was</strong> compared with real availability." } },
        { t: { es: "Extras", en: "Extras" },
          d: { es: "Modo oscuro y claro, modo turista, favoritas y viajes guardados en el propio navegador (sin cuentas ni seguimiento) e instalación como app en iOS y Android.",
               en: "Dark and light mode, tourist mode, favourites and trips saved in the browser itself (no accounts or tracking) and installation as an app on iOS and Android." } }
      ] },

      { type: "h", t: { es: "Decisiones y limitaciones", en: "Decisions and limitations" } },
      { type: "accordion", items: [
        { t: { es: "¿Por qué serverless?", en: "Why serverless?" },
          d: { es: "GitHub Actions + Supabase + GitHub Pages dan un sistema gratuito, sin mantenimiento y con despliegue automático en cada <em>commit</em>.",
               en: "GitHub Actions + Supabase + GitHub Pages give a free, maintenance-free system with automatic deployment on every commit." } },
        { t: { es: "¿Y la privacidad?", en: "What about privacy?" },
          d: { es: "Favoritas, tema y viajes se guardan en <code>localStorage</code>: no hay cuentas, y por eso el historial no se sincroniza entre dispositivos.",
               en: "Favourites, theme and trips are stored in <code>localStorage</code>: there are no accounts, which is also why history does not sync across devices." } },
        { t: { es: "Dependencia de una API externa", en: "Dependence on an external API" },
          d: { es: "Si BiciCoruña cambia o corta su API, la ingesta se detiene. Además, las tareas programadas de GitHub Actions pueden retrasarse unos minutos, así que las lecturas no son perfectamente regulares.",
               en: "If BiciCoruña changes or shuts down its API, ingestion stops. Also, scheduled GitHub Actions jobs can be delayed by a few minutes, so readings are not perfectly regular." } },
        { t: { es: "Eventos imprevistos", en: "Unexpected events" },
          d: { es: "Un concierto, un partido o una avería masiva alteran la demanda y el modelo no los conoce.",
               en: "A concert, a match or a mass breakdown alters demand and the model knows nothing about them." } }
      ] },
      { type: "h3", t: { es: "Próximos pasos", en: "Next steps" } },
      { type: "tiles", variant: "next", items: [
        { t: { es: "Error por estación", en: "Error per station" }, d: { es: "Panel público con el MAE por estación y horizonte, no solo la media.", en: "Public dashboard with MAE per station and horizon, not just the mean." } },
        { t: { es: "Eventos de la ciudad", en: "City events" }, d: { es: "Incorporar el calendario de eventos como variable.", en: "Add the event calendar as a feature." } },
        { t: { es: "Avisos push", en: "Push alerts" }, d: { es: "Aviso cuando la estación favorita vaya a quedarse sin bicis o sin huecos.", en: "Alert when a favourite station is about to run out of bikes or slots." } },
        { t: { es: "Cuentas opcionales", en: "Optional accounts" }, d: { es: "Sincronizar favoritas y viajes entre dispositivos.", en: "Sync favourites and trips across devices." } }
      ] },

      { type: "h", t: { es: "Tecnologías", en: "Technologies" } },
      { type: "tech", items: [
        { n: "Python", i: "python" }, { n: "pandas", i: "pandas" }, { n: "NumPy", i: "numpy" },
        { n: "scikit-learn", i: "scikitlearn" }, { n: "XGBoost", i: null },
        { n: "PostgreSQL", i: "postgresql" }, { n: "Supabase", i: null },
        { n: "GitHub Actions", i: "github" }, { n: "GitHub Pages", i: "github" },
        { n: "JavaScript", i: null }, { n: "Leaflet", i: "leaflet" }, { n: "Chart.js", i: null },
        { n: "PWA / Service Worker", i: null }
      ] }
    ]
  }
];
