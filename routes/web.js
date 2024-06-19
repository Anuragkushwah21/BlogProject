const express = require("express");
const route = express.Router();
const FrontController = require("../Controller/Frontcontroller");
const TeacherController = require("../Controller/TeacherController");
const BlogController = require("../Controller/admin/BlogController");
const AdminController = require("../Controller/admin/AdminController");
const checkBlogAuth = require("../middleware/auth");
const CategoriaController = require("../Controller/admin/CategorieController");
const ContactController = require("../Controller/ContactController");

route.get("/", FrontController.login);
route.get("/registration", FrontController.registration);
route.get("/about", checkBlogAuth, FrontController.about);
route.get("/contact", checkBlogAuth, FrontController.contact);
route.get("/detail/:id", checkBlogAuth, FrontController.detail);
route.get("/blog_form", checkBlogAuth, FrontController.blog_form);
route.get("/blog_list", checkBlogAuth, FrontController.blog_list);
route.get("/found404", checkBlogAuth, FrontController.found404);
route.get("/home", checkBlogAuth, FrontController.home);
route.get("/logout", FrontController.logout);

//teacher controller

route.get("/teacher/display", checkBlogAuth, TeacherController.display);
route.get("/teacher/create", checkBlogAuth, TeacherController.create);

//insertReg
route.post("/insertReg", BlogController.InsertReg);
route.post("/vLogin", BlogController.vLogin);

//admin controller
route.get("/admin/dashboard", checkBlogAuth, AdminController.dashboard);
//insertPost
route.post("/insertPost", checkBlogAuth, AdminController.InsertPost);

//blog display admin controller
route.get(
  "/admin/blog/displayblog",
  checkBlogAuth,
  AdminController.BlogDisplay
);
route.get("/blogview/:id", checkBlogAuth, AdminController.BlogView);
route.get("/blogedit/:id", checkBlogAuth, AdminController.BlogEdit);
route.get("/blogdelete/:id", AdminController.BlogDelete);

//blogupdate
route.post("/blogupdate/:id", checkBlogAuth, AdminController.BlogUpdate);

//catrgorie controller
route.get(
  "/admin/blog/Categorie",
  checkBlogAuth,
  CategoriaController.CaregorieDisplay
);

//contact controller
route.post("/sendMessage", checkBlogAuth, ContactController.SendMessage);
route.get(
  "/admin/message/message_quiry",
  checkBlogAuth,
  ContactController.MessageQuiry
);
route.get("/message_view/:id", checkBlogAuth, ContactController.MessageView);
route.get("/message_delete/:id", ContactController.MessageDelete);

module.exports = route;
