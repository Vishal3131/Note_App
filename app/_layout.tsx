import { Slot } from "expo-router";
import { useEffect, useState } from "react";
import Splash from "./Splash";

export default function RootLayout() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  if (loading) return <Splash/>  // Show splash first

  return <Slot/>  // Load (tabs) layout after splash

}
