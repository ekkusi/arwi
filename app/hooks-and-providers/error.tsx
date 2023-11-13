import { useCallback, useState } from "react";

// This is a workaround to throw a error that is caught by ErrorBoundary
export const useThrowCatchableError = () => {
  const [_, setState] = useState();

  const throwCatchableError = useCallback((error: Error) => {
    setState(() => {
      throw error;
    });
  }, []);

  return throwCatchableError;
};
