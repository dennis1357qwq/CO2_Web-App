import { response } from "express";

export async function getCarbonCurrent(postCode) {
  const headers = {
    Accept: "application/json",
  };

  console.log('Carbon API with Postcode: ' + postCode);
  try {
    const response = await fetch(
      `https://api.carbonintensity.org.uk/regional/postcode/${postCode}`,
      {
        method: "GET",

        headers: headers,
      }
    );

    if (response?.ok){
      console.log(`Response Status is: ${response.status}`)
      const result = await response.json();
      return result;
    }
    else{
      console.log(`Response Status is: ${response.status}`)
      return null;
    }

  } catch (error){
    console.log(error);
  }



}

export async function getCarbonNext24(postCode) {
  const headers = {
    Accept: "application/json",
  };
  // 2017-08-25T12:35Z - ISO8601 FORMAT
  const date = new Date();
  const now = `${date.getFullYear()}-${('0'+(date.getMonth()+1)).slice(-2)}-${('0'+(date.getDate())).slice(-2)}T${('0'+date.getHours()).slice(-2)}:00Z`;
  console.log('Carbon API call for: ' + now + ' with Postcode: ' + postCode);

  try {
    const response = await fetch(
      `https://api.carbonintensity.org.uk/regional/intensity/${now}/fw24h/postcode/${postCode}`,
      {
        method: "GET",

        headers: headers,
      }
    );

    if (response?.ok){
      console.log(`Response Status is: ${response.status}`)
      const result = await response.json();
      const receivedData = result.data.data;
      return receivedData;
    }
    else{
      console.log(`Response Status is: ${response.status}`)
      return null;
    }

  } catch (error){
    console.log(error);
    return null;
  }
} 
