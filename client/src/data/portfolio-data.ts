import { Skill, Project, Experience } from "@/types";

export const skills: Skill[] = [
  {
    name: "Languages",
    icon: "fas fa-code",
    description: "C++, Java, Python, SQL, HTML, CSS, JavaScript",
    category: "languages",
  },
  {
    name: "Tools & Platforms",
    icon: "fas fa-tools",
    description: "AWS, MySQL, Power BI, MS Excel",
    category: "tools",
  },
  {
    name: "Libraries",
    icon: "fas fa-layer-group",
    description: "NumPy, Pandas, Matplotlib, Seaborn, Scikit-learn",
    category: "libraries",
  },
  {
    name: "ML & AI",
    icon: "fas fa-brain",
    description:
      "EDA, Supervised & Unsupervised Learning, Time Series Forecasting",
    category: "ml-ai",
  },
  {
    name: "Development",
    icon: "fas fa-laptop-code",
    description: "VS Code, Jupyter Notebook, Git, GitHub, Cursor IDE",
    category: "development",
  },
  {
    name: "Soft Skills",
    icon: "fas fa-user-friends",
    description: "Communication, Problem-Solving, Adaptability",
    category: "soft-skills",
  },
];

export const projects: Project[] = [
  {
    id: 1,
    title: "UPI Fraud Detection",
    description:
      "Built a UPI fraud detection system using ML models to identify suspicious transactions. Engineered features and trained Logistic Regression, Decision Trees, Random Forest, and XGBoost for accuracy.Optimized models based on precision, recall, and F1-score for better fraud detection.  Developed a Flask web app for real-time fraud detection with a user-friendly interface.",
    details:
      "Engineered features and trained Logistic Regression, Decision Trees, Random Forest, and XGBoost for accuracy. Optimized models based on precision, recall, and F1-score for better fraud detection. Developed a Flask web app for real-time fraud detection with a user-friendly interface.",
    technologies: ["Python", "ML", "Flask", "Sklearn"],
    year: "2025",
    github: "https://github.com/annnkumar/UPI_TRASANCTION_DETECTION",

    image: "/src/assets/featured-projects.png",
    color: "secondary",
  },
  {
    id: 2,
    title: "Electric Billing System",
    description:
      "Developed a desktop-based electric billing system to manage consumer electricity usage and automate bill generation. Implemented user authentication, bill calculation algorithms, and database integration for storing customer records and consumption history. Implemented user authentication, bill calculation algorithms, and database integration for storing customer records and consumption history.",
    details:
      "Implemented user authentication, bill calculation algorithms, and database integration for storing customer records and consumption history.",
    technologies: ["Java", "SQL", "Swing", "JDBC"],
    year: "2024",
    github: "https://github.com/annnkumar/Electric_billing_system",
    color: "primary",
  },
  {
    id: 3,
    title: "Forest Weather Index Prediction",
    description:
      "Performed comprehensive data collection, EDA, and feature engineering to prepare forest weather data for predictive modeling. Implemented regression models to predict Forest Weather Index (FWI) and developed a Flask web application for real-time predictions.",

    details:
      "Implemented regression models to predict Forest Weather Index (FWI) and developed a Flask web application for real-time predictions.",
    technologies: ["Python", "ML", "Flask"],
    year: "2024",
    github: "https://github.com/annnkumar/FOREST-FIRE-PREDICTION",
    color: "accent",
  },
];

export const experiences: Experience[] = [
  {
    id: 1,
    title: "Cloud Virtual Internship",
    organization: "AICTE EduSkills Virtual Internship",
    description: "Curriculum by AWS Academy",
    period: "Oct 2024 - Dec 2024",
    position: "left",
    color: "primary",
  },
  {
    id: 2,
    title: "Business Analyst Certification",
    organization: "University of Colorado",
    description: "Coursera",
    period: "Jan 2025",
    position: "right",
    color: "secondary",
  },
  {
    id: 3,
    title: "Hackathon Achievement",
    organization: "Third Place",
    description: "GFG KIIT Chapter",
    period: "Jan 2024",
    position: "left",
    color: "accent",
  },
  {
    id: 4,
    title: "100 Days Badge of DSA Challenge",
    organization: "Leetcode",
    description: "Consistent Problem Solving",
    period: "Dec 2024",
    position: "right",
    color: "primary",
  },
];

export const aboutMeContent = {
  bio: `I'm a Computer Science student at Kalinga Institute of Industrial Technology, passionate about developing innovative solutions through code.
  
  My technical journey spans data science, AI, and software development, with a strong foundation in C++, Java, Python, and web technologies.
  
  I enjoy tackling complex problems and creating data-driven solutions that make a meaningful impact.`,
  facts: [
    {
      icon: "fas fa-graduation-cap",
      title: "B.Tech. in Computer Science",
      description: "KIIT, Bhubaneswar (8.38 CGPA)",
    },
    {
      icon: "fas fa-code",
      title: "Technical Interests",
      description: "Data Science, AI, Web Development",
    },
    {
      icon: "fas fa-briefcase",
      title: "Cloud Virtual Internship",
      description: "AICTE EduSkills (AWS Academy)",
    },
    {
      icon: "fas fa-trophy",
      title: "Hackathon Achievement",
      description: "Third Place, GFG KIIT Chapter",
    },
  ],
};

export const personalInfo = {
  name: "Ankit Kumar",
  email: "initankit.cpp@gmail.com",
  phone: "+91 9631 727 009",
  location: "Bhubaneswar, Odisha, India",
  taglines: [
    "Software Developer",
    "Data Science Enthusiast",
    "Problem Solver",
    "AI Explorer",
  ],
  bio: "Passionate about data, AI, and problem-solving, with a strong focus on innovation.",
  socials: {
    github: "https://github.com/annnkumar",
    linkedin: "http://www.linkedin.com/in/ankitkumar2732",
    twitter: "#",
  },
};
