import { PortfolioData } from ".";

export const samplePortfolio: PortfolioData = {
  basics: {
    name: "John Doe",
    tagline: "Creative Developer & Designer",
    email: "john.doe@gmail.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
    url: {
      label: "",
      href: "https://johndoe.me/",
    },
    customFields: [],
    picture: {
      url: "https://i.imgur.com/HgwyOuJ.jpg",
      size: 120,
      aspectRatio: 1,
      borderRadius: 0,
      effects: {
        hidden: false,
        border: false,
        grayscale: false,
      },
    },
    banner: {
      url: "https://i.imgur.com/banner.jpg",
      effects: {
        hidden: false,
        grayscale: false,
        parallax: true,
      },
    },
    about: "<p>Creative developer with 5+ years of experience in building impactful digital experiences. Passionate about creating beautiful, functional, and user-friendly websites and applications. Specializing in modern web technologies and design systems.</p>",
  },
  sections: {
    about: {
      id: "about",
      name: "About",
      columns: 1,
      visible: true,
      fullWidth: true,
      content: "<p>I am a full-stack developer with a passion for building beautiful, functional, and user-friendly applications. With over 5 years of experience in web development, I have worked on various projects ranging from small business websites to large-scale enterprise applications.</p><p>My expertise includes front-end development with React, Vue, and Angular, as well as back-end development with Node.js and Python. I am also experienced in database design, API development, and cloud infrastructure.</p>",
    },
    showcase: {
      id: "showcase",
      name: "Featured Projects",
      columns: 2,
      visible: true,
      fullWidth: false,
      items: [
        {
          id: "project1",
          visible: true,
          title: "E-Commerce Platform",
          description: "A full-stack e-commerce solution built with React and Node.js",
          type: "website",
          thumbnail: "https://i.imgur.com/thumbnail1.jpg",
          images: [
            "https://i.imgur.com/image1.jpg",
            "https://i.imgur.com/image2.jpg",
            "https://i.imgur.com/image3.jpg"
          ],
          technologies: ["React", "Node.js", "MongoDB", "AWS"],
          date: "2023",
          url: {
            label: "View Project",
            href: "https://project1.com",
          },
        },
        {
          id: "project2",
          visible: true,
          title: "Social Media Dashboard",
          description: "Real-time analytics dashboard for social media management",
          type: "website",
          thumbnail: "https://i.imgur.com/thumbnail2.jpg",
          images: [
            "https://i.imgur.com/image4.jpg",
            "https://i.imgur.com/image5.jpg"
          ],
          technologies: ["Vue.js", "Firebase", "D3.js"],
          date: "2022",
          url: {
            label: "View Dashboard",
            href: "https://project2.com",
          },
        },
      ],
    },
    skillset: {
      id: "skillset",
      name: "Skills & Expertise",
      columns: 3,
      visible: true,
      fullWidth: false,
      items: [
        {
          id: "skill1",
          visible: true,
          name: "Frontend Development",
          description: "Building responsive web applications",
          level: 5,
          keywords: ["React", "Vue", "Angular", "TypeScript", "Tailwind CSS"],
        },
        {
          id: "skill2",
          visible: true,
          name: "Backend Development",
          description: "Server-side applications and APIs",
          level: 4,
          keywords: ["Node.js", "Python", "PostgreSQL", "REST APIs", "GraphQL"],
        },
        {
          id: "skill3",
          visible: true,
          name: "DevOps & Cloud",
          description: "Cloud infrastructure and deployment",
          level: 4,
          keywords: ["AWS", "Docker", "CI/CD", "Kubernetes"],
        },
      ],
    },
    custom: {},
  },
  metadata: {
    template: "minimal",
    layout: [[["about"], ["showcase", "skillset"]]],
    navigation: {
      style: "fixed",
      transparent: true,
      showOnScroll: true,
    },
    theme: {
      background: "#ffffff",
      text: "#000000",
      primary: "#0066cc",
    },
    typography: {
      font: {
        family: "Inter",
        subset: "latin",
        variants: ["regular", "medium", "bold"],
        size: 16,
      },
      lineHeight: 1.6,
      hideIcons: false,
      underlineLinks: true,
    },
    css: {
      value: "",
      visible: false,
    },
    page: {
      margin: 18,
      format: "a4",
      options: {
        breakLine: true,
        pageNumbers: false,
      },
    },
    notes: "",
  },
};
