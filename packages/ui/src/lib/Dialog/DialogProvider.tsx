import Dialog from '@mui/material/Dialog';
import { createContext, ReactNode, useContext, useRef, useState } from 'react';

type ProviderContext = readonly [(option: DialogOption) => void, () => void];

const EMPTY_FUNC = () => {
  /* empty */
};
const DialogContext = createContext<ProviderContext>([EMPTY_FUNC, EMPTY_FUNC]);
export const useDialog = () => useContext(DialogContext);

type DialogParams = {
  children: ReactNode;
  open: boolean;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onClose?: Function;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onExited?: Function;
};

type DialogOption = Omit<DialogParams, 'open'>;

type DialogContainerProps = DialogParams & {
  onClose: () => void;
  onKill: () => void;
};

function DialogContainer(props: DialogContainerProps) {
  const { children, open, onClose, onKill } = props;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionProps={{ onExited: onKill }}
      sx={{
        '& .MuiPaper-root': {
          borderRadius: '12px'
        },
        '& .MuiBackdrop-root': {
          // backgroundColor: 'rgba(0, 0, 0, 0.25)'
          backgroundColor: 'rgba(255, 255, 255, 0.7)'
        }
      }}
    >
      {children}
    </Dialog>
  );
}

export function DialogProvider({ children }: { children: ReactNode }) {
  const [dialogs, setDialogs] = useState<DialogParams[]>([]);
  const createDialog = (option: DialogOption) => {
    const dialog = { ...option, open: true };
    setDialogs((dialogs) => [...dialogs, dialog]);
  };
  const closeDialog = () => {
    setDialogs((dialogs) => {
      const latestDialog = dialogs.pop();
      if (!latestDialog) return dialogs;
      if (latestDialog.onClose) latestDialog.onClose();
      return [...dialogs].concat({ ...latestDialog, open: false });
    });
  };
  const contextValue = useRef([createDialog, closeDialog] as const);

  return (
    <DialogContext.Provider value={contextValue.current}>
      {children}
      {dialogs.map((dialog, i) => {
        const { onClose, ...dialogParams } = dialog;
        const handleKill = () => {
          if (dialog.onExited) dialog.onExited();
          setDialogs((dialogs) => dialogs.slice(0, dialogs.length - 1));
        };

        return (
          <DialogContainer
            key={i}
            onClose={closeDialog}
            onKill={handleKill}
            {...dialogParams}
          />
        );
      })}
    </DialogContext.Provider>
  );
}
