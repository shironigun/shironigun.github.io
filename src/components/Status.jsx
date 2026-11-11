import { STATUS } from '../content/projects';

export default function Status({ status }) {
  const s = STATUS[status];
  if (!s) return null;
  return <span className={`status status-${s.tone}`}>{s.label}</span>;
}
