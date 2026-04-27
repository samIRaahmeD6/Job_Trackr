const Button = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  className = "",
  ...props
}) => {
  const base = "rounded-lg font-medium flex items-center justify-center cursor-pointer";

  const variants = {
    primary: "bg-[#30302e] text-white rounded-lg border-white/12 border-1 hover:bg-white/10",
    secondary: "bg-[#141413] text-white rounded-lg border-white/12 border-1 hover:bg-[#30302e]",
    danger: "bg-[#30302e] text-white hover:bg-[#30302e] rounded-4xl",
  };

  const sizes = {
    sm: "px-2 py-1 text-sm",
    md: "px-6 py-2 text-md",
    lg: "px-10 py-3 text-lg",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;