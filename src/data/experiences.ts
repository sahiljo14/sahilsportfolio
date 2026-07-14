import type { Experience } from "@/types/experience";

export const experiences: Experience[] = [
  {
    id: "iot-monitoring-platform",
    title: "Real-Time IoT Environment Monitoring Platform",
    organization: "Independent Project",
    period: "Current focus",
    description:
      "Built a full-stack platform for collecting and monitoring environmental data from connected devices.",
    highlights: [
      "Designed real-time data flow around MQTT messaging.",
      "Connected a React interface to an Express API and PostgreSQL storage.",
    ],
    technologies: ["React", "Node.js", "Express", "PostgreSQL", "MQTT"],
  },
  {
    id: "kairyo",
    title: "Kairyo",
    organization: "Independent Project",
    period: "Current focus",
    description:
      "Developing an AI-powered manga upscaler with a desktop interface and model-management workflow.",
    highlights: [
      "Integrated image upscaling workflows with a desktop-oriented user experience.",
      "Containerized the application to keep model dependencies reproducible.",
    ],
    technologies: ["Next.js", "Python", "PyTorch", "Docker"],
  },
  {
    id: "risc-v-processor",
    title: "32-bit RISC-V Processor",
    organization: "Independent Project",
    period: "Current focus",
    description:
      "Implementing a five-stage pipelined RV32I processor to deepen hands-on understanding of computer architecture.",
    highlights: [
      "Designed the processor around the RV32I instruction set.",
      "Implemented and tested the pipeline in Verilog using Vivado.",
    ],
    technologies: ["Verilog", "Vivado", "RISC-V"],
  },
];
