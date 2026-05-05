import type { UserStatus } from '../types/user';

type StatusBadgeProps = {
  status: UserStatus;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return <span className={`status-badge status-badge--${status.toLowerCase()}`}>{status}</span>;
}
