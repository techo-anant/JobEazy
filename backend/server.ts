import express from 'express';
import type { Request, Response } from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import type { Job } from './models/newJob.model';
import { fileURLToPath } from 'url';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SAVE_DIR = path.join(__dirname, 'saved_forms');
if (!fs.existsSync(SAVE_DIR)) fs.mkdirSync(SAVE_DIR);

app.get('/', (req: Request, res: Response) => {
    res.send('Backend is running!');
})

app.post('/save-form', async (req: Request, res: Response) => {
    const data: Job = req.body;
    const filename: string = `job_${encodeURIComponent(data.companyName)}_${encodeURIComponent(data.positionName)}.json`;
    const filepath: string = path.join(SAVE_DIR, filename);
    try {
        await fs.promises.writeFile(filepath, JSON.stringify(data, null, 2));
        console.log(`Saved form: ${filepath}`);
        res.json({ success: true, filepath });
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to save file');
    }
})

// GET endpoint to list all saved forms
app.get('/list-forms', (_req: Request, res: Response) => {
    const files = fs.readdirSync(SAVE_DIR);
    res.json(files);
});

type FormParams = { name: string };

// GET endpoint to read a specific form
app.get('/form/:name', (req: Request<FormParams>, res: Response) => {
    const filepath = path.join(SAVE_DIR, req.params.name);
    if (!fs.existsSync(filepath)) return res.status(404).send('Not found');
    const data = fs.readFileSync(filepath, 'utf8');
    res.json(JSON.parse(data));
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Backend running at http://localhost:${PORT}`);
});

