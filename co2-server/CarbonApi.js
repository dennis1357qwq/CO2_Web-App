export async function getCarbon(postCode) {
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
