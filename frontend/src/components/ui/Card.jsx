export function Card({ children, className = "", ...props }) {
  return (
    <div
      className={
        "border rounded shadow-sm bg-white p-4 " + className
      }
      {...props}
    >
      {children}
    </div>
  );
}

export function CardContent({ children, className = "", ...props }) {
  return (
    <div className={"space-y-2 " + className} {...props}>
      {children}
    </div>
  );
}
