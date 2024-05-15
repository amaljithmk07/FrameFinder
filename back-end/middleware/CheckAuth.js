const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {

    const token = req.headers.authorization.split(" ")[1];

    const decoded_token = jwt.verify(token, "this_should_be_secret");

    req.userData = {
      userId: decoded_token.userId,
      userEmail: decoded_token.userEmail,
      userRole: decoded_token.userRole,
    };
    console.log("req.userData:", req.userData);

    next();
  } catch (err) {
    res.status(401).json({
      errr: true,
      success: false,
      message: "Auth Failed",
      errorMessage: err.message,
    });
  }
};
