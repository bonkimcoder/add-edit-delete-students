import React, { useEffect } from "react";
import { useState } from "react";

const App = () => {
  const [students, setStudents] = useState(
    JSON.parse(localStorage.getItem("students")) || []
  );
  const [newStudent, setNewStudent] = useState({
    isChecked: false,
    fname: "",
    lname: "",
    phone: "",
    email: "",
    grade: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [checkAll, setCheckAll] = useState(false);

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  const handleCheckbox = (e, id) => {
    const { checked } = e.target;
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === id ? { ...student, isChecked: checked } : student
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      const updatedStudents = students.map((student) =>
        student.id === editId ? newStudent : student
      );
      setStudents(updatedStudents);
      setEditMode(false);
      setEditId(null);
    } else {
      setStudents([...students, { ...newStudent, id: Date.now() }]);
    }
    setNewStudent({
      fname: "",
      lname: "",
      phone: "",
      email: "",
      grade: "",
    });
    setFormVisible(false);
  };

  const handleEdit = (id) => {
    const studentToEdit = students.find((student) => student.id === id);
    setNewStudent(studentToEdit);
    setEditMode(true);
    setEditId(id);
    setFormVisible(true);
  };

  const handleCheckAll = (e) => {
    const { checked } = e.target;
    setCheckAll(checked);
    setStudents((prevStudents) =>
      prevStudents.map((student) => ({
        ...student,
        isChecked: checked,
      }))
    );
  };

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete student?`)) {
      setStudents(students.filter((student) => student.id !== id));
    }
  };

  const handleMultiDelete = () => {
    if (window.confirm(`Delete Multiple Students?`)) {
      setStudents(students.filter((student) => !student.isChecked));
    }
  };

  return (
    <div className="relative overflow-x-auto sm:rounded-lg mt-8">
      <button
        onClick={() => setFormVisible(true)}
        className="absolute right-10 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        New Student
      </button>
      <table className="max-w-xl mx-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <caption className="text-xl font-bold mb-5">All Students</caption>
        <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th scope="col" className="px-6 py-3">
              <label onClick={handleCheckAll}>
                <input type="checkbox" /> All
              </label>
            </th>
            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
              Id
            </th>
            <th scope="col" className="px-6 py-3">
              First Name
            </th>
            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
              Last Name
            </th>
            <th scope="col" className="px-6 py-3">
              Phone
            </th>
            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Grade
            </th>
            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr
              key={student.id}
              className="border-b border-gray-200 dark:border-gray-700"
            >
              <td className="px-6 py-4">
                <input
                  type="checkbox"
                  name="isChecked"
                  onChange={(e) => handleCheckbox(e, student.id)}
                  checked={student.isChecked}
                />
              </td>
              <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                {index + 1}
              </td>
              <td className="px-6 py-4">{student.fname}</td>
              <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                {student.lname}
              </td>
              <td className="px-6 py-4">{student.phone}</td>
              <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                {student.email}
              </td>
              <td className="px-6 py-4">{student.grade}</td>
              <td className="px-6 flex gap-6 py-4 bg-gray-50 dark:bg-gray-800">
                <button
                  onClick={() => handleEdit(student.id)}
                  className="text-white bg-yellow-700 hover:bg-yellow-800 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(student.id)}
                  className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {formVisible && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <form
            className="max-w-lg mx-auto shadow-md p-5 bg-white rounded-lg"
            onSubmit={handleSubmit}
          >
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="fname"
                  id="fname"
                  value={newStudent.fname}
                  onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="fname"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  First name
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="lname"
                  id="lname"
                  value={newStudent.lname}
                  onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="lname"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Last name
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="grade"
                  id="grade"
                  value={newStudent.grade}
                  onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="lname"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Grade
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="tel"
                  // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  name="phone"
                  id="phone"
                  value={newStudent.phone}
                  onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="phone"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Phone
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={newStudent.email}
                  onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  required
                />
                <label
                  htmlFor="email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Email
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {editMode ? "Update Student" : "Add Student"}
            </button>
            <button
              type="button"
              onClick={() => setFormVisible(false)}
              className="ml-3 text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      <div className=" flex justify-between items-center max-w-xl mx-auto ">
        <button
          onClick={handleMultiDelete}
          className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 mr-auto"
        >
          Multi Delete
        </button>
        <p className="text-center text-2xl my-5">
          Total Students: {students.length}
        </p>
      </div>
    </div>
  );
};

export default App;
