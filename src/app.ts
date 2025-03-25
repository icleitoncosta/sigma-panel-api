import cors from 'cors';
import express from 'express';

import routes from './routes';

export const app = express();
app.use(express.json());

//app.options("*", cors());
app.use(cors());
app.use((req: any, res: any, next: any) => {
  const original: any = req.headers.origin;
    res.setHeader('Access-Control-Allow-Origin', '*');
    /*cors({
        origin: original,
        credentials: true,
    });*/
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});
app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ limit: '500mb', extended: true }));
app.use(express.static('uploads'));

app.use('/api', routes);
