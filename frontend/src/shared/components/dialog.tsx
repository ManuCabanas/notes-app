export function Dialog({ open, onClose, children }: { open: boolean, onClose: () => void, children: React.ReactNode }) {
  return <dialog open={open} onClose={onClose}>{children}</dialog>;
}