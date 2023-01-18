import { Resume } from '../entities/resume.entity';

const sampleData: Partial<Resume> = {
  basics: {
    name: 'Alexis Jones',
    email: 'alexis.jones@gmail.com',
    phone: '+1 800 1200 3820',
    birthdate: '1995-08-06',
    photo: {
      url: `https://i.imgur.com/O7iT9ke.jpg`,
      filters: {
        size: 128,
        shape: 'rounded-square',
        grayscale: false,
        border: false,
      },
      visible: true,
    },
    summary:
      'I am a creative frontend developer offering 4+ years of experience providing high-impact web solutions for diverse industry organizations. Skilled in designing, developing and testing multiple web-based applications incorporating a range of technologies. Aspiring to combine broad background with strong technical skills to excel as a frontend web developer.',
    website: 'alexisjones.com',
    headline: 'Highly Creative Frontend Web Developer',
    location: {
      city: 'Stuttgart',
      region: 'Baden-Württemberg',
      address: 'Ollenhauer Str. 51',
      country: 'Germany',
      postalCode: '70376',
    },
    profiles: [
      {
        id: '4df61ffc-e48b-43f1-9434-add35d9cb155',
        url: 'https://linkedin.com/in/AlexisJones',
        network: 'LinkedIn',
        username: 'AlexisJones',
      },
      {
        id: '8f77327d-4484-40b4-92eb-65eaa6aae5f4',
        url: 'https://dribbble.com/AlexisJones',
        network: 'Dribbble',
        username: 'AlexisJones',
      },
    ],
  },
  sections: {
    work: {
      id: 'work',
      name: 'Work Experience',
      type: 'basic',
      items: [
        {
          id: 'fe280c61-9d92-4dba-8a08-274866470096',
          url: 'https://www.espritcam.com',
          date: {
            end: '',
            start: '2015-09-01',
          },
          name: 'DP Technology Corp.',
          summary:
            '- Manage website development projects from initial design through completion, optimizing all cross-browser and multi-platform compatibility.\n- Work closely with programmers and clients to meet project requirements, goals, and desired functionality.\n- Develop and integrate customized themes into WordPress, PHP-Fusion, and Concrete5.\nConduct training for clients on handling website content management systems.\n- Enable site-wide promotions by programming HTML5 canvases to animate particles on web backgrounds.',
          position: 'Frontend Developer, Stuttgart DE',
        },
        {
          id: '285d78f8-df56-4569-ba6b-cff5ebe5381e',
          url: 'https://www.vokophone.com',
          date: {
            end: '2015-07-31',
            start: '2011-05-31',
          },
          name: 'Voko Communications',
          summary:
            '- Developed websites from front to backend using PHP, JavaScript, and HTML.\n- Enhanced user experience and accomplish webpage objectives by creating site structure, navigation, page optimization, and graphics integration.\n- Implemented enhancements that improved web functionality and responsiveness.\n- Designed and maintained both corporate and client websites, using scripting languages and content management systems including WordPress.',
          position: 'Frontend Developer',
        },
      ],
      columns: 1,
      visible: true,
    },
    awards: {
      id: 'awards',
      name: 'Awards',
      type: 'basic',
      items: [
        {
          title: 'Blitz Hackathon',
          awarder: '2nd Place',
          date: '2018-03-31',
          url: '',
          summary: '',
          id: '657cadb0-c07d-4a35-8351-9079598c7ac0',
        },
        {
          title: 'Carl-Zeiss Hackathon',
          awarder: '2nd Place',
          date: '2017-05-09',
          url: '',
          summary: '',
          id: 'db3bc5cb-483e-4221-9867-9c28ee5f2051',
        },
        {
          title: 'JP Morgan Chase - Code for Good',
          awarder: '3rd Place',
          date: '2018-03-12T23:00:00.000Z',
          url: '',
          summary: '',
          id: '31eb2547-4175-494f-a16a-0891aea483b7',
        },
      ],
      columns: 3,
      visible: true,
    },
    skills: {
      id: 'skills',
      name: 'Skills',
      type: 'basic',
      items: [
        {
          id: 'e27660b2-2b0f-48b0-9b04-3597f0282d06',
          name: 'Frontend Web Development',
          level: 'Expert',
          keywords: ['ReactJS', 'HTML/CSS', 'jQuery', 'PHP'],
          levelNum: 10,
        },
        {
          name: 'Backend Development',
          level: 'Novice',
          levelNum: 8,
          keywords: ['NodeJS', 'Springboot', 'Python/Flask', 'Postman'],
          id: '2f98e07e-21f7-4b40-81e3-4cf529d43339',
        },
        {
          id: 'bf4253f2-7829-432c-a1d5-07446e7ae873',
          name: 'Adobe Creative Cloud',
          level: 'Novice',
          keywords: ['Photoshop', 'Illustrator', 'InDesign', 'Fireworks'],
          levelNum: 8,
        },
        {
          id: '0b4a6206-7a2b-47a4-b71d-59c24ceee219',
          name: 'Content Management Systems',
          level: 'Intermediate',
          keywords: ['Wordpress', 'Joomla', 'Mailchimp'],
          levelNum: 6,
        },
      ],
      columns: 2,
      visible: true,
    },
    projects: {
      id: 'projects',
      name: 'Projects',
      type: 'basic',
      items: [
        {
          name: 'Fintech News Inc.',
          description: 'Backend Developer',
          date: {
            start: '2020-01-01T17:14:14.000Z',
            end: '2020-04-01T16:14:20.000Z',
          },
          url: '',
          summary:
            '- Created a content management system serving as a client interface that reduced download times by 30%.\n- Developed new admin panel, which improved internal operating efficiency by over 40%.\n- Created comprehensive testing regime using RSpec to ensure bug-free code.\n- Rebuilt entire website with up to date technologies and frameworks.',
          keywords: ['Python', 'PHP', 'Ruby', 'Javascript'],
          id: '8c12add5-605a-449f-a8a6-e7625c702e60',
        },
        {
          name: 'Systron Solutions, San Francisco, CA',
          description: 'Inside Sales Associate',
          date: {
            start: '2020-01-01T17:14:14.000Z',
            end: '2020-04-01T16:14:20.000Z',
          },
          url: '',
          summary:
            '- Performed an average of 90+ cold calls daily creating three new qualified prospects exceeding company average by 10%.\n- Managed a $1 million pipeline that supported the creation of 50 new accounts.\n- Sold SaaS and Cloud offering to key accounts including California State University, Ace Athetics and BMI, succeeding in reducing back-up time by 50%.\n\n**Key Projects:** Worked with IT team to create a new web-based leads-generating system, resulting in closed sales increasing by 18% contributing to a $1.5 million increase in profits.',
          keywords: ['Sales & Marketing', 'Chain Management'],
          id: 'ec58bb49-a6b1-49ed-9ff6-860a44663ed7',
        },
      ],
      columns: 1,
      visible: true,
    },
    education: {
      id: 'education',
      name: 'Education',
      type: 'basic',
      items: [
        {
          id: '3f0eded8-ee1f-4c0e-b4a7-7a0811c150db',
          url: 'https://www.greenriver.edu',
          area: 'Computer Science',
          date: {
            end: '',
            start: '2011-01-04T23:00:00.000Z',
          },
          score: 'Honors: cum laude (GPA: 3.6/4.0)',
          degree: 'Bachelor of Science',
          courses: ['Data Structures and Algorithms', 'Logic Design'],
          summary: '',
          institution: 'Green River College',
        },
        {
          id: 'e4977e01-25bf-4524-95c4-20c77c3cf700',
          url: 'https://www.lsu.edu',
          area: 'English Literature',
          date: {
            end: '2010-12-31T23:00:00.000Z',
            start: '2008-01-31T23:00:00.000Z',
          },
          score: 'Baton Rouge, LA',
          degree: 'Bachelor of Arts',
          courses: ['Copywriting', 'Product Analysis'],
          summary: '',
          institution: 'Louisiana State University',
        },
      ],
      columns: 2,
      visible: true,
    },
    interests: {
      id: 'interests',
      name: 'Interests',
      type: 'basic',
      items: [
        {
          name: 'Video Games',
          keywords: ['FIFA', 'Age of Empires'],
          id: 'ddebb0e1-0a49-4ca6-be8a-956f10f62307',
        },
        {
          name: 'Football',
          keywords: ['Manchester United', 'Los Angeles Rams'],
          id: '2df59b01-8dde-40d5-b3da-f5f5e698e8fa',
        },
        {
          name: 'Mindfulness',
          keywords: ['Yoga/Meditation', 'Hiking'],
          id: 'dc1bb429-1baf-4a0c-80ba-4d7a24f66e52',
        },
        {
          name: 'Artificial Intelligence',
          keywords: ['Machine Learning', 'GPT-3'],
          id: '9939e616-9f03-4ec0-bb8e-25183925c7fc',
        },
      ],
      columns: 2,
      visible: true,
    },
    languages: {
      id: 'languages',
      name: 'Languages',
      type: 'basic',
      items: [
        {
          name: 'English',
          level: 'Native',
          levelNum: 10,
          id: 'dd9eb2b8-2956-463b-b0b1-0ffef84f9fc2',
        },
        {
          name: 'German',
          level: 'B1 (Intermediate)',
          levelNum: 6,
          id: '6cf99d85-4efc-4ff8-9a7f-e76abd2d2857',
        },
      ],
      columns: 2,
      visible: true,
    },
    volunteer: {
      id: 'volunteer',
      name: 'Volunteer Experience',
      type: 'basic',
      items: [],
      columns: 2,
      visible: true,
    },
    references: {
      id: 'references',
      name: 'References',
      type: 'basic',
      items: [
        {
          name: 'Cindy J. Helmer',
          relationship: 'CEO/Founder, Copy.ai',
          phone: '916-609-9531',
          email: 'cindyjh@joupide.com',
          summary:
            'Lorem ipsum dolor sit amet, **consectetur adipiscing elit.** Nam scelerisque ac metus sit amet tempor. Sed luctus dui fermentum aliquet dapibus.',
          id: '5a114a83-b62c-4b90-a0ef-1ab5516dc0dd',
        },
        {
          name: 'Keisha Whaley',
          relationship: 'Solutions Architect, AWS',
          phone: '978-584-6675',
          email: 'keishawhaley@aws.de',
          summary:
            'Morbi a elit semper arcu tempor porta. _Sed tristique eu turpis vitae ultrices._ ~Nullam nec quam~ ac diam eleifend fringilla. Sed congue magna at ante bibendum posuere.',
          id: 'd866c929-4132-4dab-81c3-8dfcb33f5c0a',
        },
      ],
      columns: 2,
      visible: true,
    },
    publications: {
      id: 'publications',
      name: 'Publications',
      type: 'basic',
      items: [],
      columns: 2,
      visible: true,
    },
    certifications: {
      id: 'certifications',
      name: 'Certifications',
      type: 'basic',
      items: [
        {
          name: 'Web Applications for Everbody',
          issuer: 'Coursera',
          date: '',
          url: 'https://www.coursera.org/',
          summary: '',
          id: '75b87dcb-56ef-498d-bd26-a7d646bec914',
        },
        {
          name: 'Full-Stack Web Development with Stack',
          issuer: 'Coursera',
          date: '',
          url: 'https://www.coursera.org/',
          summary: '',
          id: 'd1057a6c-c2b2-436f-9166-9e17ae591e71',
        },
        {
          name: 'Critical Thinking Masterclass',
          issuer: 'Khan Academy',
          date: '',
          url: 'https://www.khanacademy.org/',
          summary: '',
          id: '44fc2443-b6fc-4c39-8e29-55884cb2b8d0',
        },
        {
          name: 'Web Development Bootcamp',
          issuer: 'Udemy',
          date: '',
          url: 'https://udemy.com/',
          summary: '',
          id: '7308d2bc-0bb8-4f53-991a-e17506f5e6a1',
        },
      ],
      columns: 2,
      visible: true,
    },
    '2d47a563-d0a0-4275-af18-fea3ba6b57b4': {
      name: 'Soft Skills',
      type: 'custom',
      items: [
        {
          id: 'bcd19f25-b015-4532-b555-dbcc6f556661',
          url: '',
          date: {
            end: '',
            start: '',
          },
          level: '',
          title: 'Leadership',
          summary: '',
          keywords: ['Collaboration', 'Communication'],
          levelNum: 8,
          subtitle: '',
        },
        {
          id: 'e6fde8df-dcc8-4481-b872-2c298e7a3bbf',
          url: '',
          date: {
            end: '',
            start: '',
          },
          level: '',
          title: 'Creativity',
          summary: '',
          keywords: ['Critical Thinking', 'Visual Thinking'],
          levelNum: 8,
          subtitle: '',
        },
        {
          id: '888db537-bed2-4d4d-901b-2c7f905f0464',
          url: '',
          date: {
            end: '',
            start: '',
          },
          level: '',
          title: 'Problem Solving',
          summary: '',
          keywords: ['Algorithms', 'Data Structures'],
          levelNum: 6,
          subtitle: '',
        },
        {
          id: '74b9984e-4f0f-4db3-bdc8-fddb647b8df8',
          url: '',
          date: {
            end: '',
            start: '',
          },
          level: '',
          title: 'Organization Skills',
          summary: '',
          keywords: ['Enthusiasm', 'Work Ethic', 'Supervision'],
          levelNum: 6,
          subtitle: '',
        },
      ],
      columns: 4,
      visible: true,
    },
  },
  metadata: {
    css: {
      value: '/* Enter custom CSS here */\n\n* {\n    outline: 1px solid #000;\n}',
      visible: false,
    },
    locale: 'en',
    date: {
      format: 'MMMM DD, YYYY',
    },
    theme: {
      text: '#000000',
      primary: '#1682cf',
      background: '#ffffff',
    },
    layout: [
      [
        ['work', 'education'],
        ['publications', 'volunteer'],
      ],
      [
        ['skills', '2d47a563-d0a0-4275-af18-fea3ba6b57b4', 'awards'],
        ['certifications', 'interests', 'languages'],
      ],
      [['projects'], ['references']],
    ],
    template: 'kakuna',
    typography: {
      size: {
        body: 14,
        heading: 28,
      },
      family: {
        body: 'Open Sans',
        heading: 'Open Sans',
      },
    },
  },
  public: true,
};

export default sampleData;
