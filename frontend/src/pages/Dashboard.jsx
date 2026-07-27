import Navbar from "../components/Navbar";
import { useState } from "react";
import {
  getLeads,
  createLead,
  updateLead,
  deleteLead,
} from "../services/leadService";
import { useEffect } from "react";
import LeadTable from "../components/LeadTable";
import Loader from "../components/Loader";
import LeadForm from "../components/LeadForm";
import Searchbar from "../components/Searchbar";
import LeadModal from "../components/LeadModal";
import toast from "react-hot-toast";
import DeleteModal from "../components/DeleteModal";
import Pagination from "../components/Pagination";

function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");


  const handleSubmit = async (formData) => {
    try {
      if (editingLead) {
        await updateLead(editingLead._id, formData);
        toast.success("Lead updated successfully");
      } else {
        await createLead(formData);
        toast.success("Lead created successfully");
      }

      setShowModal(false);
      setEditingLead(null);

      fetchLeads();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);

      await deleteLead(selectedLead._id);

      toast.success("Lead Deleted");
      fetchLeads();
      setDeleteModal(false);
      setSelectedLead(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete Failed");
    } finally {
      setDeleteLoading(false);
    }
  };

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const { data } = await getLeads({ page, search });

      setLeads(data.leads);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [search, page]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
          <h1 className="text-3xl font-bold">Leads</h1>

          </div>
          <button
            onClick={() => {
              setShowModal(true);
              setEditingLead(null);
            }}
            className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-medium shadow transition"
          >
            Add Lead
          </button>
        </div>
        <div className="bg-white rounded-xl shadow p-4 mb-6 flex flex-col sm:flex-row gap-3 sm:items-center">
            <div className="flex-1">
             <Searchbar value={searchInput} onChange={setSearchInput} />

            </div>
        <button
          onClick={() => {
            setSearch("");
            setSearchInput("");
          }}
          className="bg-gray-200 cursor-pointer hover:bg-gray-300 text-gray-700 px-5 py-2 rounded-lg transition"
        >
          Reset
        </button>
        </div>

        <div className="bg-white rounded-xl shadow overflow-hidden">

        {leads.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-gray-700">No Leads Found</h2>
          </div>
        ) : (
          <LeadTable
            leads={leads}
            onEdit={(lead) => {
              setEditingLead(lead);
              setShowModal(true);
            }}
            onDelete={(lead) => {
              setSelectedLead(lead);
              setDeleteModal(true);
            }}
          />

        )}
        </div>
        <div className="mt-6 flex justify-center">
        <Pagination page={page} totalPages={totalPages} onChange={setPage} />

        </div>

        <LeadModal
          open={showModal}
          onClose={() => {
            setShowModal(false);
            setEditingLead(null);
          }}
        >
          <LeadForm initialData={editingLead} onSubmit={handleSubmit} />
        </LeadModal>

        <DeleteModal
          open={deleteModal}
          loading={deleteLoading}
          onClose={() => {
            setDeleteModal(false);
            setSelectedLead(null);
          }}
          onConfirm={handleDelete}
        />

      </div>
         <footer className="border-t bg-white py-4">
    <div className="max-w-7xl mx-auto px-6 text-center text-sm text-gray-500">
      Build for <span className="font-semibold text-blue-600">Digital Heroes Training Task</span>
    </div>
  </footer>
    </>
  );
}

export default Dashboard;
