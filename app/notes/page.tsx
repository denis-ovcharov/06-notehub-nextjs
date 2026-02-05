"use client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../lib/api";
import NoteList from "../../components/NoteList/NoteList";
import Pagination from "../../components/Pagination/Pagination";
import css from "./page.module.css";
import { useState } from "react";
import Modal from "../../components/Modal/Modal";
import NoteForm from "../../components/NoteForm/NoteForm";
import { Toaster } from "react-hot-toast";
import { useDebouncedCallback } from "use-debounce";
import SearchBox from "../../components/SearchBox/SearchBox";

function Notes() {
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

export default Notes;
