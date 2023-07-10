export async function getCarbonCurrent(postCode) {
  const headers = {
    Accept: "application/json",
  };

  try {
    const response = await fetch(
      `https://api.carbonintensity.org.uk/regional/postcode/${postCode}`,
      {
        method: "GET",

        headers: headers,
      }
    );

    const result = await response.json();
    return result;
  } catch {
    console.log("error");
  }
}

export async function getCarbonToday(postCode) {
  const headers = {
    Accept: "application/json",
  };
  // 2017-08-25T12:35Z - ISO8601 FORMAT
  const date = new Date();
  const today = `${date.getFullYear()}-${('0'+(date.getMonth()+1)).slice(-2)}-${date.getDate()}T00:00Z`;
  console.log(today);

  try {
    const response = await fetch(
      `https://api.carbonintensity.org.uk/regional/intensity/${today}/fw24h/postcode/${postCode}`,
      {
        method: "GET",

        headers: headers,
      }
    );

    const result = await response.json();
    const receivedData = result.data.data;
    return receivedData;
  } catch {
    console.log("error");
  }
} 
