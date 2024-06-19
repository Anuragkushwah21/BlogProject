const BlogModel = require("../../models/Blog");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AddpostModel = require("../../models/Addpost");

class BlogController {
  //insertReg
  static InsertReg = async (req, res) => {
    try {
      // console.log("insert data")
      // const result =await BlogModel.create(req.body)
      const { name, email, password, confirmpassword } = req.body;
      const blog = await BlogModel.findOne({ email: email });
      if (blog) {
        req.flash("error", "Email alredy exit");
        res.redirect("/registration");
      } else {
        if (name && email && password && confirmpassword) {
          if (password == confirmpassword) {
            const hashpassword = await bcrypt.hash(password, 10);
            const result = new BlogModel({
              name: name,
              email: email,
              password: hashpassword,
            });
            await result.save();
            req.flash("success", "Registration Success plz login!");
            res.redirect("/"); // route url chalta h
          } else {
            req.flash("error", "password and confirm password not same");
            res.redirect("/registration");
          }
        } else {
          req.flash("error", "All field req");
          res.redirect("/registration");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  //vlogin

  static vLogin = async (req, res) => {
    try {
      // console.log(req.body);
      const { email, password } = req.body;
      if (email && password) {
        const user = await BlogModel.findOne({ email: email });
        if (user != null) {
          const isMatched = await bcrypt.compare(password, user.password);
          if (isMatched) {
            //token genrate

            let token = jwt.sign(
              { ID: user.id },
              "anuragkushwah15394584728655hgbdhjdn"
            );
            // console.log(token);
            res.cookie("token", token);
            res.redirect("/home");
          } else {
            req.flash("error", "Email or Password is not valid");
            res.redirect("/");
          }
        } else {
          req.flash("error", "You are not a registred user");
          res.redirect("/");
        }
      } else {
        req.flash("error", "All Firlds Required");
        res.redirect("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = BlogController;
