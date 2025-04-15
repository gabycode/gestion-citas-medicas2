import pino from "pino";

const isTest = process.env.NODE_ENV === "test";

const logger = isTest
  ? {
      info: () => {},
      error: () => {},
      warn: () => {},
      debug: () => {},
    }
  : pino({
      transport: {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:standard",
        },
      },
    });

export default logger;