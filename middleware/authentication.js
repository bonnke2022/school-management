const CustomError = require("../errors");
const { isTokenValid } = require("../utils");

const authenticateAttendant = async (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }

  try {
    const { name, staffId } = isTokenValid({ token });
    req.attendant = { name, staffId };
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }
};

module.exports = { authenticateAttendant };
