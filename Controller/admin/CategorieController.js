const CategorieModel = require("../../models/categorie");
class CategoriaController {
  static CaregorieDisplay(req, res) {
    res.render("admin/categori/display");
  }
}

module.exports = CategoriaController;
