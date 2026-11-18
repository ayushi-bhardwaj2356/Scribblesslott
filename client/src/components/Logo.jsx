export default function Logo({ size = 44 }) {
  return (
    <svg className="logo" width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <text
        x="32"
        y="42"
        textAnchor="middle"
        fontFamily="Playfair Display, Georgia, serif"
        fontSize="32"
        fill="currentColor"
      >
        S
      </text>
    </svg>
  );
}
