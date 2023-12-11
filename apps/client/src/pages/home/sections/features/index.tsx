import { Trans, t } from "@lingui/macro";
import { Brain, Files, Globe, Paragraph, PencilLine, TrendUp } from "@phosphor-icons/react";
import { templatesList } from "@reactive-resume/utils";
import { motion } from "framer-motion";

type Feature = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

export const FeaturesSection = () => {
  const templatesCount = templatesList.length;
  const features: Feature[] = [
    {
      icon: <PencilLine />,
      title: t`Expert Writing Tips`,
      description: t`Get real-time feedback and suggestions for improvement, from grammar and formatting checks to ensuring your resume is clear, concise, and impactful.`,
    },
    {
      icon: <Brain />,
      title: t`Smart Content Suggestions`,
      description: t`Get personalized recommendations for relevant achievements, quantifiable results, and action verbs to showcase your impact and drive.`,
    },
    {
      icon: <Globe />,
      title: t`Optimize Your Online Presence`,
      description: t`Enhance your online profile and make it easier for employers to find and discover your talents.`,
    },
    {
      icon: <Files />,
      title: t`Extensive Template Library`,
      description: t`Choose from over 10+ professional resume templates, designed for various industries and job titles.`,
    },
    {
      icon: <TrendUp />,
      title: t`Real-Time Engagement Tracking`,
      description: t`See how many recruiters have viewed your Live Resume, how long they spent on each section, and what actions they took.`,
    },
  ];
  return (
    <section id="features" className="relative bg-secondary-accent py-24 sm:py-32">
      <div className="container mx-auto px-6 py-10">
        <div className="lg:flex lg:items-center">
          <div className="w-full space-y-12 lg:w-1/2 ">
            <div>
              <h1 className="text-3xl font-semibold capitalize text-gray-800 dark:text-white lg:text-4xl">
                <Trans>
                  explore our <br /> awesome Components
                </Trans>
              </h1>

              <div className="mt-2">
                <span className="inline-block h-1 w-40 rounded-full bg-blue-500"></span>
                <span className="ml-1 inline-block h-1 w-3 rounded-full bg-blue-500"></span>
                <span className="ml-1 inline-block h-1 w-1 rounded-full bg-blue-500"></span>
              </div>
            </div>

            {features.map((feature) => (
              <div className="md:-mx-4 md:flex md:items-start" key={feature.title}>
                <span className="inline-block rounded-xl bg-blue-100 p-2 text-blue-500 dark:bg-blue-500 dark:text-white md:mx-4">
                  {feature.icon}
                </span>

                <div className="mt-4 md:mx-4 md:mt-0">
                  <h1 className="text-2xl font-semibold capitalize">{feature.title}</h1>

                  <p className="mt-3">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* <div className="hidden lg:flex lg:w-1/2 lg:items-center lg:justify-center">
            <img
              className="p-2 object-cover"
              src="/screenshots/builder.jpg"
              alt=""
            />
          </div> */}
          <div className="w-full overflow-hidden lg:absolute lg:right-0 lg:max-w-[45%]">
            <motion.div
              animate={{
                x: [0, 200 * -1],
                transition: {
                  x: {
                    duration: 30,
                    repeat: Infinity,
                    repeatType: "mirror",
                  },
                },
              }}
              className="flex items-center gap-x-6"
            >
              <motion.a
                className="max-w-none flex-none"
                viewport={{ once: true }}
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <img
                  className=" h-[400px] rounded object-cover lg:h-[600px]"
                  src="/screenshots/builder.jpg"
                  alt="Resume Builder"
                />
              </motion.a>
            </motion.div>

            <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/2 bg-gradient-to-r from-background to-transparent lg:block" />
          </div>
        </div>
      </div>
    </section>
  );
};
