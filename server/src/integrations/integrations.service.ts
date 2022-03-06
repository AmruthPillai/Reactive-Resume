import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  Award,
  Certificate,
  Education,
  Interest,
  Language,
  Project,
  Publication,
  Reference,
  Resume,
  Skill,
  Volunteer,
  WorkExperience,
} from '@reactive-resume/schema';
import csv from 'csvtojson';
import dayjs from 'dayjs';
import { readFile, unlink } from 'fs/promises';
import { cloneDeep, get, isEmpty, merge } from 'lodash';
import StreamZip from 'node-stream-zip';
import { DeepPartial } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { FILENAME_TIMESTAMP } from '@/constants/index';
import defaultState from '@/resume/data/defaultState';
import { Resume as ResumeEntity } from '@/resume/entities/resume.entity';
import { ResumeService } from '@/resume/resume.service';

@Injectable()
export class IntegrationsService {
  constructor(private resumeService: ResumeService) {}

  async linkedIn(userId: number, path: string): Promise<ResumeEntity> {
    let archive: StreamZip.StreamZipAsync;

    try {
      archive = new StreamZip.async({ file: path });

      const resume: Partial<Resume> = cloneDeep(defaultState);

      // Basics
      const timestamp = dayjs().format(FILENAME_TIMESTAMP);
      merge<Partial<Resume>, DeepPartial<Resume>>(resume, {
        name: `Imported from LinkedIn (${timestamp})`,
        slug: `imported-from-linkedin-${timestamp}`,
      });

      // Profile
      try {
        const profileCSV = (await archive.entryData('Profile.csv')).toString();
        const profile = (await csv().fromString(profileCSV))[0];
        merge<Partial<Resume>, DeepPartial<Resume>>(resume, {
          basics: {
            name: `${get(profile, 'First Name')} ${get(profile, 'Last Name')}`,
            headline: get(profile, 'Headline'),
            location: {
              address: get(profile, 'Address'),
              postalCode: get(profile, 'Zip Code'),
            },
            summary: get(profile, 'Summary'),
          },
        });
      } catch {
        // pass through
      }

      // Email
      try {
        const emailsCSV = (await archive.entryData('Email Addresses.csv')).toString();
        const email = (await csv().fromString(emailsCSV))[0];
        merge<Partial<Resume>, DeepPartial<Resume>>(resume, {
          basics: {
            email: get(email, 'Email Address'),
          },
        });
      } catch {
        // pass through
      }

      // Phone Number
      try {
        const phoneNumbersCSV = (await archive.entryData('PhoneNumbers.csv')).toString();
        const phoneNumber = (await csv().fromString(phoneNumbersCSV))[0];
        merge<Partial<Resume>, DeepPartial<Resume>>(resume, {
          basics: {
            phone: get(phoneNumber, 'Number'),
          },
        });
      } catch {
        // pass through
      }

      // Education
      try {
        const educationCSV = (await archive.entryData('Education.csv')).toString();
        const education = await csv().fromString(educationCSV);
        education.forEach((school) => {
          merge<Partial<Resume>, DeepPartial<Resume>>(resume, {
            sections: {
              education: {
                items: [
                  ...get(resume, 'sections.education.items', []),
                  {
                    id: uuidv4(),
                    institution: get(school, 'School Name'),
                    degree: get(school, 'Degree Name'),
                    date: {
                      start: dayjs(get(school, 'Start Date')).toISOString(),
                      end: dayjs(get(school, 'End Date')).toISOString(),
                    },
                  } as Education,
                ],
              },
            },
          });
        });
      } catch {
        // pass through
      }

      // Positions
      try {
        const positionsCSV = (await archive.entryData('Positions.csv')).toString();
        const positions = await csv().fromString(positionsCSV);
        positions.forEach((position) => {
          merge<Partial<Resume>, DeepPartial<Resume>>(resume, {
            sections: {
              work: {
                items: [
                  ...get(resume, 'sections.work.items', []),
                  {
                    id: uuidv4(),
                    name: get(position, 'Company Name'),
                    position: get(position, 'Title'),
                    summary: get(position, 'Description'),
                    date: {
                      start: dayjs(get(position, 'Started On')).toISOString(),
                      end: dayjs(get(position, 'Finished On')).toISOString(),
                    },
                  } as WorkExperience,
                ],
              },
            },
          });
        });
      } catch {
        // pass through
      }

      // Certifications
      try {
        const certificationsCSV = (await archive.entryData('Certifications.csv')).toString();
        const certifications = await csv().fromString(certificationsCSV);
        certifications.forEach((certification) => {
          merge<Partial<Resume>, DeepPartial<Resume>>(resume, {
            sections: {
              certifications: {
                items: [
                  ...get(resume, 'sections.certifications.items', []),
                  {
                    id: uuidv4(),
                    name: get(certification, 'Name'),
                    issuer: get(certification, 'Authority'),
                    url: get(certification, 'Url'),
                    date: dayjs(get(certification, 'Started On')).toISOString(),
                  } as Certificate,
                ],
              },
            },
          });
        });
      } catch {
        // pass through
      }

      // Languages
      try {
        const languagesCSV = (await archive.entryData('Languages.csv')).toString();
        const languages = await csv().fromString(languagesCSV);
        languages.forEach((language) => {
          merge<Partial<Resume>, DeepPartial<Resume>>(resume, {
            sections: {
              languages: {
                items: [
                  ...get(resume, 'sections.languages.items', []),
                  {
                    id: uuidv4(),
                    name: get(language, 'Name'),
                    level: 'Beginner',
                    levelNum: 5,
                  } as Language,
                ],
              },
            },
          });
        });
      } catch {
        // pass through
      }

      // Projects
      try {
        const projectsCSV = (await archive.entryData('Projects.csv')).toString();
        const projects = await csv().fromString(projectsCSV);
        projects.forEach((project) => {
          merge<Partial<Resume>, DeepPartial<Resume>>(resume, {
            sections: {
              projects: {
                items: [
                  ...get(resume, 'sections.projects.items', []),
                  {
                    id: uuidv4(),
                    name: get(project, 'Title'),
                    description: get(project, 'Description'),
                    url: get(project, 'Url'),
                    date: {
                      start: dayjs(get(project, 'Started On')).toISOString(),
                      end: dayjs(get(project, 'Finished On')).toISOString(),
                    },
                  } as Project,
                ],
              },
            },
          });
        });
      } catch {
        // pass through
      }

      // Skills
      try {
        const skillsCSV = (await archive.entryData('Skills.csv')).toString();
        const skills = await csv().fromString(skillsCSV);
        skills.forEach((skill) => {
          merge<Partial<Resume>, DeepPartial<Resume>>(resume, {
            sections: {
              skills: {
                items: [
                  ...get(resume, 'sections.skills.items', []),
                  {
                    id: uuidv4(),
                    name: get(skill, 'Name'),
                    level: 'Beginner',
                    levelNum: 5,
                  } as Skill,
                ],
              },
            },
          });
        });
      } catch {
        // pass through
      }

      return this.resumeService.import(resume, userId);
    } catch {
      throw new HttpException('You must upload a valid zip archive downloaded from LinkedIn.', HttpStatus.BAD_REQUEST);
    } finally {
      await unlink(path);
      !isEmpty(archive) && archive.close();
    }
  }

  async jsonResume(userId: number, path: string) {
    try {
      const jsonResume = JSON.parse(await readFile(path, 'utf8'));

      const resume: Partial<Resume> = cloneDeep(defaultState);

      // Metadata
      const timestamp = dayjs().format(FILENAME_TIMESTAMP);
      merge<Partial<Resume>, DeepPartial<Resume>>(resume, {
        name: `Imported from JSON Resume (${timestamp})`,
        slug: `imported-from-json-resume-${timestamp}`,
      });

      // Basics
      try {
        merge<Partial<Resume>, DeepPartial<Resume>>(resume, {
          basics: {
            name: get(jsonResume, 'basics.name'),
            headline: get(jsonResume, 'basics.label'),
            photo: {
              url: get(jsonResume, 'basics.image'),
            },
            email: get(jsonResume, 'basics.email'),
            phone: get(jsonResume, 'basics.phone'),
            website: get(jsonResume, 'basics.url'),
            summary: get(jsonResume, 'basics.summary'),
            location: {
              address: get(jsonResume, 'basics.location.address'),
              postalCode: get(jsonResume, 'basics.location.postalCode'),
              city: get(jsonResume, 'basics.location.city'),
              country: get(jsonResume, 'basics.location.countryCode'),
              region: get(jsonResume, 'basics.location.region'),
            },
          },
        });
      } catch {
        // pass through
      }

      // Profiles
      try {
        const profiles: any[] = get(jsonResume, 'basics.profiles', []);
        profiles.forEach((profile) => {
          merge<Partial<Resume>, DeepPartial<Resume>>(resume, {
            basics: {
              profiles: [
                ...resume.basics.profiles,
                {
                  id: uuidv4(),
                  url: get(profile, 'url'),
                  network: get(profile, 'network'),
                  username: get(profile, 'username'),
                },
              ],
            },
          });
        });
      } catch {
        // pass through
      }

      // Work
      try {
        const work: any[] = get(jsonResume, 'work', []);
        work.forEach((item) => {
          merge<Partial<Resume>, DeepPartial<Resume>>(resume, {
            sections: {
              work: {
                items: [
                  ...get(resume, 'sections.work.items', []),
                  {
                    id: uuidv4(),
                    name: get(item, 'name'),
                    position: get(item, 'position'),
                    summary: get(item, 'summary'),
                    url: get(item, 'url'),
                    date: {
                      start: dayjs(get(item, 'startDate')).toISOString(),
                      end: dayjs(get(item, 'endDate')).toISOString(),
                    },
                  } as WorkExperience,
                ],
              },
            },
          });
        });
      } catch {
        // pass through
      }

      // Volunteer
      try {
        const volunteer: any[] = get(jsonResume, 'volunteer', []);
        volunteer.forEach((item) => {
          merge<Partial<Resume>, DeepPartial<Resume>>(resume, {
            sections: {
              volunteer: {
                items: [
                  ...get(resume, 'sections.volunteer.items', []),
                  {
                    id: uuidv4(),
                    organization: get(item, 'organization'),
                    position: get(item, 'position'),
                    summary: get(item, 'summary'),
                    url: get(item, 'url'),
                    date: {
                      start: dayjs(get(item, 'startDate')).toISOString(),
                      end: dayjs(get(item, 'endDate')).toISOString(),
                    },
                  } as Volunteer,
                ],
              },
            },
          });
        });
      } catch {
        // pass through
      }

      // Education
      try {
        const education: any[] = get(jsonResume, 'education', []);
        education.forEach((item) => {
          merge<Partial<Resume>, DeepPartial<Resume>>(resume, {
            sections: {
              education: {
                items: [
                  ...get(resume, 'sections.education.items', []),
                  {
                    id: uuidv4(),
                    institution: get(item, 'institution'),
                    degree: get(item, 'studyType'),
                    score: get(item, 'score'),
                    area: get(item, 'area'),
                    url: get(item, 'url'),
                    courses: get(item, 'courses', []),
                    date: {
                      start: dayjs(get(item, 'startDate')).toISOString(),
                      end: dayjs(get(item, 'endDate')).toISOString(),
                    },
                  } as Education,
                ],
              },
            },
          });
        });
      } catch {
        // pass through
      }

      // Awards
      try {
        const awards: any[] = get(jsonResume, 'awards', []);
        awards.forEach((award) => {
          merge<Partial<Resume>, DeepPartial<Resume>>(resume, {
            sections: {
              awards: {
                items: [
                  ...get(resume, 'sections.awards.items', []),
                  {
                    id: uuidv4(),
                    title: get(award, 'title'),
                    awarder: get(award, 'awarder'),
                    summary: get(award, 'summary'),
                    url: get(award, 'url'),
                    date: dayjs(get(award, 'date')).toISOString(),
                  } as Award,
                ],
              },
            },
          });
        });
      } catch {
        // pass through
      }

      // Publications
      try {
        const publications: any[] = get(jsonResume, 'publications', []);
        publications.forEach((publication) => {
          merge<Partial<Resume>, DeepPartial<Resume>>(resume, {
            sections: {
              publications: {
                items: [
                  ...get(resume, 'sections.publications.items', []),
                  {
                    id: uuidv4(),
                    name: get(publication, 'name'),
                    publisher: get(publication, 'publisher'),
                    summary: get(publication, 'summary'),
                    url: get(publication, 'url'),
                    date: dayjs(get(publication, 'releaseDate')).toISOString(),
                  } as Publication,
                ],
              },
            },
          });
        });
      } catch {
        // pass through
      }

      // Skills
      try {
        const skills: any[] = get(jsonResume, 'skills', []);
        skills.forEach((skill) => {
          merge<Partial<Resume>, DeepPartial<Resume>>(resume, {
            sections: {
              skills: {
                items: [
                  ...get(resume, 'sections.skills.items', []),
                  {
                    id: uuidv4(),
                    name: get(skill, 'name'),
                    level: get(skill, 'level'),
                    levelNum: 5,
                    keywords: get(skill, 'keywords', []),
                  } as Skill,
                ],
              },
            },
          });
        });
      } catch {
        // pass through
      }

      // Languages
      try {
        const languages: any[] = get(jsonResume, 'languages', []);
        languages.forEach((language) => {
          merge<Partial<Resume>, DeepPartial<Resume>>(resume, {
            sections: {
              languages: {
                items: [
                  ...get(resume, 'sections.languages.items', []),
                  {
                    id: uuidv4(),
                    name: get(language, 'language'),
                    level: get(language, 'fluency'),
                    levelNum: 5,
                  } as Language,
                ],
              },
            },
          });
        });
      } catch {
        // pass through
      }

      // Interests
      try {
        const interests: any[] = get(jsonResume, 'interests', []);
        interests.forEach((interest) => {
          merge<Partial<Resume>, DeepPartial<Resume>>(resume, {
            sections: {
              interests: {
                items: [
                  ...get(resume, 'sections.interests.items', []),
                  {
                    id: uuidv4(),
                    name: get(interest, 'name'),
                    keywords: get(interest, 'keywords', []),
                  } as Interest,
                ],
              },
            },
          });
        });
      } catch {
        // pass through
      }

      // References
      try {
        const references: any[] = get(jsonResume, 'references', []);
        references.forEach((reference) => {
          merge<Partial<Resume>, DeepPartial<Resume>>(resume, {
            sections: {
              references: {
                items: [
                  ...get(resume, 'sections.references.items', []),
                  {
                    id: uuidv4(),
                    name: get(reference, 'name'),
                    relationship: get(reference, 'reference'),
                  } as Reference,
                ],
              },
            },
          });
        });
      } catch {
        // pass through
      }

      // Projects
      try {
        const projects: any[] = get(jsonResume, 'projects', []);
        projects.forEach((project) => {
          merge<Partial<Resume>, DeepPartial<Resume>>(resume, {
            sections: {
              projects: {
                items: [
                  ...get(resume, 'sections.projects.items', []),
                  {
                    id: uuidv4(),
                    name: get(project, 'name'),
                    description: get(project, 'description'),
                    summary: get(project, 'highlights', []).join(', '),
                    keywords: get(project, 'keywords'),
                    url: get(project, 'url'),
                    date: {
                      start: dayjs(get(project, 'startDate')).toISOString(),
                      end: dayjs(get(project, 'endDate')).toISOString(),
                    },
                  } as Project,
                ],
              },
            },
          });
        });
      } catch {
        // pass through
      }

      return this.resumeService.import(resume, userId);
    } catch {
      throw new HttpException('You must upload a valid JSON Resume file.', HttpStatus.BAD_REQUEST);
    } finally {
      await unlink(path);
    }
  }

  async reactiveResume(userId: number, path: string): Promise<ResumeEntity> {
    try {
      const jsonResume = JSON.parse(await readFile(path, 'utf8'));

      const resume: Partial<Resume> = cloneDeep(jsonResume);

      // Metadata
      const timestamp = dayjs().format(FILENAME_TIMESTAMP);
      merge<Partial<Resume>, DeepPartial<Resume>>(resume, {
        name: `Imported from Reactive Resume (${timestamp})`,
        slug: `imported-from-reactive-resume-${timestamp}`,
      });

      return this.resumeService.import(resume, userId);
    } catch {
      throw new HttpException('You must upload a valid JSON Resume file.', HttpStatus.BAD_REQUEST);
    } finally {
      await unlink(path);
    }
  }
}
