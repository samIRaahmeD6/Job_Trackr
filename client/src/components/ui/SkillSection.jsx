const SkillSection = ({ title, children }) => {
  return (
    <div>
      <p className="text-gray-400 text-sm mb-2">{title}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
};

export default SkillSection