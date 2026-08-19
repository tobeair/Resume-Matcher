'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useTranslations } from '@/lib/i18n';
import { APPLICATION_STATUS_ORDER, type ApplicationStatus } from '@/lib/api/tracker';

interface ManageColumnsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hiddenStatuses: ReadonlySet<ApplicationStatus>;
  onToggleStatus: (status: ApplicationStatus) => void;
}

export function ManageColumnsDialog({
  open,
  onOpenChange,
  hiddenStatuses,
  onToggleStatus,
}: ManageColumnsDialogProps) {
  const { t } = useTranslations();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className="border-b border-black p-6 pr-12">
          <DialogTitle>{t('tracker.manage.title')}</DialogTitle>
          <DialogDescription>{t('tracker.manage.description')}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-2 p-6">
          {APPLICATION_STATUS_ORDER.map((status) => (
            <label
              key={status}
              className="flex cursor-pointer items-center justify-between border border-black bg-background px-4 py-3 font-mono text-sm font-bold uppercase tracking-wide text-ink shadow-sw-xs"
            >
              <span>{t(`tracker.columns.${status}`)}</span>
              <input
                type="checkbox"
                checked={!hiddenStatuses.has(status)}
                onChange={() => onToggleStatus(status)}
                className="h-5 w-5 accent-blue-700"
              />
            </label>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
