import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { router } from "./router";
import { LoaderContextProvider } from "./contexts/LoaderContext";

function App() {
  return (
    <HelmetProvider>
      <LoaderContextProvider>
        <RouterProvider router={router} />
      </LoaderContextProvider>
    </HelmetProvider>
  );
}

export default App;
