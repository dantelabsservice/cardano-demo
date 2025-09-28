import { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse } from '../../../lib/types';

/**
 * ASSESSMENT TASK 3: Blockchain Queries
 * 
 * Your goal: Query Cardano blockchain for user's check-in history and assets
 * 
 * Requirements:
 * 1. Fetch transactions for a given address
 * 2. Filter for Ski Trail Manager check-in transactions
 * 3. Return user's check-in history and any badge NFTs
 * 
 * Hints:
 * - Use Blockfrost API to query address transactions
 * - Filter transactions by metadata label 'SkiTrailManager'
 * - Parse metadata to get check-in details
 */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { address } = req.query;

    // TODO: Validate address
    if (!address || typeof address !== 'string') {
      return res.status(400).json({ 
        success: false, 
        error: 'Valid Cardano address is required' 
      });
    }

    // TODO: Fetch transactions from Blockfrost API
    const transactions: any[] = []; // Replace with actual Blockfrost query

    // TODO: Filter for Ski Trail Manager transactions
    const checkInTransactions = transactions.filter((tx: any) => {
      // Filter logic based on metadata
      return false; // Replace with actual filtering
    });

    // TODO: Parse transaction metadata
    const checkIns = checkInTransactions.map((tx: any) => {
      return {
        txHash: tx.hash,
        // Add check-in details from metadata
      };
    });

    res.status(200).json({
      success: true,
      data: {
        address,
        checkIns,
        totalCheckins: checkIns.length,
        badges: [] // TODO: Add any badge NFTs found
      }
    });

  } catch (error) {
    console.error('Error fetching user assets:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch user data' 
    });
  }
}