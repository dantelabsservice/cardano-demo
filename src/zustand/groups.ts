import { SearchFilters } from "@/constants";
import create from "zustand";

type GroupProps = {
  name: string;
  trailId: string;
  [SearchFilters.NumberOfPeople]: number;
};

type GroupState = {
  groups: GroupProps[];
  setGroups: (groups: GroupProps[]) => void;
};

const useGroupsStore = create<GroupState>((set) => ({
  groups: [],
  setGroups: (groups: GroupProps[]) => set({ groups }),
}));

export default useGroupsStore;
