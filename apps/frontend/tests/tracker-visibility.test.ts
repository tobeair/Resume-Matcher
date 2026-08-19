import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  getVisibleStatuses,
  loadHiddenStatuses,
  saveHiddenStatuses,
  TRACKER_HIDDEN_STATUSES_STORAGE_KEY,
} from '@/components/tracker/tracker-visibility';

describe('tracker column visibility', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('shows every status when no preference has been saved', () => {
    expect(loadHiddenStatuses()).toEqual(new Set());
    expect(getVisibleStatuses(new Set())).toHaveLength(7);
  });

  it('persists hidden statuses and restores them in canonical order', () => {
    saveHiddenStatuses(new Set(['rejected', 'applied']));

    expect(localStorage.getItem(TRACKER_HIDDEN_STATUSES_STORAGE_KEY)).toBe(
      JSON.stringify(['applied', 'rejected'])
    );
    expect(loadHiddenStatuses()).toEqual(new Set(['applied', 'rejected']));
    expect(getVisibleStatuses(loadHiddenStatuses())).not.toContain('applied');
  });

  it('ignores unknown statuses and safely handles malformed storage', () => {
    localStorage.setItem(
      TRACKER_HIDDEN_STATUSES_STORAGE_KEY,
      JSON.stringify(['interview', 'unknown-status'])
    );
    expect(loadHiddenStatuses()).toEqual(new Set(['interview']));

    localStorage.setItem(TRACKER_HIDDEN_STATUSES_STORAGE_KEY, '{broken');
    expect(loadHiddenStatuses()).toEqual(new Set());
  });

  it('does not break when browser storage rejects writes', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('blocked');
    });

    expect(() => saveHiddenStatuses(new Set(['saved']))).not.toThrow();
  });
});
