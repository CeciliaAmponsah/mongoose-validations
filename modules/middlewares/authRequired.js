const jwt = require("jsonwebtoken");

exports.authRequired = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(402).json({ error: "please login " });
  }
  // const token = authorization.split("Bearer")[0]
  const token = authorization.split(" ")[1];
  if (!token) {
    return res.status(402).json({ error: "please login" });
  }

  const user = jwt.verify(
    token,
    "c070d9702c223541d1fd48136407555f4f1da99a6e92dc53ddb74d1965f27762"
  );

  req.user = user;
  next();
};
