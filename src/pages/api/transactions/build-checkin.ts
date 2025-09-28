import { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse, CheckInData } from '../../../lib/types';
import { CARDANO_CONFIG } from '../../../lib/cardano/config';

/**
 * ASSESSMENT TASK 1: Transaction Building
 * 
 * Your goal: Build a Cardano transaction with metadata for ski trail check-ins
 * 
 * Requirements:
 * 1. Create transaction metadata using the CheckInData
 * 2. Build a transaction that sends 2 ADA back to the user (to create on-chain record)
 * 3. Return the unsigned transaction to the frontend for signing
 * 
 * Hints:
 * - Use Lucid (lucid-cardano) or Mesh SDK (@meshjs/core)
 * - Metadata should follow CIP-20 standard
 * - Transaction should include the metadata and 2 ADA payment
 */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { recipientAddress, trailId, trailName, difficulty } = req.body;

    // TODO: Validate required fields
    if (!recipientAddress || !trailId) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields' 
      });
    }

    // TODO: Create check-in data
    const checkInData: CheckInData = {
      trailId,
      trailName: trailName || `Trail ${trailId}`,
      difficulty: difficulty || 'Intermediate',
      checkInTime: new Date().toISOString(),
      walletAddress: recipientAddress
    };

    // TODO: Build transaction metadata
    const metadata = {
      [CARDANO_CONFIG.metadata.label]: {
        type: 'trail_checkin',
        ...checkInData
      }
    };

    // TODO: Build the actual Cardano transaction
    // You'll need to use Lucid or Mesh SDK here
    const unsignedTransaction = null; // Replace with actual transaction building

    // TODO: Return the unsigned transaction
    res.status(200).json({
      success: true,
      transaction: unsignedTransaction,
      metadata
    });

  } catch (error) {
    console.error('Error building check-in transaction:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to build transaction' 
    });
  }
}