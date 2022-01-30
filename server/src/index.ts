import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import session from "express-session";
import log4js from "log4js";
import MongoStore from "connect-mongo";
import passport from "passport";

import authRouter from "./routes/auth";
import coursesRouter from "./routes/courses";
import concentrationsRouter from "./routes/concentrations";
import semestersRouter from "./routes/semesters";
import recommendationsRouter from "./routes/recommendations";

log4js.configure({
  appenders: {
    out: { type: "stdout" },
    app: { type: "file", filename: "logs/app.log" },
  },
  categories: {
    default: { appenders: ["out", "app"], level: "debug" },
  },
});
const logger = log4js.getLogger("index");

dotenv.config();

if (!process.env.MONGO_URI) {
  logger.error("Environment variables are not properly setup!");
  process.exit(1);
}

// Setup GCP MongoDB
import "./config/mongo";

// Setup Express
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Setup Express Session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI || "",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    },
  })
);

// Setup Passport
import "./config/passport";
app.use(passport.initialize());
app.use(passport.session());

// Setup Routes
app.use("/auth", authRouter);
app.use("/courses", coursesRouter);
app.use("/concentrations", concentrationsRouter);
app.use("/semesters", semestersRouter);
app.use("/recommendations", recommendationsRouter);

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT || 8080, () => {
  logger.info(`Server listening on port ${process.env.PORT || 8080}`);
});
