import rantApi from "@/api/rant.api";
import { useQuery } from "@tanstack/react-query";

const useRant = () => {
  const query = useQuery({
    queryFn: async () => rantApi.fetchAllRant(),
    queryKey: ["rants"],
  });

  return { query };
};

export default useRant;
