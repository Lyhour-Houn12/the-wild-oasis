import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";
import toast from "react-hot-toast";
export function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateSetting } = useMutation({
    mutationFn: (data) => updateSettingApi(data),
    onSuccess: () => {
      toast.success("Setting successfully updated");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: () => toast.error("Setting could not be loaded"),
  });

  return { isUpdating, updateSetting };
}
