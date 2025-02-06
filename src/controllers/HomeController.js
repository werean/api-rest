import Student from "../models/Student";

class HomeController {
  async index(req, res) {
    try {
      return res.json({
        message: "Welcome to School API",
      });
    } catch (e) {
      return res.status(400).json({
        errors: ["Error occurred"],
      });
    }
  }
}

export default new HomeController();
