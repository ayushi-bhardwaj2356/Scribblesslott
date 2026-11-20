export default function Logo({ size = 44 }) {
  return (
    <img
      className="logo"
      src="/images/logo.jpg"
      alt=""
      width={size}
      height={size}
      style={{ width: size, height: size }}
    />
  );
}
