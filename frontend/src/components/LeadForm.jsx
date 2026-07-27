import { useEffect } from 'react'
import { useState } from 'react'

function LeadForm({onSubmit, initialData}) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
    })

    useEffect(() => {
        if(initialData) {
            setFormData({
                name: initialData.name || "",
                email: initialData.email || ""
            })
        } else {
            setFormData({
                name: "",
                email: ""
            })
        }
    },[initialData])

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(formData)
    }

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }

  return (
    <form onSubmit={handleSubmit}
    className="space-y-6"
    >
        <div>
        <h2 className="text-2xl font-bold">
            {initialData ? "Edit Lead" : "Add Lead"}
        </h2>
        <p className="text-gray-500 text-sm mt-1">
      {initialData
        ? "Update the lead information."
        : "Fill in the details to create a new lead."}
    </p>

        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
      Full Name
    </label>

         <input
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        required
        />
        </div>

        <div>

        <label className="block text-sm font-medium text-gray-700 mb-2">
      Email Address
    </label>
      <input
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
         className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
        </div>
        <div className="flex justify-center gap-3 pt-2">
      <button type='submit'  className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium cursor-pointer hover:bg-blue-700 transition">
        {initialData? "Update Lead" : "Create Lead"}
      </button>

        </div>

    </form>
  )
}

export default LeadForm