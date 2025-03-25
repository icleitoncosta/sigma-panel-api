import express from 'express';
import process from 'process';

export function validateBearerToken(req: express.Request, res: express.Response, next: express.NextFunction): any {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json('Token não fornecido ou inválido.');
    }

    const token = authHeader.split(' ')[1];

    if (token !== process.env.SECRET_TOKEN) {
        return res.status(403).json('Token inválido');
    }
    next();
};