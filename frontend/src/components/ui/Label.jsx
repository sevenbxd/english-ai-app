export function Label({ children, className = "", ...props }) {
  return (
    <label
      className={"block mb-1 font-semibold " + className}
      {...props}
    >
      {children}
    </label>
  );
}
