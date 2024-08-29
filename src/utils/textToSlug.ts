/**
 * Convert Text to Slug
 * @param text
 * @returns
 */
export const textToSlug = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};
