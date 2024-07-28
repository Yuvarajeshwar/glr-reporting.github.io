  // Define the function to send the POST request
  export async function sendData(id, data, department) {
    console.log('This method is called', department)
    const raw = JSON.stringify(data);
    const dept = department !== 'MAIL COMMUNICATION' ? department.toLowerCase() : 'mailCommunication'
    if(dept === userInfo.role) {
    try {
      const response = await fetch(`http://localhost:3030/${department}/${id}`, {
          method: 'PUT', // Specify the request method
        headers: {
          'Content-Type': 'application/json' // Specify the content type as JSON
        },
        body: raw // Convert the id and data to a JSON string
      });
  
      if (!response.ok) {
        toast.current.show({ severity: 'error', summary: 'Info', detail: 'Update Failed. Please try again.' });
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json(); // Parse the JSON response
      console.log('Success:', result);
      toast.current.show({ severity: 'success', summary: 'Info', detail: 'Update Successful' });
      return result;
    } catch (error) {
      console.error('Error:', error);
    }
  
  }
  }
  