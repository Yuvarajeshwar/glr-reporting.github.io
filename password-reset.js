
async function  testReset() {

                                   
const resetUrl = 'http://10.210.3.14/api/v1/user/reset-password'

const data = {
    "email": "testinguser@glrlabs.com",
    "password": "testing123",
    "tempPassword": "test123"
}

// const resetResponse = await
fetch(resetUrl, {
    method: 'POST',
    headers: {
        // Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })

//   console.log(resetResponse.json())
}

testReset.call()