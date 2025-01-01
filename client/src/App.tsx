import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { LoaderContextProvider } from "./contexts/LoaderContext";

function App() {
  return (
    <LoaderContextProvider>
      <RouterProvider router={router} />
    </LoaderContextProvider>
  );
}

export default App;
