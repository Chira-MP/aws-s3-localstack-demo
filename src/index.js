import {
  createBucket,
  uploadFile,
  listFiles,
  downloadFile,
  deleteFile,
  deleteBucket,
} from "./s3.js";

const command = process.argv[2];
const argument = process.argv[3];

async function main() {
  try {
    switch (command) {
      case "create":
        await createBucket();
        break;

      case "upload":
        if (!argument) {
          throw new Error("Specificati calea fisierului!");
        }
        await uploadFile(argument);
        break;

      case "list":
        await listFiles();
        break;

      case "download":
        if (!argument) {
          throw new Error("Specificati numele fisierului!");
        }
        await downloadFile(argument);
        break;

      case "delete":
        if (!argument) {
          throw new Error("Specificati numele fisierului!");
        }
        await deleteFile(argument);
        break;

      case "delete-bucket":
        await deleteBucket();
        break;

      default:
        console.log(`
Aplicatie de gestionare a fisierelor Amazon S3

Comenzi disponibile:

  node src/index.js create
  node src/index.js upload uploads/document.txt
  node src/index.js list
  node src/index.js download document.txt
  node src/index.js delete document.txt
  node src/index.js delete-bucket
        `);
    }
  } catch (error) {
    console.error("Eroare:", error.message);
    process.exitCode = 1;
  }
}

main();
