export type CourseLevel = "beginner" | "intermediate" | "advanced";

export interface Course {
  id: string;
  title: string;
  level: CourseLevel;
  description: string;
  duration: string;
  price: number;
  schedule: string;
  benefits: string[];
  outline: {
    week: number;
    topics: string[];
  }[];
  whatYouLearn: string[];
}

export const courses: Course[] = [
  {
    id: "intro-software-engineering",
    title: "Introduction to Software Engineering",
    level: "beginner",
    description: "Start your journey in software development with fundamental concepts and practical skills.",
    duration: "4 weeks",
    price: 250,
    schedule: "Mon/Wed/Fri – 8:00–9:30 AM EST",
    benefits: ["Hands-on projects", "Live mentorship", "Certificate after completion"],
    whatYouLearn: [
      "Core software engineering principles",
      "Problem-solving methodologies",
      "Industry best practices",
      "Collaborative development techniques"
    ],
    outline: [
      { week: 1, topics: ["Software Engineering Fundamentals", "Development Lifecycle"] },
      { week: 2, topics: ["Problem Solving Approaches", "Algorithm Basics"] },
      { week: 3, topics: ["Code Quality & Testing", "Documentation"] },
      { week: 4, topics: ["Project Management", "Team Collaboration"] }
    ]
  },
  {
    id: "git-github-basics",
    title: "Git & GitHub Basics",
    level: "beginner",
    description: "Master version control with Git and collaborative development on GitHub.",
    duration: "2 weeks",
    price: 250,
    schedule: "Mon/Wed/Fri – 8:00–9:30 AM EST",
    benefits: ["Real-world workflows", "Portfolio building", "Industry-standard tools"],
    whatYouLearn: [
      "Git fundamentals and commands",
      "GitHub collaboration workflows",
      "Branch management strategies",
      "Open source contribution"
    ],
    outline: [
      { week: 1, topics: ["Git Basics", "Commits, Branches, Merges", "GitHub Setup"] },
      { week: 2, topics: ["Pull Requests", "Collaboration", "GitHub Actions Intro"] }
    ]
  },
  {
    id: "html-css-fundamentals",
    title: "HTML5 + CSS Fundamentals",
    level: "beginner",
    description: "Build beautiful, accessible, and SEO-friendly websites from scratch.",
    duration: "4 weeks",
    price: 250,
    schedule: "Mon/Wed/Fri – 8:00–9:30 AM EST",
    benefits: ["Build real websites", "Responsive design", "SEO optimization"],
    whatYouLearn: [
      "Modern HTML5 semantics",
      "CSS layout techniques (Flexbox, Grid)",
      "Accessibility standards (WCAG)",
      "SEO best practices"
    ],
    outline: [
      { week: 1, topics: ["HTML5 Structure", "Semantic Elements", "Forms"] },
      { week: 2, topics: ["CSS Basics", "Selectors", "Box Model"] },
      { week: 3, topics: ["Flexbox & Grid", "Responsive Design"] },
      { week: 4, topics: ["Accessibility", "SEO Optimization"] }
    ]
  },
  {
    id: "python-fundamentals",
    title: "Python Programming Fundamentals",
    level: "beginner",
    description: "Learn Python from scratch with hands-on coding exercises and real-world applications.",
    duration: "6 weeks",
    price: 250,
    schedule: "Mon/Wed/Fri – 8:00–9:30 AM EST",
    benefits: ["Interactive coding", "Project-based learning", "Career guidance"],
    whatYouLearn: [
      "Python syntax and data types",
      "Control structures and functions",
      "Data structures (lists, dictionaries)",
      "File handling and modules"
    ],
    outline: [
      { week: 1, topics: ["Python Basics", "Variables", "Data Types"] },
      { week: 2, topics: ["Control Flow", "Loops", "Conditionals"] },
      { week: 3, topics: ["Functions", "Parameters", "Return Values"] },
      { week: 4, topics: ["Lists", "Tuples", "Dictionaries"] },
      { week: 5, topics: ["File Handling", "Error Handling"] },
      { week: 6, topics: ["Modules", "Final Project"] }
    ]
  },
  {
    id: "javascript-fundamentals",
    title: "JavaScript Fundamentals",
    level: "intermediate",
    description: "Master JavaScript to build interactive web applications with modern ES6+ features.",
    duration: "6 weeks",
    price: 350,
    schedule: "Mon/Wed/Fri – 12:00–1:30 PM EST",
    benefits: ["Modern JavaScript", "DOM manipulation", "CV support included"],
    whatYouLearn: [
      "ES6+ syntax and features",
      "DOM manipulation and events",
      "Asynchronous programming",
      "API integration"
    ],
    outline: [
      { week: 1, topics: ["JavaScript Basics", "Variables", "Data Types"] },
      { week: 2, topics: ["Functions", "Arrow Functions", "Scope"] },
      { week: 3, topics: ["DOM Manipulation", "Events", "Event Handlers"] },
      { week: 4, topics: ["Async/Await", "Promises", "Fetch API"] },
      { week: 5, topics: ["ES6 Features", "Destructuring", "Modules"] },
      { week: 6, topics: ["Final Project", "Portfolio Building"] }
    ]
  },
  {
    id: "python-advanced",
    title: "Advanced Python & OOP",
    level: "intermediate",
    description: "Deep dive into Python with object-oriented programming, data structures, and file operations.",
    duration: "6 weeks",
    price: 350,
    schedule: "Mon/Wed/Fri – 12:00–1:30 PM EST",
    benefits: ["OOP mastery", "Real applications", "CV support"],
    whatYouLearn: [
      "Object-oriented programming principles",
      "Advanced data structures",
      "File I/O operations",
      "Database integration"
    ],
    outline: [
      { week: 1, topics: ["OOP Fundamentals", "Classes", "Objects"] },
      { week: 2, topics: ["Inheritance", "Polymorphism", "Encapsulation"] },
      { week: 3, topics: ["Advanced Data Structures", "Algorithms"] },
      { week: 4, topics: ["File Operations", "JSON", "CSV"] },
      { week: 5, topics: ["Database Basics", "SQL with Python"] },
      { week: 6, topics: ["Project Development", "Best Practices"] }
    ]
  },
  {
    id: "database-sql",
    title: "Database Design & SQL",
    level: "intermediate",
    description: "Learn database design principles and master SQL from basics to advanced queries.",
    duration: "5 weeks",
    price: 350,
    schedule: "Mon/Wed/Fri – 12:00–1:30 PM EST",
    benefits: ["Database design", "Query optimization", "Real-world scenarios"],
    whatYouLearn: [
      "Database design principles",
      "SQL queries and joins",
      "Data modeling",
      "Database optimization"
    ],
    outline: [
      { week: 1, topics: ["Database Fundamentals", "Relational Model"] },
      { week: 2, topics: ["SQL Basics", "SELECT", "INSERT", "UPDATE"] },
      { week: 3, topics: ["Joins", "Subqueries", "Aggregations"] },
      { week: 4, topics: ["Normalization", "Indexes", "Optimization"] },
      { week: 5, topics: ["Transactions", "Views", "Final Project"] }
    ]
  },
  {
    id: "ai-software-engineering",
    title: "AI in Software Engineering",
    level: "advanced",
    description: "Explore machine learning, AI tools, and ethical considerations in modern software development.",
    duration: "8 weeks",
    price: 550,
    schedule: "Mon/Wed/Fri – 4:00–5:30 PM EST",
    benefits: ["ML fundamentals", "AI tools mastery", "Certification included"],
    whatYouLearn: [
      "Machine learning fundamentals",
      "AI integration in applications",
      "Ethics and responsible AI",
      "Production ML systems"
    ],
    outline: [
      { week: 1, topics: ["AI/ML Introduction", "Use Cases"] },
      { week: 2, topics: ["ML Algorithms", "Supervised Learning"] },
      { week: 3, topics: ["Neural Networks", "Deep Learning Basics"] },
      { week: 4, topics: ["AI Tools & APIs", "Integration"] },
      { week: 5, topics: ["Natural Language Processing"] },
      { week: 6, topics: ["Computer Vision Basics"] },
      { week: 7, topics: ["AI Ethics", "Responsible Development"] },
      { week: 8, topics: ["Capstone Project", "Certification"] }
    ]
  },
  {
    id: "software-testing",
    title: "Software Testing & QA",
    level: "advanced",
    description: "Master testing methodologies, automation, and quality assurance practices.",
    duration: "6 weeks",
    price: 550,
    schedule: "Mon/Wed/Fri – 4:00–5:30 PM EST",
    benefits: ["Testing automation", "Industry tools", "Certification"],
    whatYouLearn: [
      "Testing methodologies and strategies",
      "Test automation frameworks",
      "CI/CD integration",
      "Quality metrics and reporting"
    ],
    outline: [
      { week: 1, topics: ["Testing Fundamentals", "Types of Testing"] },
      { week: 2, topics: ["Test Design", "Test Cases", "Planning"] },
      { week: 3, topics: ["Automation Tools", "Selenium", "Frameworks"] },
      { week: 4, topics: ["CI/CD", "Jenkins", "GitHub Actions"] },
      { week: 5, topics: ["Performance Testing", "Load Testing"] },
      { week: 6, topics: ["Certification Project", "Best Practices"] }
    ]
  },
  {
    id: "mern-fullstack",
    title: "MERN Full-Stack Development",
    level: "advanced",
    description: "Build modern full-stack applications with MongoDB, Express, React, and Node.js.",
    duration: "10 weeks",
    price: 550,
    schedule: "Mon/Wed/Fri – 4:00–5:30 PM EST",
    benefits: ["Full-stack expertise", "Real-time apps", "DevOps basics", "Certification"],
    whatYouLearn: [
      "Complete MERN stack development",
      "RESTful API design",
      "Real-time features with Socket.io",
      "Deployment and DevOps basics"
    ],
    outline: [
      { week: 1, topics: ["Node.js Fundamentals", "Express Setup"] },
      { week: 2, topics: ["MongoDB", "Mongoose", "Data Modeling"] },
      { week: 3, topics: ["RESTful APIs", "Authentication"] },
      { week: 4, topics: ["React Fundamentals", "Components", "Hooks"] },
      { week: 5, topics: ["State Management", "Redux/Context"] },
      { week: 6, topics: ["Full Integration", "Frontend-Backend"] },
      { week: 7, topics: ["Socket.io", "Real-time Features"] },
      { week: 8, topics: ["Testing", "Security", "Best Practices"] },
      { week: 9, topics: ["Deployment", "Docker", "CI/CD"] },
      { week: 10, topics: ["Capstone Project", "Certification"] }
    ]
  }
];
