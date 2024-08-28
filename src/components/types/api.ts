import { DifficultyLevels } from "@/constants";

export type LiftType = {
  id: string;
  name: string;
  capacity: number;
  elevationGain: number;
};

export type TrailType = {
  id: string;
  name: string;
  difficulty: DifficultyLevels;
  groomed: boolean;
  accessedByLifts: LiftType[];
};

export type AllTrailsQueryResultType = {
  allTrails: TrailType[];
};
