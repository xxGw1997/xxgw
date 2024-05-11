import React from "react";
import { motion } from "framer-motion";

const Section = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.section
      className="h-screen w-screen p-8 max-w-screen-2xl mx-auto flex flex-col items-start justify-center"
      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 1,
          delay: 0.6,
        },
      }}
    >
      {children}
    </motion.section>
  );
};

const AboutSection = () => {
  return (
    <Section>
      <h1 className="text-6xl font-extralight leading-snug">
        Hi, I'm
        <br />
        <span className="bg-white px-1 italic">xxGw</span>
      </h1>
      <motion.p
        className="text-lg text-gray-600 mt-4"
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          delay: 1.5,
        }}
      >
        我目前在南昌的一家保险公司
        <br />
        负责前端开发的工作...
      </motion.p>
      <motion.button
        className="bg-[--primary] py-4 px-8 rounded-lg font-bold text-lg mt-16"
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          delay: 2,
        }}
      >
        Contact Me
      </motion.button>
    </Section>
  );
};

const skills = [
  {
    title: "React",
    level: 60,
  },
  {
    title: "Vue",
    level: 80,
  },
  {
    title: "Nodejs",
    level: 60,
  },
  {
    title: "Typescript",
    level: 60,
  },
];
const hobbies = [
  {
    title: "英雄联盟",
    level: 60,
  },
  {
    title: "无畏契约",
    level: 30,
  },
  {
    title: "睡觉",
    level: 90,
  },
];

const SkillsSection = () => {
  return (
    <Section>
      <motion.div whileInView={"visible"}>
        <h2 className="text-5xl font-bold">Skills</h2>
        <div className="mt-8 space-y-4">
          {skills.map((skill, index) => (
            <div className="w-64" key={index}>
              <motion.h3
                className="text-xl font-bold text-gray-800"
                initial={{
                  opacity: 0,
                }}
                whileInView={{
                  opacity: 1,
                }}
                transition={{
                  duration: 1,
                  delay: 1 + index * 0.2,
                }}
              >
                {skill.title}
              </motion.h3>
              <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
                <motion.div
                  className="h-full bg-[--primary] rounded-full"
                  style={{ width: `${skill.level}%` }}
                  initial={{
                    scaleX: 0,
                    originX: 0,
                  }}
                  variants={{
                    visible: {
                      scaleX: 1,
                      transition: {
                        duration: 1,
                        delay: 2 + index * 0.2,
                      },
                    },
                  }}
                ></motion.div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 space-y-4">
          <h2 className="text-5xl font-bold text-gray-800">Hobbies</h2>
          <div className="mt-8 space-y-4">
            {hobbies.map((hobby, index) => (
              <div className="w-64" key={index}>
                <motion.h3
                  className="text-xl font-bold text-gray-800"
                  initial={{ opacity: 0 }}
                  whileInView={{
                    opacity: 1,
                  }}
                  transition={{
                    duration: 1,
                    delay: 1 + index * 0.2,
                  }}
                >
                  {hobby.title}
                </motion.h3>
                <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
                  <motion.div
                    className="h-full bg-[--primary] rounded-full"
                    style={{ width: `${hobby.level}%` }}
                    initial={{
                      scaleX: 0,
                      originX: 0,
                    }}
                    variants={{
                      visible: {
                        scaleX: 1,
                        transition: {
                          duration: 1,
                          delay: 2 + index * 0.2,
                        },
                      },
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </Section>
  );
};

const ContactSection = () => {
  return <Section>Contact</Section>;
};

export const Interface = () => {
  return (
    <div className="flex flex-col items-center w-full ml-10">
      <AboutSection />
      <SkillsSection />
      <Section>
        <h1>Projects</h1>
      </Section>
      <ContactSection />
    </div>
  );
};
