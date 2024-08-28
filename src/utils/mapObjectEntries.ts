/**
 * Map object entries
 * @param obj 
 * @returns 
 */
export const mapObjectEntries = (obj: Object) => {
  return Object.entries(obj)
    .map(([key, value]) => ({ key, value }))
    .filter(
      ({ value, key }) =>
        typeof value === "string" && key !== "__typename" && key !== "id"
    );
};
