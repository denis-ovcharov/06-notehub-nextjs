"use client";
import NoteList from "../../components/NoteList/NoteList";
import Pagination from "../../components/Pagination/Pagination";
import css from "./page.module.css";
import { useState } from "react";
import Modal from "../../components/Modal/Modal";
import NoteForm from "../../components/NoteForm/NoteForm";
import { Toaster } from "react-hot-toast";
import { useDebouncedCallback } from "use-debounce";
import SearchBox from "../../components/SearchBox/SearchBox";
import { useNotes } from "@/hooks/useNotes";

function NotesClient() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isSuccess } = useNotes(query, page);

  const updateQuery = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
      setPage(1);
    },
    1000,
  );

  const notes = data?.notes || [];
  const totalPages = data?.totalPages ?? 1;

  const handleOpenCreateModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox onSearch={updateQuery} />
          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              page={page}
              onPageChange={setPage}
            />
          )}
          <button className={css.button} onClick={handleOpenCreateModal}>
            Create note +
          </button>
        </header>
        {notes.length > 0 && isSuccess && <NoteList notes={notes} />}
      </div>
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <NoteForm onClose={handleCloseModal} />
        </Modal>
      )}
      <Toaster position="top-right" />
    </>
  );
}

export default NotesClient;
