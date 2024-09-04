import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from "primereact/button";
import './FunctionalHeader.css'
import { filter } from 'lodash';

export default function FunctionalHeader({ products, setProducts }) {
  const [filterType, setFilterType] = useState('study_number');
  const [filterValue, setFilterValue] = useState([]);

  const fetchCsvData = async () => {
    // setLoading(true)
    try {
      // Fetch data from all endpoints concurrently
      const [sdResponse, qaResponse, mailResponse, edpResponse, accountsResponse, studyResponse] = await Promise.all([
        fetch(`http://localhost:3030/sd/csv`),
        fetch(`http://localhost:3030/qa/csv`),
        fetch(`http://localhost:3030/mailCommunication/csv`),
        fetch(`http://localhost:3030/edp/csv`),
        fetch(`http://localhost:3030/accounts/csv`),
        fetch(`http://localhost:3030/study/csv`)
      ]);
      // setTotalRecords(10);

      const [sdResult, qaResult, mailResult, edpResult, accountsResult, studyResult] = await Promise.all([
        sdResponse.json(),
        qaResponse.json(),
        mailResponse.json(),
        edpResponse.json(),
        accountsResponse.json(),
        studyResponse.json()
      ]);

      console.log(qaResult)

      // Create maps for faster lookup
      const qaMap = new Map(qaResult.map(item => [item.study_number, item]));
      const mailMap = new Map(mailResult.map(item => [item.study_number, item]));
      const edpMap = new Map(edpResult.map(item => [item.study_number, item]));
      const accountsMap = new Map(accountsResult.map(item => [item.study_number, item]));
      const sdMap = new Map(sdResult.map(item => [item.study_number, item]));

      console.log(qaMap)
      const consolidation = studyResult.map(studyItem => ({
        ...studyItem,
        ...qaMap.get(studyItem.study_number) || {}, // Merge with QA data if available
        ...mailMap.get(studyItem.study_number) || {}, // Merge with Mail data if available
        ...edpMap.get(studyItem.study_number) || {}, // Merge with EDP data if available
        ...accountsMap.get(studyItem.study_number) || {}, // Merge with Accounts data if available
        ...sdMap.get(studyItem.study_number) || {},
      }))
      console.log(consolidation)
      // Set consolidated data to state
      // setLoading(false)
      return consolidation
    } catch (error) {
      console.error('Error fetching data:', error);
      // setLoading(false);
    }
  };

  const convertToCSV = (data) => {
    try {
      const csvHeader = Object.keys(data[0]).join(',');
      const csvContent = data.map(row => Object.values(row).join(',')).join('\n');
      return `${csvHeader}\n${csvContent}`;
    } catch (e) {
      console.log(e)
    }
  };

  const downloadCSV = async () => {
    const csvTests = await fetchCsvData()
    const csvData = convertToCSV(csvTests);
    console.log(csvTests)
    console.log(csvData)
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'combined_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSearchChange = (e) => {
    const selectedValue = e.target.value;
    // Replace / with - in the selected value
    const updatedValue = selectedValue.replace(/\//g, '-');
    console.log(updatedValue)
    setFilterValue(updatedValue); // Update filterText state in AllTestView
  };

  const handleFilterTypeChange = (event) => {
    setFilterType(event.target.value); // Update state with the selected value
  };

  const handleClick = async () => {


    const [sdFilterResponse, qaFilterResponse, mailFilterResponse, edpFilterResponse, accountsFilterResponse, studyFilterResponse] = await Promise.all([
      fetch(`http://localhost:3030/sd/filter/${filterType}/${filterValue}`),
      fetch(`http://localhost:3030/qa/filter/${filterType}/${filterValue}`),
      fetch(`http://localhost:3030/mailCommunication/filter/${filterType}/${filterValue}`),
      fetch(`http://localhost:3030/edp/filter/${filterType}/${filterValue}`),
      fetch(`http://localhost:3030/accounts/filter/${filterType}/${filterValue}`),
      fetch(`http://localhost:3030/study/filter/${filterType}/${filterValue}`)
    ]);
    console.log(sdFilterResponse)
    const [sdResult, qaResult, mailResult, edpResult, accountsResult, studyResult] = await Promise.all([
      sdFilterResponse.json(),
      qaFilterResponse.json(),
      mailFilterResponse.json(),
      edpFilterResponse.json(),
      accountsFilterResponse.json(),
      studyFilterResponse.json()
    ]);

    console.log(qaResult)

    // Create maps for faster lookup
    const qaMap = new Map(qaResult.map(item => [item.study_number, item]));
    const mailMap = new Map(mailResult.map(item => [item.study_number, item]));
    const edpMap = new Map(edpResult.map(item => [item.study_number, item]));
    const accountsMap = new Map(accountsResult.map(item => [item.study_number, item]));
    const sdMap = new Map(sdResult.map(item => [item.study_number, item]));

    console.log(qaMap)
    const consolidation = studyResult.map(studyItem => ({
      ...studyItem,
      ...qaMap.get(studyItem.study_number) || {}, // Merge with QA data if available
      ...mailMap.get(studyItem.study_number) || {}, // Merge with Mail data if available
      ...edpMap.get(studyItem.study_number) || {}, // Merge with EDP data if available
      ...accountsMap.get(studyItem.study_number) || {}, // Merge with Accounts data if available
      ...sdMap.get(studyItem.study_number) || {},
    }))
    console.log(consolidation)
    setProducts(consolidation)

  }
  return (
    <div>
      <Button
        style={{
          position: "absolute",
          left: "50px",
          borderRadius: "5px"
        }}
        label="Export CSV"
        type="button"
        rounded
        onClick={() => downloadCSV()}
        data-pr-tooltip="Export CSV" />

      <span class="search-container">
        <select id="filterType" class="dropdown" value={filterType} onChange={handleFilterTypeChange}>
          <option value="study_number">Study Number</option>
          <option value="sponsor">Sponsor</option>
          <option value="study_director">Study Director</option>
        </select>
        <input
          type="text"
          id="searchInput"
          className="search-input"
          placeholder="Search by Study Number..."
          onChange={handleSearchChange} // Attach onChange handler
        />
        <button id="searchButton" class="search-button" onClick={() => handleClick()}>
          Search
        </button>
      </span>
    </div>
  );
}





