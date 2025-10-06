export interface WeekSchedule {
  week: number;
  mainTopic: string;
  subtopics: string[];
  assignment: string;
  classTime: string;
}

export interface LevelSchedule {
  level: "beginner" | "intermediate" | "advanced";
  displayName: string;
  classTime: string;
  price: number;
  weeks: WeekSchedule[];
}

export const courseSchedules: LevelSchedule[] = [
  {
    level: "beginner",
    displayName: "Beginner Level",
    classTime: "Mon/Wed/Fri – 8:00–9:30 AM EST",
    price: 250,
    weeks: [
      {
        week: 1,
        mainTopic: "Introduction to Software Engineering",
        subtopics: ["Software Engineering Fundamentals", "Development Lifecycle", "Environment Setup"],
        assignment: "Setup development environment and create first project",
        classTime: "Mon/Wed/Fri – 8:00–9:30 AM EST",
      },
      {
        week: 2,
        mainTopic: "Git & Version Control",
        subtopics: ["Git Basics", "Commits & Branches", "GitHub Setup & Collaboration"],
        assignment: "Create a GitHub repository and practice branching",
        classTime: "Mon/Wed/Fri – 8:00–9:30 AM EST",
      },
      {
        week: 3,
        mainTopic: "HTML5 Fundamentals",
        subtopics: ["HTML5 Structure", "Semantic Elements", "Forms & Validation"],
        assignment: "Build a multi-page HTML website with forms",
        classTime: "Mon/Wed/Fri – 8:00–9:30 AM EST",
      },
      {
        week: 4,
        mainTopic: "CSS Basics",
        subtopics: ["CSS Selectors", "Box Model", "Colors & Typography"],
        assignment: "Style your HTML website with CSS",
        classTime: "Mon/Wed/Fri – 8:00–9:30 AM EST",
      },
      {
        week: 5,
        mainTopic: "Responsive Design",
        subtopics: ["Flexbox Layout", "CSS Grid", "Media Queries"],
        assignment: "Make your website responsive for all devices",
        classTime: "Mon/Wed/Fri – 8:00–9:30 AM EST",
      },
      {
        week: 6,
        mainTopic: "Python Programming Basics",
        subtopics: ["Variables & Data Types", "Control Flow", "Loops & Functions"],
        assignment: "Write Python scripts for basic automation",
        classTime: "Mon/Wed/Fri – 8:00–9:30 AM EST",
      },
      {
        week: 7,
        mainTopic: "Python Data Structures",
        subtopics: ["Lists & Tuples", "Dictionaries & Sets", "List Comprehensions"],
        assignment: "Build a contact management system",
        classTime: "Mon/Wed/Fri – 8:00–9:30 AM EST",
      },
      {
        week: 8,
        mainTopic: "File Handling & Modules",
        subtopics: ["Reading/Writing Files", "JSON & CSV", "Python Modules"],
        assignment: "Create a data processing application",
        classTime: "Mon/Wed/Fri – 8:00–9:30 AM EST",
      },
      {
        week: 9,
        mainTopic: "Web Accessibility & SEO",
        subtopics: ["WCAG Guidelines", "ARIA Attributes", "SEO Best Practices"],
        assignment: "Audit and improve website accessibility",
        classTime: "Mon/Wed/Fri – 8:00–9:30 AM EST",
      },
      {
        week: 10,
        mainTopic: "Technical Writing",
        subtopics: ["Documentation Standards", "README Files", "Code Comments"],
        assignment: "Document your portfolio projects",
        classTime: "Mon/Wed/Fri – 8:00–9:30 AM EST",
      },
      {
        week: 11,
        mainTopic: "Mathematical Thinking in Coding",
        subtopics: ["Logic & Algorithms", "Problem Solving", "Pseudocode"],
        assignment: "Solve algorithmic challenges",
        classTime: "Mon/Wed/Fri – 8:00–9:30 AM EST",
      },
      {
        week: 12,
        mainTopic: "Final Project & Portfolio",
        subtopics: ["Project Planning", "Implementation", "Presentation & Deployment"],
        assignment: "Complete and present capstone project",
        classTime: "Mon/Wed/Fri – 8:00–9:30 AM EST",
      },
    ],
  },
  {
    level: "intermediate",
    displayName: "Intermediate Level",
    classTime: "Mon/Wed/Fri – 12:00–1:30 PM EST",
    price: 350,
    weeks: [
      {
        week: 1,
        mainTopic: "JavaScript Fundamentals",
        subtopics: ["JS Syntax", "Variables & Data Types", "Type Coercion"],
        assignment: "Build interactive web components with vanilla JS",
        classTime: "Mon/Wed/Fri – 12:00–1:30 PM EST",
      },
      {
        week: 2,
        mainTopic: "JavaScript Functions & Scope",
        subtopics: ["Functions", "Arrow Functions", "Closures & Scope"],
        assignment: "Create utility functions library",
        classTime: "Mon/Wed/Fri – 12:00–1:30 PM EST",
      },
      {
        week: 3,
        mainTopic: "DOM Manipulation",
        subtopics: ["DOM Selection", "Event Listeners", "Dynamic Content"],
        assignment: "Build an interactive to-do list application",
        classTime: "Mon/Wed/Fri – 12:00–1:30 PM EST",
      },
      {
        week: 4,
        mainTopic: "Asynchronous JavaScript",
        subtopics: ["Promises", "Async/Await", "Fetch API"],
        assignment: "Create a weather app using external API",
        classTime: "Mon/Wed/Fri – 12:00–1:30 PM EST",
      },
      {
        week: 5,
        mainTopic: "ES6+ Features",
        subtopics: ["Destructuring", "Spread/Rest", "Modules"],
        assignment: "Refactor existing code with modern JS features",
        classTime: "Mon/Wed/Fri – 12:00–1:30 PM EST",
      },
      {
        week: 6,
        mainTopic: "Advanced Python & OOP",
        subtopics: ["Classes & Objects", "Inheritance", "Polymorphism"],
        assignment: "Design an object-oriented application",
        classTime: "Mon/Wed/Fri – 12:00–1:30 PM EST",
      },
      {
        week: 7,
        mainTopic: "Database Design Fundamentals",
        subtopics: ["Relational Model", "ER Diagrams", "Normalization"],
        assignment: "Design a database schema for e-commerce",
        classTime: "Mon/Wed/Fri – 12:00–1:30 PM EST",
      },
      {
        week: 8,
        mainTopic: "SQL Basics",
        subtopics: ["SELECT Queries", "INSERT/UPDATE/DELETE", "WHERE Clauses"],
        assignment: "Write SQL queries for data analysis",
        classTime: "Mon/Wed/Fri – 12:00–1:30 PM EST",
      },
      {
        week: 9,
        mainTopic: "Advanced SQL",
        subtopics: ["JOINs", "Subqueries", "Aggregations & GROUP BY"],
        assignment: "Complex reporting with multi-table queries",
        classTime: "Mon/Wed/Fri – 12:00–1:30 PM EST",
      },
      {
        week: 10,
        mainTopic: "Web Hosting & Deployment",
        subtopics: ["Hosting Options", "Domain Setup", "CI/CD Basics"],
        assignment: "Deploy your application to production",
        classTime: "Mon/Wed/Fri – 12:00–1:30 PM EST",
      },
      {
        week: 11,
        mainTopic: "Software Project Management",
        subtopics: ["Agile Methodology", "Sprint Planning", "Collaboration Tools"],
        assignment: "Plan and manage a team project sprint",
        classTime: "Mon/Wed/Fri – 12:00–1:30 PM EST",
      },
      {
        week: 12,
        mainTopic: "Capstone Project & CV Building",
        subtopics: ["Project Development", "Professional Portfolio", "CV Support"],
        assignment: "Complete full-stack project and finalize portfolio",
        classTime: "Mon/Wed/Fri – 12:00–1:30 PM EST",
      },
    ],
  },
  {
    level: "advanced",
    displayName: "Advanced Level",
    classTime: "Mon/Wed/Fri – 4:00–5:30 PM EST",
    price: 550,
    weeks: [
      {
        week: 1,
        mainTopic: "MERN Stack Introduction",
        subtopics: ["Node.js Fundamentals", "Express Setup", "REST Architecture"],
        assignment: "Build a RESTful API with Express",
        classTime: "Mon/Wed/Fri – 4:00–5:30 PM EST",
      },
      {
        week: 2,
        mainTopic: "MongoDB & Data Modeling",
        subtopics: ["MongoDB Basics", "Mongoose ODM", "Schema Design"],
        assignment: "Design and implement database models",
        classTime: "Mon/Wed/Fri – 4:00–5:30 PM EST",
      },
      {
        week: 3,
        mainTopic: "Authentication & Security",
        subtopics: ["JWT Tokens", "Password Hashing", "Authorization"],
        assignment: "Implement secure user authentication system",
        classTime: "Mon/Wed/Fri – 4:00–5:30 PM EST",
      },
      {
        week: 4,
        mainTopic: "React Fundamentals",
        subtopics: ["Components & Props", "State & Hooks", "React Router"],
        assignment: "Build a multi-page React application",
        classTime: "Mon/Wed/Fri – 4:00–5:30 PM EST",
      },
      {
        week: 5,
        mainTopic: "State Management",
        subtopics: ["Context API", "Redux Basics", "State Best Practices"],
        assignment: "Implement global state management",
        classTime: "Mon/Wed/Fri – 4:00–5:30 PM EST",
      },
      {
        week: 6,
        mainTopic: "Full-Stack Integration",
        subtopics: ["API Integration", "Error Handling", "Loading States"],
        assignment: "Connect React frontend to Node backend",
        classTime: "Mon/Wed/Fri – 4:00–5:30 PM EST",
      },
      {
        week: 7,
        mainTopic: "Real-time Features",
        subtopics: ["Socket.io Setup", "Real-time Events", "Chat Implementation"],
        assignment: "Build real-time chat or notification system",
        classTime: "Mon/Wed/Fri – 4:00–5:30 PM EST",
      },
      {
        week: 8,
        mainTopic: "Testing & Quality Assurance",
        subtopics: ["Unit Testing", "Integration Tests", "Test Automation"],
        assignment: "Write comprehensive test suites",
        classTime: "Mon/Wed/Fri – 4:00–5:30 PM EST",
      },
      {
        week: 9,
        mainTopic: "AI in Software Engineering",
        subtopics: ["ML Fundamentals", "AI APIs", "Ethics & Responsible AI"],
        assignment: "Integrate AI features into your application",
        classTime: "Mon/Wed/Fri – 4:00–5:30 PM EST",
      },
      {
        week: 10,
        mainTopic: "DevOps & Deployment",
        subtopics: ["Docker Containers", "CI/CD Pipelines", "Cloud Deployment"],
        assignment: "Deploy full-stack app with Docker",
        classTime: "Mon/Wed/Fri – 4:00–5:30 PM EST",
      },
      {
        week: 11,
        mainTopic: "Performance & Security",
        subtopics: ["Code Optimization", "Security Best Practices", "Monitoring"],
        assignment: "Optimize and secure production application",
        classTime: "Mon/Wed/Fri – 4:00–5:30 PM EST",
      },
      {
        week: 12,
        mainTopic: "Capstone Project & Certification",
        subtopics: ["Final Project Presentation", "Code Review", "Certification"],
        assignment: "Present and deploy capstone project",
        classTime: "Mon/Wed/Fri – 4:00–5:30 PM EST",
      },
    ],
  },
];
