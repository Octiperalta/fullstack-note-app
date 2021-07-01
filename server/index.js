require("dotenv").config();
require("./mongo");
const express = require("express");
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");
const logger = require("./middleware/loggerMiddleware");
const cors = require("cors");
const app = express();
const Note = require("./models/Note");
const notFound = require("./middleware/notFound");
const handleErrors = require("./middleware/handleErrors");
const usersRouter = require("./controllers/users");
const notesRouter = require("./controllers/notes");
const loginRouter = require("./controllers/login");

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(logger);

// Initilize Sentry
Sentry.init({
  dsn: "https://b0930f09f058457585cb852eb8ec83f0@o673518.ingest.sentry.io/5768209",
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app }),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

// [SENTRY HANDLERS]
// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

// [CONTROLLERS]
app.use("/api/users", usersRouter);
app.use("/api/notes", notesRouter);
app.use("/api/login", loginRouter);

app.use(notFound);

// [SENTRY ERROR HANDLER]
app.use(Sentry.Handlers.errorHandler());

// [ERROR MIDDLEWARES]
app.use(handleErrors);

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
  console.log(`Running server on http://localhost:${PORT}/`);
});
// https://cryptic-cove-06866.herokuapp.com/api/notes

module.exports = { app, server };
