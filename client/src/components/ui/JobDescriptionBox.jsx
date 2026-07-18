const JobDescriptionBox = ({ text, onChange }) => {
  return (
    <div
      contentEditable
      suppressContentEditableWarning
      className="h-48 overflow-y-auto p-4 rounded-xl border border-white/10 text-gray-300 text-sm leading-6 outline-none"
      onInput={(e) => onChange(e.currentTarget.textContent)}
    >
      {text}
    </div>
  );
};

export default JobDescriptionBox;