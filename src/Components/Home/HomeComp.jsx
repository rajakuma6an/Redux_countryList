import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import "../style.css";
import SearchBar from "../SearchBar/SearchBar";
import DropDown from "../DropDown/DropDown";
import { Endpoints } from "../../Services/EndPoints";

const HomeComp = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [query, setQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    fetchCountries();
  }, [dispatch]);

  const fetchCountries = async () => {
    try {
      const response = await axios.get(Endpoints.GetAllCountry);
      dispatch({ type: "SET_COUNTRIES", payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={""}>
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <div className="Home_Page">
        <div className="row align-items-center justify-content-between py-3">
          <div className={window.innerWidth > 600 ? "col-4" : "col-6"}>
            <SearchBar query={query} setQuery={setQuery} />
          </div>
          <div className={window.innerWidth > 600 ? "col-3" : "col-6"}>
            {" "}
            <DropDown
              selectedRegion={selectedRegion}
              setSelectedRegion={setSelectedRegion}
            />
          </div>
        </div>
        <div className="">
          <div className="row">
            {countries
              .filter(
                (country) =>
                  selectedRegion === "" || country.region === selectedRegion
              )
              .filter((country) =>
                country.name.common.toLowerCase().includes(query.toLowerCase())
              )
              ?.map((country, i) => (
                <div key={i} className="col-12 col-lg-3 col-md-12 py-3">
                  <div className="Card_Country">
                    <img className="card_image" src={country?.flags?.png} />
                    <div className="card_body">
                      <p>{country?.name?.common}</p>
                      <span>Population : {country?.population}</span>
                      <br />
                      <span>Region : {country?.region}</span>
                      <br />
                      <span>Capital : {country?.capital}</span>
                      <br />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeComp;
