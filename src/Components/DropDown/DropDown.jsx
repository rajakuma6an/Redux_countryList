import React from "react";
import { useSelector } from "react-redux";
import "../style.css";

const DropDown = ({ selectedRegion, setSelectedRegion }) => {
  const Regions = useSelector((state) => state.countries.map((x) => x.region));
  const NewRegions = Regions.filter((item,
    index) => Regions.indexOf(item) === index);

  const handleChange = (event) => {
    setSelectedRegion(event.target.value);
  };
  return (
    <div>
      <div className="my-3 d-flex align-items-center ">
        <select
          id="region-select"
          placeholder="Filter by Region"
          className="Country_drop ps-2 pe-2"
          value={selectedRegion}
          onChange={handleChange}
        >
          <option value="">Filter by region</option>
          {NewRegions?.map((region, i) => (
            <option key={i} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DropDown;
