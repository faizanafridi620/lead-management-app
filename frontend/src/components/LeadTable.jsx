import React from 'react'
import { deleteLead } from '../services/leadService'
import { useNavigate } from 'react-router-dom';

function LeadTable({ leads, onEdit, onDelete }) {
    const navigate = useNavigate()

//      const handleDelete = async (id) => {

//     if (!confirm("Delete this lead?")) return;

//     await deleteLead(id);

//     refresh();

//   }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
     <table className="min-w-full bg-white">

      <thead className="bg-gray-50 border-b">

        <tr className="bg-gray-100">

          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>

        </tr>

      </thead>

      <tbody className="divide-y divide-gray-200">

        {leads.map((lead) => (

          <tr
            key={lead._id}
            className="hover:bg-gray-50 transition"
          >

            <td className="px-6 py-4">
                <div>
                    <p className="font-medium text-gray-800">
                {lead.name}

                    </p>
                </div>
                </td>

            <td className="px-6 py-4 text-gray-600">{lead.email}</td>

            <td className="px-6 py-4 text-gray-600">{lead.status}</td>

            <td className="px-6 py-4">
                <div className="flex justify-center gap-2">

                    <button onClick={() => navigate(`/dashboard/leads/${lead._id}`)}
                className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm transition"              
                >
                    View
                </button>
                <button onClick={() => onEdit(lead)}
                className="bg-yellow-500 cursor-pointer hover:bg-yellow-600 text-white px-3 py-2 rounded-lg text-sm transition"
                >
                    Edit  
                </button>
                
                <button
                className="bg-red-500 hover:bg-red-600 cursor-pointer text-white px-3 py-2 rounded-lg text-sm transition"
                onClick={() => onDelete(lead)}
                >
                    Delete
                </button>
                

                </div>
            </td>

          </tr>

        ))}

      </tbody>

    </table>
    </div>
  )
}

export default LeadTable