import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // 윈도우 포커스 시 자동 새로고침 비활성화
      retry: 2, // 실패한 쿼리 재시도 기본값은 3이지만 2회로 변경 가능
      staleTime: 1000, // 1초 후 데이터는 "stale"로 처리
    },
  },
});
