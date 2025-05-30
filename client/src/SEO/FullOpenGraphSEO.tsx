import { Helmet } from "react-helmet-async";
import { useWebsite } from "../contexts/WebsiteProvider";

export interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  image?: string;
  url?: string;
}

const FullOpenGraphSEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  canonical,
  image = "https://dadhichbus.com/images/share-banner.jpg",
  url = typeof window !== "undefined" ? window.location.href : "",
}) => {
  const { websiteInfo } = useWebsite();
  return (
    <Helmet>
      <title>{title}</title>

      {/* Basic Meta */}
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={description || ""} />
      <meta
        name="keywords"
        content={keywords || "travel, tour, booking, bus services"}
      />
      <meta name="robots" content="index, follow" />
      {websiteInfo?.brandname && (
        <meta name="author" content={websiteInfo?.brandname} />
      )}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Social Sharing: Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description || ""} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Dadhich Bus Services" />
      <meta property="og:locale" content="en_IN" />

      {/* Social Sharing: Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description || ""} />
      <meta name="twitter:image" content={image} />

      {/* Advanced Mobile Support */}
      <meta name="theme-color" content="#C22A54" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />

      {/* Language */}
      <meta name="language" content="en" />
      <meta httpEquiv="content-language" content="en" />
    </Helmet>
  );
};

export default FullOpenGraphSEO;
