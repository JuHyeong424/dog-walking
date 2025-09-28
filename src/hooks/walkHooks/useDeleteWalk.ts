import {useMutation, useQueryClient} from "@tanstack/react-query";

const deleteWalkAPI = async (id: string)=> {
  const res = await fetch("/api/walk", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "산책 기록 삭제에 실패했습니다.");
  }

  return res.json();
}

export function useDeleteWalk() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteWalkAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["walkHistory"] });
      console.log("산책 기록이 성공적으로 삭제되어 목록을 갱신합니다.");
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  return mutation;
}