import CircularProgress from "./CircularProgress";
import SkillSection from "./SkillSection";
import SkillBadge from "./SkillBadge";
const MatchScoreSection = () => {
  return (
    <div className="flex flex-col gap-5">
      
      <div className="flex justify-center">
        <CircularProgress value={72} />
      </div>

      <SkillSection title="Matched skills">
        <SkillBadge label="React" type="match" />
        <SkillBadge label="TypeScript" type="match" />
        <SkillBadge label="Next.js" type="match" />
        <SkillBadge label="REST APIs" type="match" />
      </SkillSection>

      <SkillSection title="Missing skills">
        <SkillBadge label="Redux" type="missing" />
        <SkillBadge label="GraphQL" type="missing" />
        <SkillBadge label="System Design" type="missing" />
        <SkillBadge label="Docker" type="missing" />
      </SkillSection>

      <SkillSection title="Important keywords">
        <SkillBadge label="AWS" type="keyword" />
        <SkillBadge label="CI/CD" type="keyword" />
        <SkillBadge label="Agile" type="keyword" />
      </SkillSection>

    </div>
  );
};

export default MatchScoreSection