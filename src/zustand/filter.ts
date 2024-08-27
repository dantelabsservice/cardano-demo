import { SearchFilters } from "@/constants";
import create from "zustand";

export type GroomedTypes = "True" | "False";

type FilterState = {
  [SearchFilters.Difficulty]: string;
  [SearchFilters.Groomed]: GroomedTypes;
  [SearchFilters.MaxElevationGain]: number;
  setDifficulty: (category: string) => void;
  setGroomed: (groomed: GroomedTypes) => void;
  setMaxElevationGain: (maxElevationGain: number) => void;
};

const useFilterStore = create<FilterState>((set) => ({
  difficulty: "",
  groomed: "False",
  maxElevationGain: 2000,
  setDifficulty: (difficulty: string) => set({ difficulty }),
  setGroomed: (groomed: GroomedTypes) => set({ groomed }),
  setMaxElevationGain: (maxElevationGain: number) => set({ maxElevationGain }),
}));

export default useFilterStore;
