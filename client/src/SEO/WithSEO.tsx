import React, { ComponentType, useMemo } from "react";
import { useLoaderData, useLocation } from "react-router-dom";
import FullOpenGraphSEO, { SEOProps } from "../SEO/FullOpenGraphSEO";
import { getSEODetails } from "../utils/seoUtil";

type WithSEOOptions = {
  title?: string;
};

function WithSEO<T extends JSX.IntrinsicAttributes>(
  WrappedComponent: ComponentType<T>,
  options: WithSEOOptions = {}
) {
  const ComponentWithSEO = (props: T) => {
    const seo = useLoaderData() as { seo: SEOProps; path: URL } | null;
    const location = useLocation();

    const seoData = useMemo(() => {
      return getSEODetails({
        data: seo?.seo,
        path: seo?.path || new URL(location.pathname, window.location.origin),
        title: options.title || "Dadhich Bus Services",
      });
    }, [seo, location.pathname]);

    return (
      <>
        <FullOpenGraphSEO {...seoData} />
        <WrappedComponent {...props} />
      </>
    );
  };

  return ComponentWithSEO;
}

export default WithSEO;
