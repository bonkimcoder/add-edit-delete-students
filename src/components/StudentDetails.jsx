const StudentDetails = ({ student }) => {
  return (
    <div>
      <h2>Student Details</h2>
      <p>First Name: {student.fname}</p>
      <p>Last Name: {student.lname}</p>
      {/* Add other student details */}
    </div>
  );
};

export default StudentDetails;
