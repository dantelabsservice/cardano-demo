export type LiftType = {
  id: string;
  name: string;
  capacity: number;
  elevationGain: number;
};

export type TrailType = {
  id: string;
  name: string;
  difficulty: string;
  groomed: boolean;
  accessedByLifts: LiftType[];
};
