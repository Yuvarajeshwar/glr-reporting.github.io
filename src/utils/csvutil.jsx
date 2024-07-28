export const fetchCsvData = async () => {
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
        return consolidation
    } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
    }
};

export const convertToCSV = async (data) => {
      try {
      const csvHeader = Object.keys(data[0]).join(',');
      const csvContent = data.map(row => Object.values(row).join(',')).join('\n');
      return `${csvHeader}\n${csvContent}`;
      } catch (e) {
        console.log(e)
      }
    };

  