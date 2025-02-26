import type { ResumeData } from "./index";

export const sampleResume: ResumeData = {
  basics: {
    name: "John Doe",
    headline: "Creative and Innovative Web Developer",
    email: "john.doe@gmail.com",
    phone: "(555) 123-4567",
    location: "Pleasantville, CA 94588",
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
  },
  sections: {
    summary: {
      name: "Summary",
      columns: 1,
      separateLinks: true,

      id: "summary",
      content:
        "<p>Innovative Web Developer with 5 years of experience in building impactful and user-friendly websites and applications. Specializes in <strong>front-end technologies</strong> and passionate about modern web standards and cutting-edge development techniques. Proven track record of leading successful projects from concept to deployment.</p>",
    },
    awards: {
      name: "Awards",
      columns: 1,
      separateLinks: true,

      id: "awards",
      items: [],
    },
    certifications: {
      name: "Certifications",
      columns: 1,
      separateLinks: true,

      id: "certifications",
      items: [
        {
          id: "spdhh9rrqi1gvj0yqnbqunlo",

          name: "Full-Stack Web Development",
          issuer: "CodeAcademy",
          date: "2020",
          summary: "",
          url: {
            label: "",
            href: "",
          },
        },
        {
          id: "n838rddyqv47zexn6cxauwqp",

          name: "AWS Certified Developer",
          issuer: "Amazon Web Services",
          date: "2019",
          summary: "",
          url: {
            label: "",
            href: "",
          },
        },
      ],
    },
    education: {
      name: "Education",
      columns: 1,
      separateLinks: true,

      id: "education",
      items: [
        {
          id: "yo3p200zo45c6cdqc6a2vtt3",

          institution: "University of California",
          studyType: "Bachelor's in Computer Science",
          area: "Berkeley, CA",
          score: "",
          date: "August 2012 to May 2016",
          summary: "",
          url: {
            label: "",
            href: "",
          },
        },
      ],
    },
    experience: {
      name: "Experience",
      columns: 1,
      separateLinks: true,

      id: "experience",
      items: [
        {
          id: "lhw25d7gf32wgdfpsktf6e0x",

          company: "Creative Solutions Inc.",
          position: "Senior Web Developer",
          location: "San Francisco, CA",
          date: "January 2019 to Present",
          summary:
            "<ul><li><p>Spearheaded the redesign of the main product website, resulting in a 40% increase in user engagement.</p></li><li><p>Developed and implemented a new responsive framework, improving cross-device compatibility.</p></li><li><p>Mentored a team of four junior developers, fostering a culture of technical excellence.</p></li></ul>",
          url: {
            label: "",
            href: "https://creativesolutions.inc/",
          },
        },
        {
          id: "r6543lil53ntrxmvel53gbtm",

          company: "TechAdvancers",
          position: "Web Developer",
          location: "San Jose, CA",
          date: "June 2016 to December 2018",
          summary:
            "<ul><li><p>Collaborated in a team of 10 to develop high-quality web applications using React.js and Node.js.</p></li><li><p>Managed the integration of third-party services such as Stripe for payments and Twilio for SMS services.</p></li><li><p>Optimized application performance, achieving a 30% reduction in load times.</p></li></ul>",
          url: {
            label: "",
            href: "https://techadvancers.com/",
          },
        },
      ],
    },
    volunteer: {
      name: "Volunteering",
      columns: 1,
      separateLinks: true,

      id: "volunteer",
      items: [],
    },
    interests: {
      name: "Interests",
      columns: 1,
      separateLinks: true,

      id: "interests",
      items: [],
    },
    languages: {
      name: "Languages",
      columns: 1,
      separateLinks: true,

      id: "languages",
      items: [],
    },
    profiles: {
      name: "Profiles",
      columns: 1,
      separateLinks: true,

      id: "profiles",
      items: [
        {
          id: "cnbk5f0aeqvhx69ebk7hktwd",

          network: "LinkedIn",
          username: "johndoe",
          icon: "linkedin",
          url: {
            label: "",
            href: "https://linkedin.com/in/johndoe",
          },
        },
        {
          id: "ukl0uecvzkgm27mlye0wazlb",

          network: "GitHub",
          username: "johndoe",
          icon: "github",
          url: {
            label: "",
            href: "https://github.com/johndoe",
          },
        },
      ],
    },
    projects: {
      name: "Projects",
      columns: 1,
      separateLinks: true,

      id: "projects",
      items: [
        {
          id: "yw843emozcth8s1ubi1ubvlf",

          name: "E-Commerce Platform",
          description: "Project Lead",
          date: "",
          summary:
            "<p>Led the development of a full-stack e-commerce platform, improving sales conversion by 25%.</p>",
          keywords: [],
          url: {
            label: "",
            href: "",
          },
        },
        {
          id: "ncxgdjjky54gh59iz2t1xi1v",

          name: "Interactive Dashboard",
          description: "Frontend Developer",
          date: "",
          summary:
            "<p>Created an interactive analytics dashboard for a SaaS application, enhancing data visualization for clients.</p>",
          keywords: [],
          url: {
            label: "",
            href: "",
          },
        },
      ],
    },
    publications: {
      name: "Publications",
      columns: 1,
      separateLinks: true,

      id: "publications",
      items: [],
    },
    references: {
      name: "References",
      columns: 1,
      separateLinks: true,

      id: "references",
      items: [
        {
          id: "f2sv5z0cce6ztjl87yuk8fak",

          name: "Available upon request",
          description: "",
          summary: "",
          url: {
            label: "",
            href: "",
          },
        },
      ],
    },
    skills: {
      name: "Skills",
      columns: 1,
      separateLinks: true,

      id: "skills",
      items: [
        {
          id: "hn0keriukh6c0ojktl9gsgjm",

          name: "Web Technologies",
          description: "Advanced",
          level: 0,
          keywords: ["HTML5", "JavaScript", "PHP", "Python"],
        },
        {
          id: "r8c3y47vykausqrgmzwg5pur",

          name: "Web Frameworks",
          description: "Intermediate",
          level: 0,
          keywords: ["React.js", "Angular", "Vue.js", "Laravel", "Django"],
        },
        {
          id: "b5l75aseexqv17quvqgh73fe",

          name: "Tools",
          description: "Intermediate",
          level: 0,
          keywords: ["Webpack", "Git", "Jenkins", "Docker", "JIRA"],
        },
      ],
    },
    custom: {},
  },
  metadata: {
    template: "glalie",
    layout: [
      [
        ["summary", "experience", "education", "projects", "references"],
        [
          "profiles",
          "skills",
          "certifications",
          "interests",
          "languages",
          "awards",
          "volunteer",
          "publications",
        ],
      ],
    ],
    css: {
      value: "* {\n\toutline: 1px solid #000;\n\toutline-offset: 4px;\n}",
    },
    page: {
      margin: 14,
      format: "a4",
      options: {
        breakLine: true,
        pageNumbers: true,
      },
    },
    theme: {
      background: "#ffffff",
      text: "#000000",
      primary: "#ca8a04",
    },
    typography: {
      font: {
        family: "Merriweather",
        subset: "latin",
        variants: ["regular"],
        size: 13,
      },
      lineHeight: 1.75,
      hideIcons: false,
      underlineLinks: true,
    },
    notes: "",
  },
};
