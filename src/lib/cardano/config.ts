export const CARDANO_CONFIG = {
  network: 'preprod' as 'preprod' | 'mainnet',
  blockfrost: {
    projectId: process.env.BLOCKFROST_PROJECT_ID || 'preprodtest123', // You'll need a real one
  },
  metadata: {
    label: 'SkiTrailManager',
  }
};

// Trail badges that can be minted
export const TRAIL_BADGES = {
  'expert-trail': 'ExpertSkier',
  'extreme-trail': 'ExtremeSkier', 
  'backcountry': 'BackcountryExplorer'
};