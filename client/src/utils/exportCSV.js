export const exportJobsToCSV = (jobs) => {
  if (!jobs || jobs.length === 0) {
    alert("No jobs available to export");
    return;
  }

  const headers = [
    "Company",
    "Position",
    "Status",
    "Source",
    "Salary Min",
    "Salary Max",
    "Applied Date",
    "Job Description"
  ];

  const rows = jobs.map((job) => [
    job.companyName || "",
    job.position || "",
    job.status || "",
    job.source || "",
    job.salaryMin || "",
    job.salaryMax || "",
    job.appliedDate
      ? new Date(job.appliedDate).toLocaleDateString()
      : "",
    (job.jobdescription || "").replace(/,/g, " ")
  ]);

  const csvContent = [headers, ...rows]
    .map((row) => row.join(","))
    .join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "jobtrackr-jobs.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};