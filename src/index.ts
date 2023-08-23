import express from 'express';
import path from 'path';
import imageResizeMiddleware from './utilities/sharp';

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../images')));

//API lalala
app.get('/images', imageResizeMiddleware, (req, res) => {});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
