import { NextApiRequest, NextApiResponse } from 'next';
import { backgroundServices } from '@/lib/background-services';
// import { ValidationHelper } from '@/middleware/validation';

// Start background services when this API is called (could be on app start)
let servicesStarted = false;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Start background services on first API call
  if (!servicesStarted) {
    backgroundServices.start();
    servicesStarted = true;
  }

  res.status(200).json({
    status: 'online',
    timestamp: new Date().toISOString(),
    backgroundServices: 'running',
    uptime: process.uptime()
  });
}