import React, { useState, useEffect } from "react";
export default function Downloadprompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    // Listen for the "beforeinstallprompt" event and save the event to a variable for later use
    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
    });

    // Listen for the "appinstalled" event to know when the app has been successfully installed
    window.addEventListener("appinstalled", () => {
      console.log("App installed!");
    });
  }, []);

  const handleInstallClick = () => {
    // Check if the deferredPrompt event is available and call prompt() to show the install prompt
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        console.log(choiceResult.outcome);
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        setDeferredPrompt(null);
      });
    }
  };

  return (
    <div>
      <h1>Welcome to My PWA</h1>
      <button
        style={{ display: deferredPrompt ? "block" : "none" }}
        onClick={handleInstallClick}
      >
        Install App
      </button>
    </div>
  );
}
