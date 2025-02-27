import React, { useState } from "react";
import SearchAndFilter from "../components/SearchAndFilter";
import ClassList from "../components/ClassList";

const Classes = () => {
  const [classes, setClasses] = useState([]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-500 to-blue-500">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-white mb-8">Classes</h1>
        <SearchAndFilter onSearch={setClasses} />
        <ClassList classes={classes} />
      </div>
    </div>
  );
};

export default Classes;