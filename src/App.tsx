import { Home } from "@/pages/Home";
import "./App.css";
import Result from "./pages/Result";
import { Suspense } from "react";

function App() {
  return (
    <>
      <div>
        <Suspense fallback={<div>...loading</div>}>
          <Home />
          <Result />
        </Suspense>
      </div>
    </>
  );
}

export default App;
