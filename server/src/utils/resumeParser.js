const clean = (text = "") => {
  if (!text || typeof text !== "string") return "";

  return text
    .replace(/[^\x00-\x7F]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

// ── SECTION EXTRACTOR ──
const getSection = (text = "", start, end) => {
  if (!text || typeof text !== "string") return "";

  const regex = new RegExp(
    `${start}([\\s\\S]*?)(${end || "$"})`,
    "i"
  );

  const match = text.match(regex);

  if (!match || !match[1]) return "";

  return clean(match[1]);
};
// ── SKILLS ──
export const extractSkills = (text = "") => {
  const section = getSection(
    text,
    "TECHNICAL SKILLS",
    "WORK EXPERIENCE|EXPERIENCE|PROJECTS|EDUCATION"
  );

  const skills = [];

  const items = section.split(/[,|•]/).map(s => s.trim()).filter(Boolean);

  items.forEach((s) => {
    if (s.length > 1) {
      skills.push({
        name: s,
        level: "intermediate"
      });
    }
  });

  return skills;
};

// ── EXPERIENCE ──
export const extractExperience = (text = "") => {
  const sectionMatch = text.match(
    /WORK EXPERIENCE|EXPERIENCE([\s\S]*?)PROJECTS|EDUCATION|$/
  );

  if (!sectionMatch) return [];

  const section = sectionMatch[1] || "";

  const blocks = section
    .split(/\n|·/)
    .map(l => l.trim())
    .filter(Boolean);

  const experiences = [];

  let current = null;

  for (const line of blocks) {
    const isRole =
      /developer|engineer|intern|manager|lead|full stack/i.test(line);

    const isDate =
      /\b(20\d{2})\b|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/i.test(
        line.toLowerCase()
      );

    if (isRole) {
      if (current) experiences.push(current);

      current = {
        title: line,
        company: "",
        startDate: "",
        endDate: "",
      };
    } else if (current && !current.company && !isDate) {
      current.company = line;
    } else if (current && isDate) {
      const parts = line.split("–");
      current.startDate = parts[0]?.trim() || "";
      current.endDate = parts[1]?.trim() || "";
    }
  }

  if (current) experiences.push(current);

  return experiences;
};
// ── PROJECTS ──
export const extractProjects = (text = "") => {
  const section = getSection(
    text,
    "PROJECTS",
    "EDUCATION|PUBLICATIONS|$"
  );

  const lines = section.split("\n").map(l => l.trim()).filter(Boolean);

  const projects = [];

  let current = null;

  for (const l of lines) {
    if (l.includes("GitHub") || l.includes("View")) continue;

    if (l.length > 5 && !current) {
      current = {
        title: l,
        techStack: "",
        date: ""
      };
    } else if (current && !current.techStack) {
      current.techStack = l;
      projects.push(current);
      current = null;
    }
  }

  if (current) projects.push(current);

  return projects;
};

// ── EDUCATION ──
export const extractEducation = (text = "") => {
  const section = getSection(
    text,
    "EDUCATION",
    "PUBLICATIONS|$"
  );

  const lines = section.split("\n").map(l => l.trim()).filter(Boolean);

  const edu = [];

  let current = null;

  for (const l of lines) {
    if (/b\.sc|msc|bachelor|master|university/i.test(l)) {
      current = {
        degree: l,
        field: "",
        institution: ""
      };
      edu.push(current);
    } else if (current && !current.institution) {
      current.institution = l;
    }
  }

  return edu;
};

// ── MAIN ──
export const parseResumeText = (text = "") => {
  return {
    skills: extractSkills(text),
    experience: extractExperience(text),
    projects: extractProjects(text),
    education: extractEducation(text),
  };
};