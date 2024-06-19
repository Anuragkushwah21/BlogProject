const AddpostModel = require("../../models/Addpost");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dfoy70dri",
  api_key: "529319773434976",
  api_secret: "gnqQy8vKL-UAidGzN4WAp_5OZ2I",
});
class AdminController {
  static dashboard = async (req, res) => {
    try {
      const { name } = req.Userdata;
      res.render("admin/dashboard", { name: name });
    } catch (error) {
      console.log(error);
    }
  };
  //insert post
  static InsertPost = async (req, res) => {
    try {
      // console.log("insert data")
      const file = req.files.image;
      //image upload
      const uploadImage = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "blogImage",
      });
      const { title, description, image } = req.body;
      const result = new AddpostModel({
        title: title,
        description: description,
        image: {
          public_id: uploadImage.public_id,
          url: uploadImage.secure_url,
        },
      });
      console.log(result);
      await result.save();
      res.redirect("admin/blog/displayblog");
    } catch (error) {
      console.log(error);
    }
  };
  static BlogDisplay = async (req, res) => {
    try {
      const { name } = req.Userdata;
      const data = await AddpostModel.find();
      // console.log(data);
      res.render("admin/blog/displayblog", { d: data, name: name });
    } catch (error) {
      console.log(error);
    }
  };
  static BlogEdit = async (req, res) => {
    try {
      const { name } = req.Userdata;
      const data = await AddpostModel.findById(req.params.id);
      // console.log(result)
      res.render("admin/blog/editblog", {
        d: data,
        name: name,
      });
    } catch (error) {
      console.log(error);
    }
  };
  static BlogUpdate = async (req, res) => {
    try {
      // console.log(req.params.id)
      // console.log(req.body)
      //delete image
      const blog = await AddpostModel.findById(req.params.id);
      const image = blog.image.public_id;
      // console.log(image)
      await cloudinary.uploader.destroy(image);

      //update image
      const file = req.files.image;
      const newimage = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "blogImage",
      });
      const update = await AddpostModel.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description,
        image: {
          public_id: newimage.public_id,
          url: newimage.secure_url,
        },
      });
      await update.save();
      res.redirect("/admin/blog/displayblog");
    } catch (error) {
      console.log(error);
    }
  };
  static BlogView = async (req, res) => {
    try {
      // console.log(req.params.id)
      const { name } = req.Userdata;
      const result = await AddpostModel.findById(req.params.id);
      // console.log(result)

      res.render("admin/blog/viewblog", { d: result, name: name });
    } catch (error) {
      console.log(error);
    }
  };
  static BlogDelete = async (req, res) => {
    try {
      const blog = await AddpostModel.findById(req.params.id);
      const image = blog.image.public_id;
      // console.log(image)
      await cloudinary.uploader.destroy(image);
      await AddpostModel.findByIdAndDelete(req.params.id);
      res.redirect("/admin/blog/displayblog");
    } catch (error) {
      console.log(error);
    }
  };
}
module.exports = AdminController;
