import { t } from "@lingui/macro";
import { templatesList } from "@reactive-resume/utils";
import { motion } from "framer-motion";

export const TemplatesSection = () => (
  <section id="sample-resumes" className="relative py-24 sm:py-32">
    <div className="container flex flex-col gap-12 lg:min-h-[600px] lg:flex-row lg:items-start">
      <div className="space-y-4 lg:mt-16 lg:basis-96">
        <h2 className="text-4xl font-bold">{t`Templates`}</h2>

        <p className="leading-relaxed">
          {t`Explore the templates available in Reactive Resume and view the resumes crafted with them. They could also serve as examples to help guide the creation of your next resume.`}
        </p>
      </div>

      <div className="w-full overflow-hidden lg:absolute lg:right-0 lg:max-w-[55%]">
        <motion.div
          animate={{
            x: [0, templatesList.length * 200 * -1],
            transition: {
              x: {
                duration: 30,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "mirror",
              },
            },
          }}
          className="flex items-center gap-x-6"
        >
          {templatesList.map((template, index) => (
            <motion.a
              key={index}
              target="_blank"
              rel="noreferrer"
              href={`templates/pdf/${template}.pdf`}
              className="max-w-none flex-none"
              viewport={{ once: true }}
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <img
                alt={template}
                loading="lazy"
                src={`/templates/jpg/${template}.jpg`}
                className="aspect-[1/1.4142] h-[400px] rounded object-cover lg:h-[600px]"
              />
            </motion.a>
          ))}
        </motion.div>

        <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/2 bg-gradient-to-r from-background to-transparent lg:block" />
      </div>
    </div>
  </section>
);
