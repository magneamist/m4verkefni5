import { useState, useEffect } from "react";

interface FunFact {
  fact: string;
}

export function useCatFact() {
  const [funFact, setFunFact] = useState<string>("");

  const fetchFact = async () => {
    const response = await fetch("https://catfact.ninja/fact");
    const data: FunFact = await response.json();
    setFunFact(data.fact);
  };

  useEffect(() => {
    fetchFact();
  }, []);

  return { funFact, fetchFact };
}
