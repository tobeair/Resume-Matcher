import { APPLICATION_STATUS_ORDER, type ApplicationStatus } from '@/lib/api/tracker';

export const TRACKER_HIDDEN_STATUSES_STORAGE_KEY = 'tracker_hidden_statuses_v1';

const applicationStatuses = new Set<string>(APPLICATION_STATUS_ORDER);

export function loadHiddenStatuses(): Set<ApplicationStatus> {
  try {
    const stored = localStorage.getItem(TRACKER_HIDDEN_STATUSES_STORAGE_KEY);
    if (!stored) return new Set();

    const parsed: unknown = JSON.parse(stored);
    if (!Array.isArray(parsed)) return new Set();

    return new Set(
      parsed.filter(
        (status): status is ApplicationStatus =>
          typeof status === 'string' && applicationStatuses.has(status)
      )
    );
  } catch {
    return new Set();
  }
}

export function saveHiddenStatuses(hiddenStatuses: ReadonlySet<ApplicationStatus>): void {
  try {
    const orderedHiddenStatuses = APPLICATION_STATUS_ORDER.filter((status) =>
      hiddenStatuses.has(status)
    );
    localStorage.setItem(
      TRACKER_HIDDEN_STATUSES_STORAGE_KEY,
      JSON.stringify(orderedHiddenStatuses)
    );
  } catch {
    // The board remains usable when browser storage is blocked or unavailable.
  }
}

export function getVisibleStatuses(
  hiddenStatuses: ReadonlySet<ApplicationStatus>
): ApplicationStatus[] {
  return APPLICATION_STATUS_ORDER.filter((status) => !hiddenStatuses.has(status));
}
