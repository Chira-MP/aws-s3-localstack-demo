import {
  S3Client,
  CreateBucketCommand,
  PutObjectCommand,
  ListObjectsV2Command,
  GetObjectCommand,
  DeleteObjectCommand,
  DeleteBucketCommand,
} from "@aws-sdk/client-s3";

import fs from "node:fs";
import path from "node:path";

const BUCKET_NAME = "proiect-fisiere-demo";

const s3 = new S3Client({
  region: "us-east-1",
  endpoint: "http://localhost:4566",
  forcePathStyle: true,
  credentials: {
    accessKeyId: "test",
    secretAccessKey: "test",
  },
});

// 1. Crearea unui bucket
export async function createBucket() {
  await s3.send(
    new CreateBucketCommand({
      Bucket: BUCKET_NAME,
    }),
  );

  console.log(`Bucket-ul ${BUCKET_NAME} a fost creat!`);
}

// 2. Incarcarea unui fisier
export async function uploadFile(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Fisierul nu exista: ${filePath}`);
  }

  const fileContent = fs.readFileSync(filePath);
  const fileName = path.basename(filePath);

  await s3.send(
    new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: fileContent,
    }),
  );

  console.log(`Fisierul ${fileName} a fost incarcat!`);
}

// 2. Actualizarea unui fisier existent
export async function updateFile(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Fisierul nu exista: ${filePath}`);
  }

  const fileContent = fs.readFileSync(filePath);
  const fileName = path.basename(filePath);

  // Verificam daca fisierul exista deja in bucket
  await s3.send(
    new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileName,
    }),
  );

  // Inlocuim continutul fisierului
  await s3.send(
    new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: fileContent,
    }),
  );

  console.log(`Fisierul ${fileName} a fost actualizat!`);
}

// 3. Listarea fisierelor
export async function listFiles() {
  const result = await s3.send(
    new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
    }),
  );

  console.log("Fisiere existente:");

  if (!result.Contents || result.Contents.length === 0) {
    console.log("Bucket-ul este gol.");
    return;
  }

  result.Contents.forEach((file) => {
    console.log(`- ${file.Key} (${file.Size} bytes)`);
  });
}

// 4. Descarcarea unui fisier
export async function downloadFile(fileName) {
  const result = await s3.send(
    new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileName,
    }),
  );

  const fileContent = await result.Body.transformToByteArray();

  const outputPath = path.join("downloads", fileName);

  fs.mkdirSync("downloads", { recursive: true });
  fs.writeFileSync(outputPath, fileContent);

  console.log(`Fisierul a fost descarcat in: ${outputPath}`);
}

// 5. Stergerea unui fisier
export async function deleteFile(fileName) {
  await s3.send(
    new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileName,
    }),
  );

  console.log(`Fisierul ${fileName} a fost sters!`);
}

// 6. Stergerea bucket-ului
export async function deleteBucket() {
  await s3.send(
    new DeleteBucketCommand({
      Bucket: BUCKET_NAME,
    }),
  );

  console.log(`Bucket-ul ${BUCKET_NAME} a fost sters!`);
}
