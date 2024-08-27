import { rem } from "polished";

export const FORM_INPUT_STYLE = {
  borderRadius: "lg",
  mainColor: "primary",
  px: "md",
  py: "sm",
  controlMarginY: "lg",
  border: `${rem(1)} solid`,
};

export const DIFFICULTY_OPTIONS = ["Beginner", "Intermediate", "Advanced", "Expert"];
export const GROOMED_OPTIONS = ["True", "False"];

export enum FormFields {
  NumberOfPeople = "numberOfPeople",
  SkillLevel = "skillLevel",
}

export enum SearchFilters {
  Difficulty = "difficulty",
  Groomed = "groomed",
  MaxElevationGain = "maxElevationGain",
}
