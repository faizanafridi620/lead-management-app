import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  getLeadsById,
  updateLeadStatus,
  addNote,
} from "../services/leadService";
import { useEffect } from "react";
import NoteForm from "../components/NoteForm";

function LeadDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchLead = async () => {
    try {
      setLoading(true);
      const { data } = await getLeadsById(id);
      // console.log(data);

      setLead(data.lead);
    } catch (error) {
      console.log(error);

      toast.error("Unable to fetch Lead");
    } finally {
      setLoading(false);
    }
  };

  const changeStatus = async (status) => {
    try {
      await updateLeadStatus(id, status);

      toast.success("Status Updated");
      // console.log("Lead here", lead);

      fetchLead();
    } catch (error) {
      toast.error("Unable to update Status");
    }
  };

  const handleAdd = async (text) => {
    try {
      const { data } = await addNote(id, text);
      // console.log(data);

      setLead(data.lead);

      toast.success("Note Added");
    } catch (error) {
      toast.error("Unable to add Note");
    }
  };

  useEffect(() => {
    fetchLead();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-blue-600 cursor-pointer hover:text-blue-700 font-medium"
      >
        ← Back
      </button>
      <div className="bg-white rounded-2xl shadow-md p-6 mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{lead.name}</h1>
          <p className="text-gray-500 mt-1">Lead Details</p>
        </div>

        <span>{lead.status}</span>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-md p-6">

            <div>
              <p className="text-sm text-gray-500">Email:</p>
              <p className="font-medium text-gray-800">{lead.email}</p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Lead Status</h2>

              <select
                value={lead.status}
                onChange={(e) => changeStatus(e.target.value)}
                className="w-full rounded-lg border cursor-pointer border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              >
                <option>New</option>
                <option>Contacted</option>
                <option>Qualified</option>
                <option>Proposal Sent</option>
                <option>Closed</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-5">Lead Notes</h2>
          <NoteForm onAdd={handleAdd} />

          <div className="space-y-4 mt-6">
            {lead.notes.length === 0 ? (
              <p className="text-gray-500 text-center">No notes added yet.</p>
            ) : (
              lead.notes.map((note, i) => (
                <div key={i} className="border rounded-xl p-4">
                  <p className="text-gray-800">{note.text}</p>
                  <div className="flex justify-between mt-3 text-sm text-gray-500">
                    <span>By: {note.createdBy.name}</span>
                    <span>{new Date(note.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          
        </div>
      </div>
    </div>
  );
}

export default LeadDetails;
