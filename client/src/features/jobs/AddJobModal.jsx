import { useState } from "react";
import Modal from "../../components/ui/Modal";
import { createJob } from "../../services/jobService";

const AddJobModal = ({ isOpen, onClose, onJobAdded }) => {
  const [form, setForm] = useState({
    companyName: "",
    position: "",
    jobLink: "",
    salaryMin: "",
    salaryMax: "",
    appliedDate: "",
    source: "",
    status: "Applied",
    followUp: 7,
    notes: "",
  });

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: name === "followUp" ? Number(value) : value,
    });
  };

  // submit to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await createJob(form); // ✅ backend call

      onJobAdded(res);
      onClose();

      // reset form
      setForm({
        companyName: "",
        position: "",
        jobLink: "",
        salaryMin: "",
        salaryMax: "",
        appliedDate: "",
        source: "",
        status: "Applied",
        followUp: 7,
        notes: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-bold mb-4">Add new application</h2>

      <form onSubmit={handleSubmit} className="space-y-3">

        {/* ROW 1 */}
        <div className="flex gap-4">
          <div className="flex flex-col space-y-2">
            <label className="text-[12px] font-semibold text-[#888780]">
              Company name
            </label>
            <input
              type="text"
              name="companyName"
              value={form.companyName}
              onChange={handleChange}
              placeholder="eg. Stripe"
              className="border border-white/16 rounded-lg p-1.5 w-54 placeholder-[#5F5E5A]"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-[12px] font-semibold text-[#888780]">
              Role / Position
            </label>
            <input
              type="text"
              name="position"
              value={form.position}
              onChange={handleChange}
              placeholder="eg. Frontend engineer"
              className="border border-white/16 rounded-lg p-1.5 w-54 placeholder-[#5F5E5A]"
            />
          </div>
        </div>

        {/* ROW 2 */}
        <div className="flex gap-4">
          <div className="flex flex-col space-y-2">
            <label className="text-[12px] font-semibold text-[#888780]">
              Job link (URL)
            </label>
            <input
              type="text"
              name="jobLink"
              value={form.jobLink}
              onChange={handleChange}
              placeholder="http://localhost:5173/applications"
              className="border border-white/16 rounded-lg p-1.5 w-54 placeholder-[#5F5E5A]"
            />
          </div>

          {/* ✅ SALARY FIXED (backend compatible) */}
          <div className="flex flex-col space-y-2">
            <label className="text-[12px] font-semibold text-[#888780]">
              Salary range
            </label>

            <div className="flex gap-2">
              <input
                type="number"
                name="salaryMin"
                value={form.salaryMin}
                onChange={handleChange}
                placeholder="Min"
                className="border border-white/16 rounded-lg p-1.5 w-26 placeholder-[#5F5E5A]"
              />

              <input
                type="number"
                name="salaryMax"
                value={form.salaryMax}
                onChange={handleChange}
                placeholder="Max"
                className="border border-white/16 rounded-lg p-1.5 w-26 placeholder-[#5F5E5A]"
              />
            </div>
          </div>
        </div>

        {/* ROW 3 */}
        <div className="flex gap-4">
          <div className="flex flex-col space-y-2">
            <label className="text-[12px] font-semibold text-[#888780]">
              Applied date
            </label>
            <input
              type="date"
              name="appliedDate"
              value={form.appliedDate}
              onChange={handleChange}
              className="border border-white/16 rounded-lg p-1.5 w-54"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-[12px] font-semibold text-[#888780]">
              Source
            </label>
            <input
              type="text"
              name="source"
              value={form.source}
              onChange={handleChange}
              placeholder="LinkedIn, Facebook"
              className="border border-white/16 rounded-lg p-1.5 w-54"
            />
          </div>
        </div>

        {/* ROW 4 */}
        <div className="flex gap-4">
          <div className="flex flex-col space-y-2">
            <label className="text-[12px] font-semibold text-[#888780]">
              Status
            </label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="border border-white/16 rounded-lg p-1.5 w-54 text-[#888780]"
            >
              <option value="Applied" className='bg-[#30302e]'>Applied</option>
              <option value="Interview" className='bg-[#30302e]'>Interview</option>
              <option value="TechincalExam" className='bg-[#30302e]'>TechnicalExam</option>
              <option value="Offer" className='bg-[#30302e]'>Offer</option>
              <option value="Rejected" className='bg-[#30302e]'>Rejected</option>
            </select>
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-[12px] font-semibold text-[#888780]">
              Follow-up reminder
            </label>
            <select
              name="followUp"
              value={form.followUp}
              onChange={handleChange}
              className="border border-white/16 rounded-lg p-1.5 w-54 text-[#888780]"
            >
              <option value={5} className='bg-[#30302e]'>5 days</option>
              <option value={7} className='bg-[#30302e]'>7 days</option>
              <option value={10} className='bg-[#30302e]'>10 days</option>
              <option value={14} className='bg-[#30302e]'>14 days</option>
              <option value={30} className='bg-[#30302e]'>30 days</option>
            </select>
          </div>
        </div>

        {/* NOTES */}
        <div className="flex flex-col space-y-2">
          <label className="text-[12px] font-semibold text-[#888780]">
            Notes
          </label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Interview notes, recruiter name etc"
            className="h-32 border border-white/16 p-2 rounded-lg w-full resize-none"
          />
        </div>

        {/* SUBMIT */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="border border-white/16 p-2 rounded-lg"
          >
            Save application
          </button>
        </div>

      </form>
    </Modal>
  );
};

export default AddJobModal;