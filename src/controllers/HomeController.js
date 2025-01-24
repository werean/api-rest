import Student from "../models/Student";
class HomeController {
  async index(req, res) {
    const newStudent = await Student.create({
      name: "Giovanna",
      surname: "Moura",
      email: "giovannamoura@gmail.com",
      age: 22,
      height: 1.8,
      weight: 60,
    });
    res.json(newStudent);
  }
}
export default new HomeController();
