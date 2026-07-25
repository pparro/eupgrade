/* Locked brand mark: white checkmark on a solid green rounded-square tile.
   Do not modify without an explicit design pass (see BRIEF.md §1). */
export default function Logo({ size = 26 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      className="logo-mark"
      role="img"
      aria-label="eupgrade.me"
    >
      <rect x="2" y="2" width="36" height="36" rx="11" fill="#097A54" />
      <path
        d="M11 21 L17 27 L29 12"
        stroke="#fff"
        strokeWidth="4.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
