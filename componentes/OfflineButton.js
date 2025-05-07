import { useState, useEffect } from "react";
import { isIOS } from "react-device-detect";
import Link from "next/link";
import { toast, Toaster } from "react-hot-toast";

const OfflineButton = () => {
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [showIosButton, setShowIosButton] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    if (isIOS) {
      setShowIosButton(true);
    }
  }, []);
  useEffect(() => {
    const ready = (e) => {
      console.log("ready", e);
      e.preventDefault();
      console.log("ready", e);
      setDeferredPrompt(e);
      toast.success("ready", e);
      setShowInstallButton(true);
    };

    window.addEventListener("beforeinstallprompt", ready);
    return () => {
      window.removeEventListener("beforeinstallprompt", ready);
    };
  }, []);

  const installApp = () => {
    // Show the install prompt
    console.log("installApp");
    if (deferredPrompt) {
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the A2HS prompt");
        } else {
          console.log("User dismissed the A2HS prompt");
        }
        setDeferredPrompt(null);
      });
    }
  };

  return (
    <div className="promotionbanner mt-4 bg-transparent w-full flex justify-center items-center text-black">
      {showInstallButton && (
        <button
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105" 
          onClick={() => installApp()}
        >
          Instalar para uso offline.
        </button>
      )}
      {showIosButton && (
        <Link href="/ios" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105" >
            Instalar para uso offline IOS
        </Link>
      )}
    </div>
  );
};

export default OfflineButton;