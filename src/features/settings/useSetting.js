import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSetting() {
  const { isPending, data: setting } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });
  return { isPending, setting };
}
