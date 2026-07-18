const AnalyzeButton = ({ onClick, loading, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className="mt-4 w-full border border-white/20 text-white py-2 rounded-xl hover:bg-white/10 transition disabled:opacity-40 disabled:cursor-not-allowed"
    >
      {loading ? "Analyzing..." : "Analyze match ↗"}
    </button>
  );
};

export default AnalyzeButton;