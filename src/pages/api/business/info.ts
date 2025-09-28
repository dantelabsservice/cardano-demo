import { NextApiRequest, NextApiResponse } from 'next';
import { runMiddlewares } from '../../../lib/middleware';
import { validateBusinessInfo } from '../../../middleware/validation';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Run validation middleware
  const isValid = await runMiddlewares(req, res, validateBusinessInfo);
  if (!isValid) {
    return;
  }

  // Process business info
  try {
    const { ownerName, address, city, citizenshipNumber, businessRegisterNumber } = req.body;
    
    // Your business logic here...
    
    res.status(200).json({ 
      success: true, 
      message: 'Business info saved successfully' 
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}