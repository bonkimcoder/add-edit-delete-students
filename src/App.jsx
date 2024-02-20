import React, { useEffect } from "react";
import { useState } from "react";
import Form from "./components/Form";
import { RiArrowLeftDoubleFill, RiArrowRightDoubleFill } from "react-icons/ri";
import Button from "./components/Button";

const App = () => {
  const [students, setStudents] = useState(
    JSON.parse(localStorage.getItem("students")) || [
      {
        fname: "James",
        lname: "Maina",
        phone: "+2540055775",
        email: "maina@gmail.com",
        grade: 5,
      },
    ]
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
  const [checkAll, setCheckAll] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const totalPages = Math.ceil(students.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, students.length);

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const studentsToShow = students.slice(startIndex, endIndex);

  const paginationButtons = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationButtons.push(
      <button
        key={i}
        onClick={() => handlePageChange(i)}
        className={`mx-1 p-2 rounded-sm ${
          currentPage === i ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        {i}
      </button>
    );
  }

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleCheckbox = (e, id) => {
    const { checked } = e.target;
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === id ? { ...student, isChecked: checked } : student
      )
    );
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
    <div className="relative overflow-x-auto sm:rounded-lg mx-auto mt-8 w-10/12">
      <div className="flex my-5 justify-between w-full">
        <h1 className="text-xl font-bold">All Students</h1>
        <Button
          handleButtonClick={() => setFormVisible(true)}
          text="New Student"
          color="blue"
        />
      </div>
      <table className="w-full mx-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
          {studentsToShow.map((student, index) => (
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
                {index + startIndex + 1}
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
                <Button
                  handleButtonClick={() => handleEdit(student.id)}
                  color="yellow"
                  text="Edit"
                />
                <Button
                  handleButtonClick={() => handleDelete(student.id)}
                  color="red"
                  text="Delete"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex gap-8 justify-center my-5">
        <Button
          handleButtonClick={handlePrev}
          color="blue"
          left_arrow={<RiArrowLeftDoubleFill size={25} />}
          text="Prev"
          display="flex justify-between items-center"
        />

        {paginationButtons}

        <Button
          handleButtonClick={handleNext}
          color="blue"
          right_arrow={<RiArrowRightDoubleFill size={25} />}
          text="Next"
          display="flex justify-between items-center"
        />
      </div>

      <Form
        formVisible={formVisible}
        setFormVisible={setFormVisible}
        newStudent={newStudent}
        setNewStudent={setNewStudent}
        editMode={editMode}
        setEditMode={setEditMode}
        students={students}
        setStudents={setStudents}
        editId={editId}
        setEditId={setEditId}
      />

      <div className="flex my-5 justify-between items-center w-full">
        <Button
          handleButtonClick={handleMultiDelete}
          color="red"
          text="Multi Delete"
        />

        <p className="text-center text-2xl my-5">
          Total Students: {students.length}
        </p>
      </div>
    </div>
  );
};

export default App;
