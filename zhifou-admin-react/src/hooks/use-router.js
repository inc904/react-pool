import { useMemo } from "react";
import { useNavigate } from "react-router";

export const useRouter = () => {
  const navigate = useNavigate();

  return useMemo(() => {
    return {
      push: (path) => navigate(path),
      replace: (path) => navigate(path, { replace: true }),
      goBack: () => navigate(-1),
      goForward: () => navigate(1),
      reload: () => navigate(0),
    };
  }, [navigate]);
};
