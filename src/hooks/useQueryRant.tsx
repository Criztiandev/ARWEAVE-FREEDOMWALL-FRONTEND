import rantApi from "@/api/rant.api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";

const useQueryRant = () => {
  const [limit, setLimit] = useState<number>(10); // Set default limit

  const fetchRants = async ({ pageParam = 1 }) => {
    return rantApi.fetchAllRant(pageParam, limit);
  };

  const query = useInfiniteQuery({
    queryFn: fetchRants,
    queryKey: ["rants"],
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined; // Return undefined when there are no more pages
    },
    refetchInterval: 500,
  });

  return { query, setLimit };
};

export default useQueryRant;
