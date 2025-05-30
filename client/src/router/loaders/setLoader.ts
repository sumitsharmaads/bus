import { LoaderFunctionArgs } from "react-router-dom";
import { get } from "../../service";
import { SEOInterface } from "../../types";

export const setLoader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const path = url.pathname || "/";
  const encodedRoute = encodeURIComponent(path);
  try {
    const seo = await get<{
      success: boolean;
      data: SEOInterface;
    }>(`seo?path=${encodedRoute}`);
    if (seo.data.data) {
      return { seoData: seo.data.data, path: url };
    }
    return { seoData: null, path: url };
  } catch (error) {
    return { seoData: null, path: url };
  }
};
