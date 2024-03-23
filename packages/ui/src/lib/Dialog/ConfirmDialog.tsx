import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/HighlightOff';
import { ReactNode } from 'react';

export type ConfirmDialogProps = {
  title?: string;
  content: ReactNode | string;

  hideCancelButton?: boolean;
  cancelText?: string;
  submitText?: string;

  onCancel?: () => void;
  onSubmit?: () => void;
};

const styles = {
  Title: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
    height: '60px',
    paddingLeft: '60px',
    paddingRight: '60px',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  CancelIcon: {
    position: 'absolute',
    right: '6px',
    top: '10px'
  },
  Content: {
    padding: '12px 16px'
  },
  Button: {
    textTransform: 'none',
    borderRadius: '6px',
    fontWeight: 'bold'
  },
  PrimaryButton: {
    backgroundColor: '#0866FF'
  }
};

export function ConfirmDialog({
  title = 'Confirm',
  cancelText = 'Cancel',
  submitText = 'OK',
  hideCancelButton,
  content,
  onCancel,
  onSubmit
}: ConfirmDialogProps) {
  return (
    <>
      <DialogTitle
        data-testid={'confirm-dialog-title'}
        role={'heading'}
        sx={styles.Title}
      >
        {title}
        <IconButton
          data-testid={'confirm-dialog-cancel-icon-button'}
          sx={styles.CancelIcon}
          onClick={onCancel}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        data-testid={'confirm-dialog-content'}
        style={styles.Content}
      >
        {content}
      </DialogContent>
      <DialogActions>
        {!hideCancelButton && (
          <Button
            data-testid={'confirm-dialog-cancel-button'}
            onClick={onCancel}
            sx={styles.Button}
          >
            {cancelText}
          </Button>
        )}
        <Button
          data-testid={'confirm-dialog-submit-button'}
          variant={'contained'}
          disableElevation
          onClick={onSubmit}
          sx={{
            ...styles.Button,
            ...styles.PrimaryButton
          }}
        >
          {submitText}
        </Button>
      </DialogActions>
    </>
  );
}
