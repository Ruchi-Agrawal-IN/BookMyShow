const jwt = require("jsonwebtoken");
function AuthMiddleware(req, res, next) {
  try {
    console.log(
      `token fetched in authmiddleware is ${req.headers.authorization}`
    );
    const token = req.headers.authorization.split(" ")[1];

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decodedToken.userId;
    next();
  } catch (error) {
    res.status(401).send({
      success: false,
      message: `Login failed:${error.message}`,
    });
  }
}

module.exports = AuthMiddleware;
