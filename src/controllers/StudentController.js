import Student from "../models/Student";
import Photo from "../models/Photo";

class StudentController {
  async index(req, res) {
    const getStudents = await Student.findAll({
      //apenas o find all mostraria tudo, porém com attributes eu estou filtrando para exibir apenas o que eu quero.
      attributes: ["id", "name", "surname", "email", "age", "weight", "height"],
      order: [
        ["id", "DESC"],
        [Photo, "id", "DESC"],
      ],
      include: {
        //aqui estou incluindo também no findAll o model de Photos, porém, Photos estava associado a Students e não Students associado a Photos
        model: Photo,
        attributes: ["id", "originalname", "filename", "student_id", "url"],
      },
    });
    res.json(getStudents);
  }
  async store(req, res) {
    try {
      const student = await Student.create(req.body);
      return res.json(student);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
  async show(req, res) {
    try {
      const { id } = req.params; // aqui estou usando destructure para extrair apenas o id de req.params. Seria como se eu estivesse escrevendo const id =  req.params.id. Isso acontece porque em destructure o {id} seria igual a {id:id} e como o nome da variavel teria o mesmo nome do valor que está sendo extraido, é feito essa simplificação.
      if (!id) {
        return res.status(400).json({
          errors: ["Faltando ID"],
        });
      }
      const student = await Student.findByPk(id, {
        // essa seria a forma de mostrar o photos no show também
        attributes: [
          "id",
          "name",
          "surname",
          "email",
          "age",
          "weight",
          "height",
        ],
        order: [
          ["id", "DESC"],
          [Photo, "id", "DESC"],
        ],
        include: {
          model: Photo,
          attributes: ["id", "originalname", "filename", "student_id", "url"],
        },
      });
      if (!student) {
        return res.status(400).json({
          errors: ["Esse aluno não existe."],
        });
      }
      return res.json(student);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ["Faltando ID"],
        });
      }
      const student = await Student.findByPk(id);
      if (!student) {
        return res.status(400).json({
          errors: ["Esse aluno não existe."],
        });
      }
      await student.destroy();
      return res.json(`Você deletou: ${student}`);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
  async update(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ["Faltando ID"],
        });
      }
      const student = await Student.findByPk(id);
      if (!student) {
        return res.status(400).json({
          errors: ["Esse aluno não existe."],
        });
      }
      const updatedStudent = await student.update(req.body);
      return res.json(updatedStudent);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}
export default new StudentController();
