import { useEffect } from "react";
import { auth } from '../firebase'
import "firebase/auth";

function LogoutOnClose() {
  useEffect(() => {
    const handleBeforeUnload = () => {
      auth.signOut();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return null;
}

export default LogoutOnClose;