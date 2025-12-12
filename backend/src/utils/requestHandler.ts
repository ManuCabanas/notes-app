import { Request, Response, RequestHandler } from 'express';

export function handleRequest(
  handler: (req: Request, res: Response) => Promise<any> | any,
  errorMessage: string
): RequestHandler {
  return async (req, res) => {
    try {
      await handler(req, res);
    } catch (error) {
      console.error(error);
      if (!res.headersSent) {
        res.status(500).json({ message: errorMessage });
      }
    }
  };
}
