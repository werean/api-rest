import multer from "multer";
import multerConfig from "../config/multerConfig";

import Photo from "../models/Photo";

const upload = multer(multerConfig).single("photo");

class PhotoController {
  store(req, res) {
    return upload(req, res, async (error) => {
      if (error) {
        return res.status(400).json({
          erros: [error.code], // aqui estou retornando apenas o erro no json
        });
      }
      try {
        const { originalname, filename } = req.file;
        const { student_id } = req.body;
        const photo = await Photo.create({
          originalname,
          filename,
          student_id,
        });
        return res.json(photo);
      } catch (e) {
        return res.status(400).json({
          error: ["Aluno não existe"],
        });
      }
    });
  }
}

export default new PhotoController();
