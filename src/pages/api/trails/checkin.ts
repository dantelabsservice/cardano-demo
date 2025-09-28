import { NextApiRequest, NextApiResponse } from 'next';
import { body } from 'express-validator';
// import { ValidationHelper } from '../../../middleware/validation';

const checkInValidations = [
  body('walletAddress').notEmpty().withMessage('Wallet address is required'),
  body('trailId').notEmpty().withMessage('Trail ID is required'),
  body('trailName').notEmpty().withMessage('Trail name is required'),
  body('difficulty').isIn(['Beginner', 'Intermediate', 'Expert', 'Extreme']).withMessage('Invalid difficulty level')
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

//   const isValid = await ValidationHelper.validateRequest(req, res, checkInValidations);
//   if (!isValid) return;

  try {
    const { walletAddress, trailId, trailName, difficulty } = req.body;
    
    console.log('Processing trail check-in:', { walletAddress, trailId, trailName, difficulty });
    
    // Simulate transaction processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real app, you would:
    // 1. Build Cardano transaction with metadata
    // 2. Return unsigned transaction to frontend
    // 3. Frontend signs and submits
    
    res.status(200).json({
      success: true,
      message: `Checked in to ${trailName} successfully!`,
      data: {
        trailId,
        trailName, 
        difficulty,
        walletAddress,
        timestamp: new Date().toISOString(),
        transactionId: 'tx_' + Math.random().toString(36).substr(2, 9), // Mock transaction ID
        // In real app, you'd return the unsigned transaction here
        unsignedTransaction: null
      }
    });
  } catch (error) {
    console.error('Check-in error:', error);
    res.status(500).json({ error: 'Failed to process check-in' });
  }
}

