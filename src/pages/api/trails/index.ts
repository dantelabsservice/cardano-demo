import { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse, Trail } from '../../../lib/types';

const mockTrails: Trail[] = [
  {
    id: '1',
    name: 'Bunny Slope',
    difficulty: 'Beginner',
    location: 'North Face',
    length: 0.5,
    elevation: 50
  },
  {
    id: '2', 
    name: 'Black Diamond',
    difficulty: 'Expert',
    location: 'Western Bowl',
    length: 3.5,
    elevation: 650,
    requiresBadge: true
  },
  {
    id: '3',
    name: 'Extreme Couloir',
    difficulty: 'Extreme', 
    location: 'Backcountry',
    length: 4.2,
    elevation: 850,
    requiresBadge: true
  }
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Trail[]>>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  res.status(200).json({
    success: true,
    data: mockTrails
  });
}