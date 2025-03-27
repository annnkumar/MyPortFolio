export interface Skill {
  name: string;
  icon: string;
  description: string;
  category: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  details: string;
  technologies: string[];
  year: string;
  github?: string;
  liveLink?: string;
  image?: string;
  color: "primary" | "secondary" | "accent";
}

export interface Experience {
  id: number;
  title: string;
  organization: string;
  description: string;
  period: string;
  position: "left" | "right";
  color: "primary" | "secondary" | "accent";
}
