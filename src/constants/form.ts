import { rem } from "polished";

export const FORM_INPUT_STYLE = {
  borderRadius: "lg",
  mainColor: "primary",
  px: "md",
  py: "sm",
  controlMarginY: { base: "sm", md: "lg" },
  border: `${rem(1)} solid`,
};

export enum DifficultyLevels {
  Beginner = "Beginner",
  Intermediate = "Intermediate",
  Advanced = "Advanced",
  Expert = "Expert",
}

export const DIFFICULTY_OPTIONS = [
  DifficultyLevels.Beginner,
  DifficultyLevels.Intermediate,
  DifficultyLevels.Advanced,
  DifficultyLevels.Expert,
];
export const GROOMED_OPTIONS = ["True", "False"];

export enum SearchFilters {
  NumberOfPeople = "numberOfPeople",
  Difficulty = "difficulty",
  Groomed = "groomed",
  MaxElevationGain = "maxElevationGain",
}

export const TRAIL_PROPS_LABELS = {
  groupName: "Group name",
  difficulty: "Difficulty level",
  groomed: "Groomed",
  capacity: "Capacity",
  maxElevationGain: "Elevation gain",
  numberOfPeople: "Number of people",
};
