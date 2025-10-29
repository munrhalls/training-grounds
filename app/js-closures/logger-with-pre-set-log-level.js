// 4. Logger with Pre-set Log Level 📝
// Goal: Create a function that sets a log level (e.g., 'INFO', 'WARNING', 'ERROR'). The returned function should only log the message if its severity is greater than or equal to the retained level.

const makeLogger = function (setting) {
  const map = {
    INFO: 1,
    WARNING: 2,
    ERROR: 3,
  };

  const threshold = map[setting];
  const logger = function (messageObj) {
    const { level, message } = messageObj;
    const score = map[level];
    if (score >= threshold) console.log(`${level}: ${message}.`);
  };

  return logger;
};

const INFOLogger = makeLogger("INFO");
const WARNINGLogger = makeLogger("WARNING");
const ERRORLogger = makeLogger("ERROR");

INFOLogger({ level: "ERROR", message: "This is ERROR message" });
ERRORLogger({ level: "WARNING", message: "This is WARNING that should not display inside error logger" });
WARNINGLogger({ level: "WARNING", message: "This is WARNING that SHOULD display inside warning logger" });
