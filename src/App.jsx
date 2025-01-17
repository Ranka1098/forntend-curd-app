import React, { useEffect, useState } from "react";
import employee from "./components/Data";

const App = () => {
  const [data, setData] = useState([]);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [age, setAge] = useState("");

  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    setData(employee);
  }, []);

  // ----------------------edit-----------------------

  const handleEdit = (id) => {
    setIsUpdate(true);
    const dt = data.filter((item) => item.id === id);
    if (dt !== undefined) {
      setId(id);
      setFname(dt[0].fname);
      setLname(dt[0].lname);
      setAge(dt[0].age);
    }
  };
  // ----------------------delete-----------------------

  const handleDelete = (id) => {
    if (window.confirm("are you want to delete ?")) {
      const dt = data.filter((item) => item.id !== id);
      setData(dt);
    }
  };
  // ----------------------Save-----------------------

  const handleSave = () => {
    let error = "";
    if (fname === "") {
      error += "fname required , ";
    }
    if (lname === "") {
      error += "lname required , ";
    }
    if (age <= 0) {
      error += "age required ";
    }
    // if (!fname || !lname || !age) {
    //   alert("plss fill all filled");
    //   return;
    // }

    if (error !== "") {
      alert(error);
      return;
    }
    // Data ki shallow copy banana:
    const dt = [...data];

    // data ke naya object ko put karenge
    const newObj = {
      id: data.length + 1, // jo data ke length hai uske badd se shuru karenge
      fname: fname,
      lname: lname,
      age: age,
    };

    // new object ko data me push karenge
    dt.push(newObj);
    // state ko update karenge

    setData(dt);
    handleClear();
    alert("emp added successfully");
  };
  // ----------------------update-----------------------

  const handleUpdate = () => {
    setIsUpdate(false);

    // index find karna
    const index = data
      .map((item) => {
        return item.id;
      })
      .indexOf(id);

    // Data ki shallow copy banana:
    const dt = [...data];

    // dt[index]: Us user ka object jo update hoga, index ke base par select kiya jata hai.
    dt[index].fname = fname;
    dt[index].lname = lname;
    dt[index].age = age;

    // Input fields clear karna:
    setFname("");
    setLname("");
    setAge("");
  };
  // ----------------------clear-----------------------

  const handleClear = () => {
    setIsUpdate(false);
    setFname("");
    setLname("");
    setAge("");
  };

  return (
    <div className="bg-gray-100 h-screen p-5">
      <h1 className="text-center text-3xl font-semibold text-purple-700 py-4">
        Employee Details
      </h1>

      <div className="mb-5 flex gap-5 justify-center">
        {/*first name */}
        <input
          type="text"
          placeholder="Enter First name"
          className="border border-black px-3 py-1 "
          value={fname}
          onChange={(e) => setFname(e.target.value)}
        />
        {/*last name */}
        <input
          type="text"
          placeholder="Enter last name"
          className="border border-black px-3 py-1 "
          value={lname}
          onChange={(e) => setLname(e.target.value)}
        />
        {/*first name */}
        <input
          type="number"
          placeholder="Enter age "
          className="border border-black px-3 py-1 "
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        {isUpdate ? (
          <button
            className="border border-black px-3 py-1 bg-orange-500"
            onClick={handleUpdate}
          >
            upadte
          </button>
        ) : (
          <button
            className="border border-black px-3 py-1 bg-green-500"
            onClick={handleSave}
          >
            Save
          </button>
        )}

        <button
          className="border border-black px-3 py-1 bg-red-500"
          onClick={handleClear}
        >
          Clear
        </button>
      </div>
      <table className="w-full border-collapse bg-white shadow-lg rounded-lg">
        <thead>
          <tr className="bg-purple-500 text-white">
            <th className="px-4 py-2 text-left">Sr. No</th>
            <th className="px-4 py-2 text-left">First Name</th>
            <th className="px-4 py-2 text-left">Last Name</th>
            <th className="px-4 py-2 text-left">Age</th>
            <th className="px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className={`"bg-gray-50" border-b hover:bg-gray-200`}
            >
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{item.fname}</td>
              <td className="px-4 py-2">{item.lname}</td>
              <td className="px-4 py-2">{item.age}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => {
                    handleEdit(item.id);
                  }}
                  className="px-3 py-1 mr-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    handleDelete(item.id);
                  }}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
