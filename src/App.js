import React, { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import Downloadprompt from "./components/downloadPrompt/Downloadprompt";
import ProtectedProvider from "./components/Protected/Protected";
import Pages from "./Navigations/pages";



export const LoadingContext = React.createContext(null);
function App() {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      <ProtectedProvider>
        <div className="App">
          <Downloadprompt/>
          <Pages />
        </div>
      </ProtectedProvider>
    </LoadingContext.Provider>
  );
}

export default App;
