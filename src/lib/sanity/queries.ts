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

/** Singleton Home page copy (Studio: Home page, document id `homePage`). */
export const homePageQuery = `*[_type == "homePage" && _id == "homePage"][0] {
  title,
  showTitle,
  subheading,
  showSubheading
}`;

/** Shared projection for project documents (list + detail). */
export const projectFieldsProjection = `
  _id,
  title,
  "slug": slug.current,
  yearLabel,
  shortDescription,
  longDescription,
  kind,
  order,
  showOnHome,
  coverImage,
  spaceBetween,
  pairGap,
  images[] {
    _key,
    image,
    caption,
    insetLeft,
    insetRight,
    insetHorizontal,
    width,
    align,
    pairWithNext,
    pairRatio,
    pairAlignVertical,
    printNumber,
    printSales
  }
`;

/** Fetches projects for the Work index. Requires a client with `published` or `previewDrafts` perspective — not `raw`, or you get duplicate rows (draft + published). */
export const projectsQuery = `*[_type == "project" && defined(slug.current)] | order(coalesce(order, 999) asc, title asc) { ${projectFieldsProjection} }`;

/** Single project by slug (SSR preview routes). */
export const projectBySlugQuery = `*[_type == "project" && slug.current == $slug][0]{ ${projectFieldsProjection} }`;
