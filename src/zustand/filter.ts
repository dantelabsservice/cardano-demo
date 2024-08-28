import { DifficultyLevels, SearchFilters } from "@/constants";
import create from "zustand";

export type GroomedTypes = "True" | "False";

type FilterState = {
  [SearchFilters.NumberOfPeople]: number;
  [SearchFilters.Difficulty]: string;
  [SearchFilters.Groomed]: GroomedTypes;
  [SearchFilters.MaxElevationGain]: number;
  setNumberOfPeople: (numberOfPeople: number) => void;
  setDifficulty: (category: DifficultyLevels) => void;
  setGroomed: (groomed: GroomedTypes) => void;
  setMaxElevationGain: (maxElevationGain: number) => void;
};

const useFilterStore = create<FilterState>((set) => ({
  numberOfPeople: 1,
  difficulty: "",
  groomed: "False",
  maxElevationGain: 2000,
  setNumberOfPeople: (numberOfPeople: number) => set({ numberOfPeople }),
  setDifficulty: (difficulty: DifficultyLevels) => set({ difficulty }),
  setGroomed: (groomed: GroomedTypes) => set({ groomed }),
  setMaxElevationGain: (maxElevationGain: number) => set({ maxElevationGain }),
}));

export default useFilterStore;
