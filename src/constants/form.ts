import { rem } from "polished";

export const FORM_INPUT_STYLE = {
  borderRadius: "lg",
  mainColor: "primary",
  px: "md",
  py: "sm",
  controlMarginY: {base: "sm", md: "lg"},
  border: `${rem(1)} solid`,
};

export const DIFFICULTY_OPTIONS = ["Beginner", "Intermediate", "Advanced", "Expert"];
export const GROOMED_OPTIONS = ["True", "False"];

export enum SearchFilters {
  NumberOfPeople = "numberOfPeople",
  Difficulty = "difficulty",
  Groomed = "groomed",
  MaxElevationGain = "maxElevationGain",
}
