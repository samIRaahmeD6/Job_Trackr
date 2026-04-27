const SkillBadge = ({ label, type }) => {
  const styles = {
    match: "bg-[#EAF3DE] text-[#3B6D11]",
    missing: "bg-[#FCEBEB] text-[#A32D2D]",
    keyword: "bg-[#3a3a38] text-gray-400",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs ${styles[type]}`}>
      {label}
    </span>
  );
};
export default SkillBadge