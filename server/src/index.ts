import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import session from "express-session";
import log4js from "log4js";
import { FirestoreStore } from "@google-cloud/connect-firestore";

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

// Setup GCP Firestore
import { db } from "./config/firestore";

// Setup Express
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// Setup Express Session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "",
    resave: false,
    saveUninitialized: true,
    store: new FirestoreStore({
      dataset: db,
      kind: "express-sessions",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
  })
);

app.listen(process.env.PORT || 8080, () => {
  logger.info(`Server listening on port ${process.env.PORT || 8080}`);
});
