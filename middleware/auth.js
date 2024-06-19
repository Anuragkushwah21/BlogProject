const jwt = require("jsonwebtoken");
const BlogModel = require("../models/Blog");

const checkBlogAuth = async (req, res, next) => {
  // console.log("middleware auth")
  // token get
  const { token } = req.cookies;
//   console.log(token);
  if (!token) {
    req.flash("error", "Unaouthrized Login");
    res.redirect("/");
  } else {
    const data = jwt.verify(token, "anuragkushwah15394584728655hgbdhjdn");
    //get data
    const Userdata = await BlogModel.findOne({ _id: data.ID });
    // console.log(Userdata)
    req.Userdata = Userdata;
    next();
  }
};

module.exports = checkBlogAuth;
