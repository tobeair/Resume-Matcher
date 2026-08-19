import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { ManageColumnsDialog } from '@/components/tracker/manage-columns-dialog';

vi.mock('@/lib/i18n', () => ({
  useTranslations: () => ({
    t: (key: string) => key,
  }),
}));

describe('ManageColumnsDialog', () => {
  it('shows every status and reports visibility changes', () => {
    const onToggleStatus = vi.fn();

    render(
      <ManageColumnsDialog
        open
        onOpenChange={vi.fn()}
        hiddenStatuses={new Set(['rejected'])}
        onToggleStatus={onToggleStatus}
      />
    );

    expect(screen.getAllByRole('checkbox')).toHaveLength(7);
    expect(screen.getByRole('checkbox', { name: 'tracker.columns.saved' })).toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'tracker.columns.rejected' })).not.toBeChecked();

    fireEvent.click(screen.getByRole('checkbox', { name: 'tracker.columns.applied' }));
    expect(onToggleStatus).toHaveBeenCalledWith('applied');
  });
});
