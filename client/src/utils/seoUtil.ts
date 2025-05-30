import { SEOProps } from "../SEO/FullOpenGraphSEO";

type seoDetailsType = {
  data?: SEOProps;
  path: URL;
  title: string;
};

export const getSEODetails = ({
  data,
  title,
  path,
}: seoDetailsType): SEOProps => {
  const url = `${path.origin}/#${path.pathname}`;
  let seo = { url, canonical: url } as SEOProps;
  if (data) {
    seo = { ...seo, ...data };
  }
  if (title) {
    seo = { ...seo, title };
  }
  return seo;
};
