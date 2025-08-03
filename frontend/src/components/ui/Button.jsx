export function Button({ children, className = "", variant = "default", ...props }) {
  let baseClasses =
    "px-4 py-2 rounded font-medium transition ";

  let variantClasses = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant] || variantClasses.default} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
