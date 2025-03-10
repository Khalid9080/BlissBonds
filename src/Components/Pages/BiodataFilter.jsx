import React from "react";
import { Select, Option, Button } from "@material-tailwind/react";

const BiodataFilter = ({ filters, setFilters }) => {
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex flex-wrap gap-4 p-4 bg-gray-100 rounded-md shadow-md">
      {/* Age Range Filter */}
      <Select
        label="Age Range"
        value={filters.ageRange}
        onChange={(value) => handleFilterChange("ageRange", value)}
      >
        <Option value="">All</Option>
        <Option value="10-15">10-15</Option>
        <Option value="16-20">16-20</Option>
        <Option value="21-25">21-25</Option>
        <Option value="26-30">26-30</Option>
        <Option value="31-35">31-35</Option>
        <Option value="36-40">36-40</Option>
        <Option value="41-45">41-45</Option>
        <Option value="46-50">46-50</Option>
        <Option value="51-55">51-55</Option>
        <Option value="56-60">56-60</Option>
      </Select>

      {/* Biodata Type Filter */}
      <Select
        label="Biodata Type"
        value={filters.biodataType}
        onChange={(value) => handleFilterChange("biodataType", value)}
      >
        <Option value="">All</Option>
        <Option value="Male">Male</Option>
        <Option value="Female">Female</Option>
      </Select>

      {/* Division Filter */}
      <Select
        label="Division"
        value={filters.division}
        onChange={(value) => handleFilterChange("division", value)}
      >
        <Option value="">All</Option>
        <Option value="Dhaka">Dhaka</Option>
        <Option value="Chattagram">Chattagram</Option>
        <Option value="Rangpur">Rangpur</Option>
        <Option value="Barishal">Barishal</Option>
        <Option value="Khulna">Khulna</Option>
        <Option value="Mymensingh">Mymensingh</Option>
        <Option value="Sylhet">Sylhet</Option>
      </Select>

      {/* Reset Button */}
      <Button color="red" onClick={() => setFilters({ ageRange: "", biodataType: "", division: "" })}>
        Reset Filters
      </Button>
    </div>
  );
};

export default BiodataFilter;
