import { useQuery } from "@tanstack/react-query";
import { getCurrnetUser } from "../../services/apiAuth";

export function useCurrentUser() {
  const { data: user, isPending } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrnetUser,
  });

  return { user, isPending, isAuthenticated: user?.role === "authenticated" };
}
