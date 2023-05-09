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
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(20);

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

  const filteredCountries = countries
    .filter(
      (country) => selectedRegion === "" || country.region === selectedRegion
    )
    .filter((country) =>
      country.name.common.toLowerCase().includes(query.toLowerCase())
    );

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = filteredCountries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredCountries.length / countriesPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <div className={"Home_Page"}>
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <div className="container">
        <div className="d-flex align-items-center justify-content-between py-5">
          <SearchBar query={query} setQuery={setQuery} />
          <DropDown
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
          />
        </div>
        <div className="d-flex flex-wrap gap-1 align-items-center justify-content-between py-5">
          {currentCountries?.map((country, i) => (
            <div key={i} className="">
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
        <div className="d-flex justify-content-center">
          <nav>
            <ul className="pagination">
              <button
                className="page-link"
                onClick={() =>
                  setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)
                }
              >
                Prev
              </button>
              {pageNumbers.map((number) => (
                <li key={number} className="page-item">
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(number)}
                  >
                    {number}
                  </button>
                </li>
              ))}
              <button
                className="page-link"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default HomeComp;
