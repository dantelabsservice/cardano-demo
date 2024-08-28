/**
 * Capitalize the first letter of a string
 * @param str 
 * @returns 
 */
export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}