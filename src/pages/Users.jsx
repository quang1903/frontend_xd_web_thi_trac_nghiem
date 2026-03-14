import { useEffect, useState } from 'react'

function Users() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('https://backendxdwebthitracnghiem-production.up.railway.app/api/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Danh sách Users</h1>
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="p-4 text-left">ID</th>
                <th className="p-4 text-left">Tên</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{user.id}</td>
                  <td className="p-4">{user.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Users