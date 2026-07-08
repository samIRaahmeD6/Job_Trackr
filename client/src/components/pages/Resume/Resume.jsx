import React, { useState, useRef, useEffect } from "react";
import Topbar from "../../layout/Topbar";
import Sidebar from "../../layout/Sidebar";
import Card from "../../ui/Card";
import { IoDocumentTextOutline } from "react-icons/io5";
import {
  uploadResume,
  getActiveResume,
  deleteResume,
} from "../../../services/resumeServices";

const Resume = () => {
  const [resume, setResume]       = useState(null);
  const [file, setFile]           = useState(null);
  const [loading, setLoading]     = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError]         = useState("");

  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchActiveResume = async () => {
      try {
        setLoading(true);
        const data = await getActiveResume();
        setResume(data); // null if no resume — shows upload UI
      } catch (err) {
        setError("Failed to load resume.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchActiveResume();
  }, []);

  // ── file picker ────────────────────────────────────────────────────────────
  const openFilePicker = () => fileInputRef.current.click();

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    if (selected.type !== "application/pdf") {
      setError("Only PDF files are allowed.");
      return;
    }
    if (selected.size > 5 * 1024 * 1024) {
      setError("File too large — max 5MB.");
      return;
    }

    setError("");
    setFile(selected);
  };

  // ── upload & parse ─────────────────────────────────────────────────────────
  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }

    try {
      setUploading(true);
      setError("");
      const data = await uploadResume(file);
      setResume(data);
      setFile(null);
    } catch (err) {
      setError("Upload failed. Please try again.");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  // ── delete ─────────────────────────────────────────────────────────────────
  const handleDelete = async () => {
    if (!window.confirm("Remove this resume?")) return;
    try {
      await deleteResume(resume._id);
      setResume(null);
    } catch {
      setError("Delete failed. Please try again.");
    }
  };

  // ── data straight off the resume doc (no parsedData wrapper) ───────────────
  const skills       = resume?.skills       ?? [];
  const experience   = resume?.experience   ?? [];
  const education    = resume?.education    ?? [];
  const projects     = resume?.projects     ?? [];

  // ── render ─────────────────────────────────────────────────────────────────
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Topbar title="Resume" subTitle="Uploaded skills and experience" />

        <div className="flex-1 p-8 bg-[#141413] overflow-auto">
          <div className="flex gap-6">

            {/* ── LEFT SIDE ─────────────────────────────────────────────── */}
            <div className="flex flex-col gap-6 w-150">

              {/* UPLOAD BOX */}
              <div className="bg-[#262624] rounded-xl border-dotted border p-12 border-white/16 text-center">
                <IoDocumentTextOutline className="text-white text-6xl mx-auto" />

                <h1 className="font-semibold text-white mt-3">
                  {resume ? resume.name || "Resume uploaded" : "Drop your resume PDF here"}
                </h1>

                <p className="text-[12px] text-[#888780]">
                  {resume
                    ? `${skills.length} skills detected · active resume`
                    : "PDF up to 5MB"}
                </p>

                {file && (
                  <p className="text-green-400 text-sm mt-2">
                    Selected: {file.name}
                  </p>
                )}

                {error && (
                  <p className="text-red-400 text-sm mt-2">{error}</p>
                )}

                <input
                  type="file"
                  accept=".pdf"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />

                <div className="flex justify-center gap-3 mt-4">
                  <button
                    onClick={openFilePicker}
                    className="bg-gray-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-600 transition-colors"
                  >
                    {resume ? "Replace" : "Choose File"}
                  </button>

                  {file && (
                    <button
                      onClick={handleUpload}
                      disabled={uploading}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-500 disabled:opacity-50 transition-colors"
                    >
                      {uploading ? "Analyzing..." : "Upload & Analyze"}
                    </button>
                  )}

                  {resume && !file && (
                    <button
                      onClick={handleDelete}
                      className="bg-red-600/20 text-red-400 px-4 py-2 rounded-lg text-sm hover:bg-red-600/30 transition-colors"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>

              {/* SUMMARY */}
              {resume?.summary && (
                <Card title="Summary">
                  <p className="text-[#c9c8c2] text-sm leading-relaxed p-4">
                    {resume.summary}
                  </p>
                </Card>
              )}

              {/* EXPERIENCE */}
              <Card title="Experience">
                {loading ? (
                  <p className="text-[#888780] text-sm">Loading...</p>
                ) : experience.length > 0 ? (
                  experience.map((exp, i) => (
                    <div key={i} className="bg-[#262624] p-4 rounded-lg mb-2">
                      <h1 className="text-white font-semibold text-sm">
                        {exp.role}
                      </h1>
                      <p className="text-[#888780] text-xs mt-0.5">
                        {exp.company}
                        {exp.start_date && ` · ${exp.start_date} – ${exp.end_date || "Present"}`}
                      </p>
                      {exp.description && (
                        <p className="text-[#c9c8c2] text-xs mt-2 whitespace-pre-line">
                          {exp.description}
                        </p>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-[#888780] text-sm">
                    {resume
                      ? "No experience entries detected"
                      : "Upload a resume to see experience"}
                  </p>
                )}
              </Card>

              {/* EDUCATION */}
              <Card title="Education">
                {loading ? (
                  <p className="text-[#888780] text-sm">Loading...</p>
                ) : education.length > 0 ? (
                  education.map((edu, i) => (
                    <div key={i} className="bg-[#262624] p-4 rounded-lg mb-1">
                      <h1 className="text-white font-semibold text-sm">
                        {edu.degree}{edu.field && ` · ${edu.field}`}
                      </h1>
                      <p className="text-[#888780] text-xs mt-0.5">
                        {edu.institution}
                        {edu.start_date && ` · ${edu.start_date} – ${edu.end_date || "Present"}`}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-[#888780] text-sm">
                    {resume
                      ? "No education entries detected"
                      : "Upload a resume to see education"}
                  </p>
                )}
              </Card>
            </div>

            {/* ── RIGHT SIDE ────────────────────────────────────────────── */}
            <div className="flex flex-col gap-4 w-150">

              {/* SKILLS */}
              <Card title="Detected skills">
                <div className="flex flex-wrap gap-3 p-2">
                  {loading ? (
                    <p className="text-[#888780] text-sm">Loading...</p>
                  ) : skills.length > 0 ? (
                    skills.map((skill, i) => (
                      <span
                        key={i}
                        className="bg-[#262624] text-[#c9c8c2] text-xs px-2.5 py-1 rounded-full border border-white/10"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="text-[#888780] text-sm">
                      {resume
                        ? "No skills detected — try a cleaner PDF format"
                        : "Upload a resume to see detected skills"}
                    </p>
                  )}
                </div>
              </Card>

              {/* PROJECTS */}
              <Card title="Projects">
                {loading ? (
                  <p className="text-[#888780] text-sm">Loading...</p>
                ) : projects.length > 0 ? (
                  projects.map((proj, i) => (
                    <div key={i} className="bg-[#262624] p-4 rounded-lg mb-6">
                      <h1 className="text-white font-semibold text-sm">
                        {proj.name}
                      </h1>
                      {proj.description && (
                        <p className="text-[#c9c8c2] text-xs mt-2 whitespace-pre-line">
                          {proj.description}
                        </p>
                      )}
                      {proj.tech_used?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {proj.tech_used.map((tech, j) => (
                            <span
                              key={j}
                              className="bg-[#262624] text-[#888780] text-[11px] px-2 py-1 rounded-md"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-[#888780] text-sm">
                    {resume
                      ? "No projects detected"
                      : "Upload a resume to see projects"}
                  </p>
                )}
              </Card>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;