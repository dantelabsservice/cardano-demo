import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { walletAddress } = req.query;

    if (!walletAddress || typeof walletAddress !== 'string') {
      return res.status(400).json({ error: 'Valid wallet address is required' });
    }

    // Mock data - in real app, query blockchain for transactions with this wallet address
    const mockCheckIns = [
      {
        trail: 'Black Diamond',
        difficulty: 'Expert',
        timestamp: new Date(Date.now() - 86400000).toLocaleString(), // 1 day ago
        transactionId: 'tx_abc123def'
      },
      {
        trail: 'Bluebird Run', 
        difficulty: 'Intermediate',
        timestamp: new Date(Date.now() - 172800000).toLocaleString(), // 2 days ago
        transactionId: 'tx_ghi456jkl'
      }
    ];

    res.status(200).json({
      success: true,
      data: {
        walletAddress,
        checkIns: mockCheckIns,
        totalCheckins: mockCheckIns.length
      }
    });
  } catch (error) {
    console.error('History fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch check-in history' });
  }
}