import { useMemo } from "react";
import { useNavigate } from "react-router";

export const useRouter = () => {
  const navigate = useNavigate();

  return useMemo(() => {
    return {
      push: (path: string) => {
        navigate(path);
      },
      replace: (path: string) => {
        navigate(path, { replace: true });
      },
      goBack: () => {
        navigate(-1);
      },
      goForward: () => {
        navigate(1);
      },
      reload: () => {
        window.location.reload();
      },
    };
  }, [navigate]);
};
