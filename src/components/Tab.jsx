export default function Tab({ label, children, onClick }) {
  return (
    <div data-label={label} onClick={onClick}>
      {children}
    </div>
  );
}
