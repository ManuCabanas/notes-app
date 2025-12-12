import { useEffect, useState } from "react";
import type { Note, NoteStatus } from "../api";

interface UseNotesOptions {
  status?: NoteStatus;
}

export function useNotes({status= 'ACTIVE'}: UseNotesOptions={}) {
    const [notes, setNotes] = useState<Note[]>([]);
    const [isLoading, setLoading] = useState(false);
    

}

