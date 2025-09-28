import { NextApiRequest, NextApiResponse } from 'next';
import { runMiddlewares } from '../../../lib/middleware';
import { validateSignUp } from '../../../middleware/validation';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Run validation middleware
  const isValid = await runMiddlewares(req, res, validateSignUp);
  if (!isValid) {
    return; // Validation failed, response already sent
  }

  // If validation passes, continue with your logic
  try {
    // Your signup logic here
    const { name, email, password } = req.body;
    
    // Process the signup...
    
    res.status(200).json({ 
      success: true, 
      message: 'User created successfully' 
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}