/** Singleton about + contact copy (Studio: About & Contact, document id `aboutPage`). */
export const aboutPageQuery = `*[_type == "aboutPage" && _id == "aboutPage"][0] {
  bio,
  statement,
  exhibitions[] { year, detail },
  publicationsNote,
  contact { email, location, instagram, website },
  contactPageLede,
  contactInquiryHeading,
  contactInquiryDisclaimer
}`;

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
    spaceAbove,
    spaceBelow,
    insetLeft,
    insetRight,
    insetHorizontal,
    printNumber,
    printSales
  }
}`;
