import { Helmet } from "react-helmet-async";
import { useWebsite } from "../contexts/WebsiteProvider";

type BasicSEOProps = {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  image?: string;
  url?: string;
};

const BasicSEO: React.FC<BasicSEOProps> = ({
  title: heading,
  description,
  keywords,
  canonical,
}) => {
  const { websiteInfo } = useWebsite();
  return (
    <Helmet>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      {heading && <title>{heading}</title>}
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      {canonical && <link rel="canonical" href={canonical} />}
      {websiteInfo?.brandname && (
        <meta name="author" content={websiteInfo?.brandname} />
      )}
      <meta name="language" content="en" />
      <meta httpEquiv="content-language" content="en" />
    </Helmet>
  );
};

export default BasicSEO;
