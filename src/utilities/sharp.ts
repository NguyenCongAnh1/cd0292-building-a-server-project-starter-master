import express from 'express';
import path from 'path';
import sharp from 'sharp';
import fs from 'fs';
import isSameSize from './isSameSize';

async function imageResizeMiddleware(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const filename = req.query.filename as string;
  const imagePath = path.join(__dirname, `../../images/${filename}.jpg`);

  const width = parseInt(req.query.width as string);
  const height = parseInt(req.query.height as string);

  if (!filename || isNaN(width) || isNaN(height)) {
    return res.status(400).send('Invalid parameters');
  }

  const thumbDirPath = path.join(__dirname, '../../thumb');
  const thumbFilename = `${filename}_thumb.jpg`;
  const thumbImagePath = path.join(thumbDirPath, thumbFilename);

  if (!fs.existsSync(thumbDirPath)) {
    fs.mkdirSync(thumbDirPath);
  }
  if (
    fs.existsSync(thumbImagePath) &&
    (await isSameSize(thumbImagePath, width, height))
  ) {
    // Trả về ảnh đã tồn tại mà không thay đổi kích thước
    return res.sendFile(imagePath);
  }

  // Sử dụng thư viện Sharp để thay đổi kích thước ảnh
  sharp(imagePath)
    .resize(width, height)
    .toBuffer((err, data) => {
      if (err) {
        return res.status(500).send('Error processing image');
      }
      //Save images into the thumb folder
      fs.writeFileSync(thumbImagePath, data);
      res.status(200);
      res.type('jpg'); // Đặt loại phản hồi là hình ảnh JPG
      res.send(data); // Gửi ảnh đã được thay đổi kích thước cho phản hồi
    });
  next();
}

export default imageResizeMiddleware;
