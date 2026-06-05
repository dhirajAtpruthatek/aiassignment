import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir =
  path.join(
    process.cwd(),
    "uploads",
    "pdfs"
  );

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(
    uploadDir,
    {
      recursive: true,
    }
  );
}

const storage =
  multer.diskStorage({
    destination: (
      _req,
      _file,
      cb
    ) => {
      cb(
        null,
        uploadDir
      );
    },

    filename: (
      _req,
      file,
      cb
    ) => {
      const unique =
        Date.now() +
        "-" +
        Math.round(
          Math.random() * 1e9
        );

      cb(
        null,
        `${unique}${path.extname(
          file.originalname
        )}`
      );
    },
  });

export const pdfUpload =
  multer({
    storage,

    limits: {
      fileSize:
        20 * 1024 * 1024,
    },

    fileFilter: (
      _req,
      file,
      cb
    ) => {
      if (
        file.mimetype !==
        "application/pdf"
      ) {
        return cb(
          new Error(
            "Only PDF files are allowed"
          )
        );
      }

      cb(
        null,
        true
      );
    },
  });