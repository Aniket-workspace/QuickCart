const convertedToSlug = (title) => {
    return title
      .toLowerCase() // Convert to lowercase
      .trim() // Remove leading and trailing spaces
      .replace(/[\s_]+/g, "-") // Replace spaces and underscores with hyphens
      .replace(/[^\w\-]+/g, "") // Remove all non-word characters
      .replace(/\-\-+/g, "-") // Replace multiple hyphens with a single one
      .replace(/^-+|-+$/g, ""); // Remove leading and trailing hyphens
  };
  
  export const useTitleToSlug = (title) => convertedToSlug(title);
  