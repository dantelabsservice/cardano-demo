import useFilterStore from "@/zustand/filter";

/**
  * Hook to reset all filters to their default values
 * @returns {Object} resetFilters - Function to reset all filters to their default values
 */
export const useResetFilters = () => {
  const { setGroomed, setMaxElevationGain } = useFilterStore();

  const resetFilters = () => {
    setGroomed("False");
    setMaxElevationGain(2000);
  };

  return { resetFilters };
};
