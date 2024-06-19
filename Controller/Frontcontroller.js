const AddpostModel = require("../models/Addpost");
const CategorieModel = require("../models/categorie");
class FrontController {
  static login = async (req, res) => {
    try {
      res.render("login", {
        msg: req.flash("success"),
        error: req.flash("error"),
      });
    } catch (error) {
      console.log(error);
    }
  };
  static registration = async (req, res) => {
    try {
      res.render("registration", { msg: req.flash("error") });
    } catch (error) {
      console.log(error);
    }
  };
  static about = async (req, res) => {
    try {
      const { name } = req.Userdata;
      res.render("about",{name:name});
    } catch (error) {
      console.log(error);
    }
  };
  static contact = async (req, res) => {
    try {
      const { name } = req.Userdata;
      res.render("contact",{name:name});
    } catch (error) {
      console.log(error);
    }
  };
  static detail = async (req, res) => {
    try {
      //console.log(req.params.id);
      const { name } = req.Userdata;
      const detail = await AddpostModel.findById(req.params.id); //error
      const recentblog = await AddpostModel.find().limit(6);
      const category = await CategorieModel.find();
      //console.log(detail);
      //console.log(recentblog);
      res.render("detail", {
        d: detail,
        r: recentblog,
        c: category,
        name:name,
      });
    } catch (error) {
      console.log(error);
    }
  };
  static blog_form = async (req, res) => {
    try {
      const { name } = req.Userdata;
      res.render("blog_form",{name:name});
    } catch (error) {
      console.log(error);
    }
  };
  static blog_list = async (req, res) => {
    try {
    const { name } = req.Userdata;
      const blogs = await AddpostModel.find().sort({ _id: -1 }).limit(6);
      // console.log(blogs)
      res.render("blog_list", { b: blogs,name:name });
    } catch (error) {
      console.log(error);
    }
  };
  static found404 = async (req, res) => {
    try {
      const { name } = req.Userdata;
      res.render("found404",{name:name});
    } catch (error) {
      console.log(error);
    }
  };
  static home = async (req, res) => {
    try {
      const blogs = await AddpostModel.find().sort({ _id: -1 }).limit(6);
      const { name, } = req.Userdata;
      // console.log(blogs)
      res.render("home", { b: blogs,name:name });
    } catch (error) {
      console.log(error);
    }
  };
  static logout = async (req, res) => {
    try {
      res.clearCookie("token");
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = FrontController;
