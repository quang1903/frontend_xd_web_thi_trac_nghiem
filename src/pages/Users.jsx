import { useEffect, useState } from 'react'

 const API = 'https://backendxdwebthitracnghiem-production.up.railway.app/api'
// const API = 'http://localhost:8000/api'
function Users() {
  const [users, setUsers] = useState([])
  const [name, setName] = useState('')
  const [editId, setEditId] = useState(null)
  const [editName, setEditName] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchUsers = () => {
    setLoading(true)
    fetch(`${API}/users`)
      .then(res => res.json())
      .then(data => { setUsers(data); setLoading(false) })
  }

  useEffect(() => { fetchUsers() }, [])

  const addUser = () => {
    if (!name.trim()) return
    fetch(`${API}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    }).then(() => { setName(''); fetchUsers() })
  }

  const deleteUser = (id) => {
    if (!confirm('Xóa user này?')) return
    fetch(`${API}/users/${id}`, { method: 'DELETE' })
      .then(() => fetchUsers())
  }

  const saveEdit = (id) => {
    fetch(`${API}/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: editName })
    }).then(() => { setEditId(null); fetchUsers() })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-indigo-700">Quản lý Users</h1>
          <p className="text-gray-500 mt-1">Danh sách sinh viên trong hệ thống</p>
        </div>

        {/* Add form */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6 flex gap-3">
          <input
            className="flex-1 border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Nhập tên user..."
            value={name}
            onChange={e => setName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addUser()}
          />
          <button
            onClick={addUser}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl font-medium transition"
          >
            + Thêm
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-indigo-600 text-white">
                <th className="p-4 text-left w-16">ID</th>
                <th className="p-4 text-left">Tên</th>
                <th className="p-4 text-center w-40">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="3" className="p-8 text-center text-gray-400">Đang tải...</td></tr>
              ) : users.length === 0 ? (
                <tr><td colSpan="3" className="p-8 text-center text-gray-400">Chưa có user nào</td></tr>
              ) : users.map((user, i) => (
                <tr key={user.id} className={`border-t ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-indigo-50 transition`}>
                  <td className="p-4 text-gray-400 font-mono">{user.id}</td>
                  <td className="p-4">
                    {editId === user.id ? (
                      <input
                        className="border border-indigo-300 rounded-lg px-3 py-1 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        value={editName}
                        onChange={e => setEditName(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && saveEdit(user.id)}
                        autoFocus
                      />
                    ) : (
                      <span className="font-medium text-gray-700">{user.name}</span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {editId === user.id ? (
                      <div className="flex gap-2 justify-center">
                        <button onClick={() => saveEdit(user.id)} className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm transition">Lưu</button>
                        <button onClick={() => setEditId(null)} className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-3 py-1 rounded-lg text-sm transition">Hủy</button>
                      </div>
                    ) : (
                      <div className="flex gap-2 justify-center">
                        <button onClick={() => { setEditId(user.id); setEditName(user.name) }} className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm transition">Sửa</button>
                        <button onClick={() => deleteUser(user.id)} className="bg-red-400 hover:bg-red-500 text-white px-3 py-1 rounded-lg text-sm transition">Xóa</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Footer */}
          <div className="p-4 bg-gray-50 border-t text-sm text-gray-400 text-right">
            Tổng: {users.length} users
          </div>
        </div>
      </div>
    </div>
  )
}

export default Users