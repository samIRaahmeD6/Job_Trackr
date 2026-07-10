import CircularProgress from "./CircularProgress";
import SkillSection from "./SkillSection";
import SkillBadge from "./SkillBadge";

const MatchScoreSection = ({ result }) => {
  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center h-48 text-gray-500 text-sm">
        Paste a job description and click "Analyze match" to see your results.
      </div>
    );
  }

  const {
    matchPercentage = 0,
    matchedSkills = [],
    missingSkills = [],
    importantKeywords = [],
  } = result;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-center">
        <CircularProgress value={matchPercentage} />
      </div>

      <SkillSection title="Matched skills">
        {matchedSkills.length ? (
          matchedSkills.map((skill) => (
            <SkillBadge key={skill} label={skill} type="match" />
          ))
        ) : (
          <p className="text-xs text-gray-500">None found</p>
        )}
      </SkillSection>

      <SkillSection title="Missing skills">
        {missingSkills.length ? (
          missingSkills.map((skill) => (
            <SkillBadge key={skill} label={skill} type="missing" />
          ))
        ) : (
          <p className="text-xs text-gray-500">None — great match!</p>
        )}
      </SkillSection>

      <SkillSection title="Important keywords">
        {importantKeywords.length ? (
          importantKeywords.map((word) => (
            <SkillBadge key={word} label={word} type="keyword" />
          ))
        ) : (
          <p className="text-xs text-gray-500">—</p>
        )}
      </SkillSection>
    </div>
  );
};

export default MatchScoreSection;