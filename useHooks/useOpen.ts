import { useCallback, useState } from "react";

interface Res {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useOpen = (initial: boolean = false): Res => {
  const [open, setOpen] = useState<boolean>(initial);

  const onOpen = useCallback(() => setOpen(true), []);
  const onClose = useCallback(() => setOpen(false), []);
  return {
    open,
    onOpen,
    onClose,
  };
};

export default useOpen;
