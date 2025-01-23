// Rename to avoid confusion with hooks
export const convertTitleToSlug = (title) => {
  if (!title || typeof title !== "string") return ""; // Handle invalid input
  return title
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+|-+$/g, "");
};
