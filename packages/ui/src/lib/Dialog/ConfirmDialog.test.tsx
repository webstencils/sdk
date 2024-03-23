import { render, screen } from '@testing-library/react';
import { describe } from 'vitest';
import { ConfirmDialog } from './ConfirmDialog';

const TITLE_ID = 'confirm-dialog-title';
const CONTENT_ID = 'confirm-dialog-content';
const CLOSE_ICON_ID = 'confirm-dialog-cancel-icon-button';
const CANCEL_ID = 'confirm-dialog-cancel-button';
const SUBMIT_ID = 'confirm-dialog-submit-button';

describe('ConfirmDialog', () => {
  describe('title', () => {
    it('should display default title', async () => {
      render(<ConfirmDialog content={'Test Content'} />);
      await screen.findByTestId(TITLE_ID);
      expect(screen.getByTestId(TITLE_ID).textContent).toBe('Confirm');
    });

    it('should display custom title', async () => {
      render(<ConfirmDialog title={'Test Title'} content={'Test Content'} />);
      await screen.findByTestId(TITLE_ID);
      expect(screen.getByTestId(TITLE_ID).textContent).toBe('Test Title');
    });
  });

  describe('content', () => {
    it('should render custom text content', async () => {
      render(<ConfirmDialog content={'Test Content'} />);
      await screen.findByTestId(CONTENT_ID);
      expect(screen.getByTestId(CONTENT_ID).textContent).toBe('Test Content');
    });
  });

  describe('buttons', () => {
    it('should display default cancel button text', async () => {
      render(<ConfirmDialog content={'test'} />);
      await screen.findByTestId(CONTENT_ID);
      const cancelButton = screen.getByTestId(CANCEL_ID);
      expect(cancelButton).toBeDefined();
      expect(cancelButton.textContent).toBe('Cancel');
    });

    it('should display custom cancel button text', async () => {
      render(<ConfirmDialog content={'test'} cancelText={'Reject'} />);
      await screen.findByTestId(CONTENT_ID);
      const cancelButton = screen.getByTestId(CANCEL_ID);
      expect(cancelButton).toBeDefined();
      expect(cancelButton.textContent).toBe('Reject');
    });

    it('should hide the cancel button', async () => {
      render(<ConfirmDialog content={'test'} hideCancelButton={true} />);
      await screen.findByTestId(CONTENT_ID);
      const cancelButton = screen.queryByTestId(CANCEL_ID);
      expect(cancelButton).toBeNull();
    });

    it('should display default submit button text', async () => {
      render(<ConfirmDialog content={'test'} />);
      await screen.findByTestId(CONTENT_ID);
      const submitButton = screen.getByTestId(SUBMIT_ID);
      expect(submitButton.textContent).toBe('OK');
    });

    it('should display custom submit button text', async () => {
      render(<ConfirmDialog content={'test'} submitText={'Apply'} />);
      await screen.findByTestId(CONTENT_ID);
      const submitButton = screen.getByTestId(SUBMIT_ID);
      expect(submitButton.textContent).toBe('Apply');
    });

    it('should invoke cancel handler on the icon click', async () => {
      let cancelInvoked = false;

      render(
        <ConfirmDialog
          content={'Test Content'}
          onCancel={() => (cancelInvoked = true)}
        />
      );

      await screen.findByTestId(TITLE_ID);
      const iconButton = screen.getByTestId(CLOSE_ICON_ID);
      iconButton.click();
      expect(cancelInvoked).toBe(true);
    });

    it('should invoke submit handler on submit click', async () => {
      let submitInvoked = false;

      render(
        <ConfirmDialog
          content={'test'}
          onSubmit={() => (submitInvoked = true)}
        />
      );

      await screen.findByTestId(CONTENT_ID);
      screen.getByTestId(SUBMIT_ID).click();
      expect(submitInvoked).toBe(true);
    });

    it('should invoke cancel handler on cancel click', async () => {
      let cancelInvoked = false;

      render(
        <ConfirmDialog
          content={'test'}
          onCancel={() => (cancelInvoked = true)}
        />
      );

      await screen.findByTestId(CONTENT_ID);
      screen.getByTestId(CANCEL_ID).click();
      expect(cancelInvoked).toBe(true);
    });
  });
});
