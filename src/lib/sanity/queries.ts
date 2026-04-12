/** Fetches all published projects with assets for the Work index and detail pages. */
export const projectsQuery = `*[_type == "project" && defined(slug.current)] | order(coalesce(order, 999) asc, title asc) {
  _id,
  title,
  "slug": slug.current,
  yearLabel,
  shortDescription,
  longDescription,
  kind,
  order,
  coverImage,
  images[] {
    _key,
    image,
    caption,
    printNumber,
    printSales
  }
}`;
