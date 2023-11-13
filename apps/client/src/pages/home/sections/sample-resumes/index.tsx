import { t } from "@lingui/macro";
import { motion } from "framer-motion";

const resumes = [
  "/sample-resumes/ditto",
  "/sample-resumes/ditto",
  "/sample-resumes/ditto",
  "/sample-resumes/ditto",
];

export const SampleResumesSection = () => (
  <section id="sample-resumes" className="relative py-24 sm:py-32">
    <div className="container flex flex-col gap-12 lg:min-h-[600px] lg:flex-row lg:items-start">
      <div className="space-y-4 lg:mt-16 lg:basis-96">
        <h2 className="text-4xl font-bold">{t`Sample Resumes`}</h2>
        <p className="text-base leading-relaxed">
          {t`Have a look at some of the resume created to showcase the templates available on Reactive Resume. They also serve some great examples to help guide the creation of your own resume.`}
        </p>
      </div>

      <div className="w-full overflow-hidden lg:absolute lg:right-0 lg:max-w-[55%]">
        <motion.div
          animate={{
            x: [0, -400],
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
          {resumes.map((resume, index) => (
            <motion.a
              key={index}
              target="_blank"
              rel="noreferrer"
              href={`${resume}.pdf`}
              className="max-w-none flex-none"
              viewport={{ once: true }}
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0, transition: { delay: (index + 1) * 0.5 } }}
            >
              <img
                alt={resume}
                src={`${resume}.jpg`}
                className=" aspect-[1/1.4142] h-[400px] rounded object-cover lg:h-[600px]"
              />
            </motion.a>
          ))}
        </motion.div>

        <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/2 bg-gradient-to-r from-background to-transparent lg:block" />
      </div>
    </div>
  </section>
);
