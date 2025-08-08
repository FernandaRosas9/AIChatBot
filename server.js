import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

// Required to make __dirname work with ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, 'assistente-ia')));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
