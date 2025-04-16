import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Erro interno no servidor";
    const info = err.info || null;

    res.status(statusCode).json({
        error: true,
        message,
        info: info,
    });
};
