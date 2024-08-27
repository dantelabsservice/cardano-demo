/**
 * Convert Text to Slug
 * @param text
 * @returns
 */
export const textToSlug = (text: string) => {
  return text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};
