import { fetchNotes } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

function Notes() {
    const [query, setQuery] = useState("");
      const [page, setPage] = useState(1);
      const [isModalOpen, setIsModalOpen] = useState(false);
    
      const { data, isSuccess } = useQuery({
        queryKey: ["notes", query, page],
        queryFn: () => fetchNotes(query, page),
        placeholderData: keepPreviousData,
      });
      const updateQuery = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
      setPage(1);
    },
    1000,
  );
    return ()
}
