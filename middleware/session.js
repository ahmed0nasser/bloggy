const sessionController = require("../controllers/sessionController");

module.exports = async (req, res, next) => {
  const sessionId = req.cookies.sessionId;

  // If no sessionId, continue to the next middleware without making async call
  if (!sessionId) return next();

  try {
    req.user = await sessionController.getSession(sessionId);
  } catch (error) {
    console.error("Session retrieval error:", error);
    return next(error);
  }

  next();
};
