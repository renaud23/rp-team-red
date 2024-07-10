import { useEffect, useRef, useState } from "react";

export function useSingle<U>(todo: () => U) {
  const done = useRef(false);
  const [result, setResult] = useState<U>();

  useEffect(() => {
    if (!done.current) {
      setResult(todo());
      done.current = true;
    }
  }, [todo]);

  return result;
}
