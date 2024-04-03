'use client'
import axios from "axios";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Modal from "react-modal";
import Loading from "./loading";

interface User {
  _id: string;
  username: string;
  avatar: string;
  address: string;
  state: string;
}

const DashboardPage: React.FC = () => {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [newUser, setNewUser] = useState<User | null>(null);
  const [modelName, setModal] = useState<string>("");
  const handleOpenModal = () => {
    setModal("add")
    setNewUser(null);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const handleSave = async () => {
  
    try {
      if (newUser && modelName==="edit") {
        await axios.put(`http://localhost:8000/people/update/${newUser._id}`, newUser);
      } else {
        await axios.post(`http://localhost:8000/people/add`, newUser);
      }
      handleCloseModal();
      fetchUsers();
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser(prevUser => ({
      ...prevUser!,
      [name]: value
    }));
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get<User[]>('http://localhost:8000/people');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8000/people/delete/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  const handleEdit=async (id:string)=>{
    setModal("edit")
    try {
      const res=await axios.get(`http://localhost:8000/people/${id}`);
      // console.log(res)
      setNewUser(res.data)
      // handleOpenModal()
      setModalIsOpen(true);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }

  const handleLogout = () => {
    axios.post("http://localhost:8000/logout", {}, { withCredentials: true });
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="flex justify-between max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">Dashboard</h1>
          <div className="flex gap-4">
            <button className="bg-teal-400 text-white px-3 py-2 rounded-md" onClick={handleOpenModal}>
              Add User
            </button>
            <button className="bg-red-600 text-white px-3 py-2 rounded-md" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-8 bg-white shadow sm:rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Welcome to your Dashboard</h2>
            
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Avatar</th>
                  <th className="px-4 py-2">Address</th>
                  <th className="px-4 py-2">State</th>
                  <th className="px-4 py-2">Edit</th>
                  <th className="px-4 py-2">Delete</th>
                </tr>
              </thead>
              <Suspense fallback={<Loading/>}>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className="px-4 py-2 ml-44">{user.username}</td>
                    <td className="px-4 py-2">
                      <img src={user.avatar} alt={user.username} className="h-8 w-8 rounded-full ml-16" />
                    </td>
                    <td className="px-4 py-2 ml-44">{user.address}</td>
                    <td className="px-4 py-2 ml-40">{user.state}</td>
                    <td className="px-4 py-2">
                      <button className="text-blue-500 ml-16" onClick={()=>handleEdit(user._id)}>Edit</button>
                    </td>
                    <td className="px-4 py-2">
                      <button className="text-red-500 ml-20" onClick={() => handleDelete(user._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
              </Suspense>
            </table>
            
          </div>
        </div>
      </main>
      
      <Modal isOpen={modalIsOpen} onRequestClose={handleCloseModal} className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-14 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h2 className=" text-lg leading-6 text-center font-bold text-violet-800 mb-4">{modelName=="edit" ? 'Edit User' : 'Add User'}</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-semibold font-medium text-gray-700">Username</label>
                <input type="text" name="username" value={newUser?.username || ''} onChange={handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
              <div>
                <label className="block text-semibold font-medium text-gray-700">Avatar</label>
                <input type="text" name="avatar" value={newUser?.avatar || ''} onChange={handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
              <div>
                <label className="block text-semibold font-medium text-gray-700">Address</label>
                <input type="text" name="address" value={newUser?.address || ''} onChange={handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
              <div>
                <label className="block  font-medium text-gray-700">State</label>
                <input type="text" name="state" value={newUser?.state || ''} onChange={handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
            </form>
          </div>
          <div className="bg-gray-50 px-8 py-8 sm:px-6 sm:flex sm:justify-center sm:items-center sm:gap-4">
            <button type="button" onClick={handleSave} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-teal-400 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">
              Save
            </button>
            <button type="button" onClick={handleCloseModal} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:mr-3 sm:w-auto sm:text-sm">
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DashboardPage;
