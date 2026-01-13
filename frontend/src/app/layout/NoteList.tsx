import styled from "styled-components";
import { useMemo, useState } from "react";
import { useGetNotesByStatusQuery } from "../../store/noteApi";
import { useGetCategoriesQuery } from "../../store/categoryApi";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { NoteContainer } from "../../shared/components/NoteContainer";
import { Drawer } from "../../shared/components/Drawer";
import { Selector } from "../../shared/components/ui/Selector";

export function NoteList() {
  const notesStatus = useSelector((state: RootState) => state.ui.notesStatus);

  const { data: notes, isLoading, isFetching, isError } =
    useGetNotesByStatusQuery(notesStatus);
  const { data: categories = [] } = useGetCategoriesQuery();

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  // Filter notes by category
  const filteredNotes = useMemo(() => {
    if (!notes) return [];
    if (!categoryFilter) return notes;
    return notes.filter((note) => note.category?.id === categoryFilter);
  }, [notes, categoryFilter]);

  const editingNote = useMemo(() => {
    if (!editingId) return null;

    const n = notes?.find((x) => x.id === editingId);
    if (!n) return null;

    return {
      id: n.id,
      title: n.title ?? "",
      content: n.content ?? "",
      categoryId: n.category?.id,
    };
  }, [notes, editingId]);

  // Build filter options - must be before early returns to respect Rules of Hooks
  const filterOptions = useMemo(() => {
    if (!notes) return [];
    
    const options = categories.map((cat) => ({
      value: cat.id,
      label: `${cat.name} (${notes.filter((n) => n.category?.id === cat.id).length})`,
      color: cat.color,
    }));
    
    // Add uncategorized option
    const uncategorizedCount = notes.filter((n) => !n.category).length;
    if (uncategorizedCount > 0) {
      options.push({
        value: "uncategorized",
        label: `Uncategorized (${uncategorizedCount})`,
        color: "#9CA3AF",
      });
    }
    
    return options;
  }, [categories, notes]);

  const handleEdit = (id: string) => {
    setEditingId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingId(null);
  };

  if (isLoading) {
    return (
      <StateContainer>
        <StateCard>
          <StateIcon>
            <LoadingSpinner />
          </StateIcon>
          <StateTitle>Loading your notes...</StateTitle>
          <StateText>Please wait while we fetch everything</StateText>
        </StateCard>
      </StateContainer>
    );
  }

  if (isError) {
    return (
      <StateContainer>
        <StateCard $variant="error">
          <StateIcon>
            <ErrorIcon />
          </StateIcon>
          <StateTitle>Something went wrong</StateTitle>
          <StateText>
            We couldn't load your notes. Please try again.
          </StateText>
        </StateCard>
      </StateContainer>
    );
  }

  if (!notes?.length) {
    return (
      <StateContainer>
        <StateCard>
          <StateIcon>
            <EmptyIcon />
          </StateIcon>
          <StateTitle>
            {notesStatus === "ACTIVE" ? "No notes yet" : "No archived notes"}
          </StateTitle>
          <StateText>
            {notesStatus === "ACTIVE"
              ? "Start by creating your first note using the button above"
              : "Notes you archive will appear here"}
          </StateText>
        </StateCard>
      </StateContainer>
    );
  }

  return (
    <>
      {/* Filter Bar */}
      <FilterBar>
        <FilterSection>
          <FilterIcon>
            <FilterSvg />
          </FilterIcon>
          <FilterLabel>Filter by category</FilterLabel>
          <SelectorWrapper>
            <Selector
              value={categoryFilter ?? ""}
              onChange={(value) => setCategoryFilter(value || null)}
              options={filterOptions}
              placeholder={`All Notes (${notes.length})`}
            />
          </SelectorWrapper>
        </FilterSection>
        
        {categoryFilter && (
          <ClearFilter onClick={() => setCategoryFilter(null)}>
            <ClearIcon />
            Clear
          </ClearFilter>
        )}
      </FilterBar>

      {/* Notes Grid */}
      {filteredNotes.length === 0 ? (
        <StateContainer>
          <StateCard>
            <StateIcon>
              <FilterEmptyIcon />
            </StateIcon>
            <StateTitle>No notes in this category</StateTitle>
            <StateText>
              Try selecting a different category or clear the filter
            </StateText>
          </StateCard>
        </StateContainer>
      ) : (
        <NotesGrid $isFetching={isFetching}>
          {(categoryFilter === "uncategorized" 
            ? notes.filter((n) => !n.category)
            : filteredNotes
          ).map((note) => (
            <NoteContainer
              key={note.id}
              note={note}
              notesStatus={notesStatus}
              onEdit={handleEdit}
            />
          ))}
        </NotesGrid>
      )}

      <Drawer
        open={open}
        onClose={handleClose}
        title={editingNote ? "Edit your note" : "Write your note!"}
        notesStatus={notesStatus}
        editingNote={editingNote}
      />
    </>
  );
}

/* ===== Styled Components ===== */

const FilterBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-md);
  
  max-width: 1400px;
  margin: 0 auto;
  padding: var(--space-lg) var(--space-xl) 0;
`;

const FilterSection = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-sm);
`;

const FilterIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-muted);
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

const FilterLabel = styled.span`
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-secondary);
`;

const SelectorWrapper = styled.div`
  width: 220px;
`;

const ClearFilter = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  
  padding: 6px 12px;
  
  border: none;
  border-radius: var(--radius-md);
  background: transparent;
  
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-muted);
  
  cursor: pointer;
  transition: all var(--transition-fast);
  
  &:hover {
    color: var(--color-primary);
    background: var(--color-primary-glow);
  }
  
  svg {
    width: 14px;
    height: 14px;
  }
`;

const NotesGrid = styled.div<{ $isFetching: boolean }>`
  padding: var(--space-xl);
  
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--space-xl);
  justify-items: center;
  
  max-width: 1400px;
  margin: 0 auto;
  
  opacity: ${({ $isFetching }) => ($isFetching ? 0.7 : 1)};
  transition: opacity var(--transition-fast);
`;

const StateContainer = styled.div`
  min-height: calc(100vh - 200px);
  
  display: flex;
  align-items: center;
  justify-content: center;
  
  padding: var(--space-xl);
`;

const StateCard = styled.div<{ $variant?: "error" }>`
  max-width: 400px;
  padding: var(--space-2xl) var(--space-xl);
  
  background: var(--color-bg-elevated);
  border: 1px solid ${({ $variant }) => 
    $variant === "error" ? "rgba(220, 38, 38, 0.2)" : "var(--color-border)"};
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  
  text-align: center;
`;

const StateIcon = styled.div`
  margin-bottom: var(--space-md);
  
  svg {
    width: 64px;
    height: 64px;
    color: var(--color-text-muted);
  }
`;

const StateTitle = styled.h3`
  font-family: var(--font-display);
  font-size: 26px;
  font-weight: 400;
  color: var(--color-text-primary);
  margin: 0 0 var(--space-sm);
`;

const StateText = styled.p`
  font-family: var(--font-body);
  font-size: 15px;
  color: var(--color-text-muted);
  margin: 0;
  line-height: 1.5;
`;

/* ===== Icons ===== */

const LoadingSpinner = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <style>{`
      @keyframes spin { to { transform: rotate(360deg); } }
      .spinner { animation: spin 1s linear infinite; transform-origin: center; }
    `}</style>
    <circle className="spinner" cx="12" cy="12" r="10" strokeDasharray="31.4 31.4" strokeLinecap="round" />
  </svg>
);

const ErrorIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
  </svg>
);

const EmptyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

const FilterEmptyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
  </svg>
);

const ClearIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
  </svg>
);

const FilterSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 01.628.74v2.288a2.25 2.25 0 01-.659 1.59l-4.682 4.683a2.25 2.25 0 00-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 018 18.25v-5.757a2.25 2.25 0 00-.659-1.591L2.659 6.22A2.25 2.25 0 012 4.629V2.34a.75.75 0 01.628-.74z" clipRule="evenodd" />
  </svg>
);
