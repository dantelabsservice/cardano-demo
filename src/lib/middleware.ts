import { NextApiRequest, NextApiResponse } from 'next';

type Middleware = (req: NextApiRequest, res: NextApiResponse, next: (error?: any) => void) => void;

export function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  middleware: Middleware
): Promise<void> {
  return new Promise((resolve, reject) => {
    middleware(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

// Helper to run multiple middlewares
export async function runMiddlewares(
  req: NextApiRequest,
  res: NextApiResponse,
  middlewares: Middleware[]
): Promise<boolean> {
  try {
    for (const middleware of middlewares) {
      await runMiddleware(req, res, middleware);
    }
    return true;
  } catch (error) {
    return false;
  }
}