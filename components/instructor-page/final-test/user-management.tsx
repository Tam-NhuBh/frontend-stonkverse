"use client"

import { useState } from "react"
import { Search, Filter, MoreHorizontal, Edit, Trash, Download, UserPlus, Check } from "lucide-react"
import { clsx } from "clsx"

type User = {
  id: string
  name: string
  email: string
  role: string
  status: "active" | "pending" | "inactive"
  lastActive: string
  progress: number
  score?: number
}

export default function UserManagementTestComponent() {
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Student",
      status: "active",
      lastActive: "2023-05-15",
      progress: 100,
      score: 85,
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "Student",
      status: "active",
      lastActive: "2023-05-14",
      progress: 100,
      score: 92,
    },
    {
      id: "3",
      name: "Robert Johnson",
      email: "robert.johnson@example.com",
      role: "Student",
      status: "pending",
      lastActive: "2023-05-10",
      progress: 60,
      score: undefined,
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily.davis@example.com",
      role: "Student",
      status: "inactive",
      lastActive: "2023-05-01",
      progress: 0,
      score: undefined,
    },
    {
      id: "5",
      name: "Michael Wilson",
      email: "michael.wilson@example.com",
      role: "Student",
      status: "active",
      lastActive: "2023-05-13",
      progress: 80,
      score: undefined,
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [showAddUserModal, setShowAddUserModal] = useState(false)
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "Student",
  })

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(users.map((user) => user.id))
    }
  }

  const handleSelectUser = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId))
    } else {
      setSelectedUsers([...selectedUsers, userId])
    }
  }

  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      const newUserObj: User = {
        id: (users.length + 1).toString(),
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        status: "pending",
        lastActive: "Never",
        progress: 0,
      }
      setUsers([...users, newUserObj])
      setNewUser({ name: "", email: "", role: "Student" })
      setShowAddUserModal(false)
    }
  }

  const handleDeleteUsers = () => {
    setUsers(users.filter((user) => !selectedUsers.includes(user.id)))
    setSelectedUsers([])
  }

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold">User Management</h1>
        <p className="text-gray-500 mt-1">Manage users for your test</p>
      </div>

      {/* Actions Bar */}
      <div className="p-4 border-b flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-grow">
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search users..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="p-2 border border-gray-300 rounded-md">
            <Filter className="h-4 w-4 text-gray-500" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          {selectedUsers.length > 0 && (
            <button
              className="px-3 py-2 border border-red-300 text-red-500 rounded-md flex items-center gap-1 hover:bg-red-50"
              onClick={handleDeleteUsers}
            >
              <Trash className="h-4 w-4" />
              <span>Delete ({selectedUsers.length})</span>
            </button>
          )}
          <button
            className="px-3 py-2 border border-gray-300 rounded-md flex items-center gap-1 hover:bg-gray-50"
            onClick={() => {}}
          >
            <Download className="h-4 w-4 text-gray-500" />
            <span>Export</span>
          </button>
          <button
            className="px-3 py-2 bg-blue-500 text-white rounded-md flex items-center gap-1 hover:bg-blue-600"
            onClick={() => setShowAddUserModal(true)}
          >
            <UserPlus className="h-4 w-4" />
            <span>Add User</span>
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-4">
                <input
                  type="checkbox"
                  className="rounded"
                  checked={selectedUsers.length === users.length && users.length > 0}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="p-4 font-medium text-gray-500">Name</th>
              <th className="p-4 font-medium text-gray-500">Email</th>
              <th className="p-4 font-medium text-gray-500">Role</th>
              <th className="p-4 font-medium text-gray-500">Status</th>
              <th className="p-4 font-medium text-gray-500">Last Active</th>
              <th className="p-4 font-medium text-gray-500">Progress</th>
              <th className="p-4 font-medium text-gray-500">Score</th>
              <th className="p-4 font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="p-4">
                  <input
                    type="checkbox"
                    className="rounded"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => handleSelectUser(user.id)}
                  />
                </td>
                <td className="p-4 font-medium">{user.name}</td>
                <td className="p-4 text-gray-500">{user.email}</td>
                <td className="p-4">{user.role}</td>
                <td className="p-4">
                  <span
                    className={clsx(
                      "px-2 py-1 rounded-full text-xs font-medium",
                      user.status === "active"
                        ? "bg-green-100 text-green-800"
                        : user.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800",
                    )}
                  >
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                </td>
                <td className="p-4 text-gray-500">{user.lastActive}</td>
                <td className="p-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${user.progress}%` }}></div>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">{user.progress}%</span>
                </td>
                <td className="p-4">
                  {user.score !== undefined ? (
                    <span
                      className={clsx(
                        "font-medium",
                        user.score >= 80 ? "text-green-600" : user.score >= 60 ? "text-yellow-600" : "text-red-600",
                      )}
                    >
                      {user.score}%
                    </span>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Edit className="h-4 w-4 text-gray-500" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <MoreHorizontal className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing {filteredUsers.length} of {users.length} users
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50" disabled>
            Previous
          </button>
          <button className="px-3 py-1 bg-blue-50 border border-blue-300 rounded-md text-sm text-blue-600">1</button>
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">2</button>
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">Next</button>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold">Add New User</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md p-2"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-md p-2"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  className="w-full border border-gray-300 rounded-md p-2"
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                >
                  <option value="Student">Student</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            </div>
            <div className="p-6 bg-gray-50 flex justify-end gap-2 rounded-b-lg">
              <button
                className="px-4 py-2 border border-gray-300 rounded-md"
                onClick={() => setShowAddUserModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center gap-2"
                onClick={handleAddUser}
              >
                Add User
                <Check className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

