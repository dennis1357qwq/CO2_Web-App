import { useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { CenterObj } from "./CenterInterface";
import { Map } from "./Map";

export function EditCenter(props: CenterObj) {
  const [CenterName, setCenterName] = useState("");
  const [CenterLocation, setCenterLocation] = useState("");
  const [CenterPeakConsumption, setCenterPeakConsumption] = useState("");
  const [NumberError, setNumberError] = useState(false);
  const [NoChangesError, setNoChangesError] = useState(false);
  const [useAddress, setUseAddress] = useState(true);
  const [validationError, setValidationError] = useState(false);
  const [PostUKok, setPostUKok] = useState(true);
  const [CenterLattitude, setCenterLattitude] = useState("");
  const [CenterLongitude, setCenterLongitude] = useState("");
  const [CenterAdressUnitNr, setCenterAdressUnitNr] = useState("");
  const [CenterAdressLine1, setCenterAdressLine1] = useState("");
  const [CenterAdressLine2, setCenterAdressLine2] = useState("");
  const [CenterAdressCity, setCenterAdressCity] = useState("");
  const [CenterAdressRegion, setCenterAdressRegion] = useState("");
  const [CenterAdressPostCode, setCenterAdressPostCode] = useState("");
  const [CenterAdressCountry, setCenterAdressCountry] = useState("");
  const navigate = useNavigate();

  const dialog = document.querySelector("dialog");

  const checkAndSetPeakCons = (prop: any) => {
    if (isNaN(prop)) return setNumberError(true);
    setCenterPeakConsumption(prop);
  };

  const validateNumberInput = (value: any, setValue: any) => {
    if (value === "-") setValue("-");
    if (isNaN(value)) return;
    setValue(value);
  };

  // const checkIfChanged = () => {
  //   const cName = !CenterName ? props.name : CenterName;
  //   const cLoc = !CenterLocation ? props.location : CenterLocation;
  //   const cPeakCon = !CenterPeakConsumption
  //     ? props.peakCons
  //     : CenterPeakConsumption;
  //   if (
  //     cName === props.name &&
  //     cLoc === props.location &&
  //     +cPeakCon === props.peakCons
  //   )
  //     return true;
  // };

  dialog?.addEventListener("cancel", (event) => {
    event.preventDefault();
  });

  const handleClickOpenEditor = () => {
    dialog?.showModal();
  };

  const handleClickCloseEditor = () => {
    dialog?.close();
  };

  const testfunc = () => {
    // if (checkIfChanged()) {
    //   setNoChangesError(true);
    // }
    // if (!checkIfChanged()) {
    //   setNoChangesError(false);
    //   callPutApi(
    //     props.id,
    //     CenterName ? CenterName : props.name,
    //     CenterPeakConsumption ? +CenterPeakConsumption : props.peakCons,
    //     CenterLocation ? CenterLocation : props.location
    //   );
  };

  async function handleSubmit(e: any) {
    e.preventDefault();
    let a = { postcode: "", outcode: "" };
    a.postcode = "";
    if (
      CenterAdressPostCode ? CenterAdressPostCode : props.adress.postal_code
    ) {
      a = await checkPostalCode(
        CenterAdressPostCode ? CenterAdressPostCode : props.adress.postal_code
      );
    }
    // validateInput();
    if (PostUKok) {
      console.log("test");
      if (useAddress) {
        console.log("test");
        console.log(a.postcode);
        const le = await getLatLongFromAdress(
          CenterAdressLine1 ? CenterAdressLine1 : props.adress.adress_line_1,
          CenterAdressUnitNr ? CenterAdressUnitNr : props.adress.unit_number,
          CenterAdressCity ? CenterAdressCity : props.adress.city,
          CenterAdressRegion ? CenterAdressRegion : props.adress.region,
          CenterAdressCountry ? CenterAdressCountry : props.adress.country,
          a.postcode
        );

        const adress = {
          nr: CenterAdressUnitNr ? CenterAdressUnitNr : 0,
          line_1: CenterAdressLine1
            ? CenterAdressLine1
            : props.adress.adress_line_1,
          line_2: CenterAdressLine2
            ? CenterAdressLine2
            : props.adress.adress_line_2,
          city: CenterAdressCity ? CenterAdressCity : props.adress.city,
          region: CenterAdressRegion ? CenterAdressRegion : props.adress.region,
          postCode: a.postcode,
          country: CenterAdressCountry
            ? CenterAdressCountry
            : props.adress.country,
        };
        const center = {
          center_id: props.center_id,
          CenterName: CenterName ? CenterName : props.name,
          CenterPeakConsumption: CenterPeakConsumption
            ? CenterPeakConsumption
            : props.peak_consumption,
          lat: le.lat,
          long: le.lon,
          outPost: a.outcode,
          adress: adress,
        };
        console.log(center);
        callPutApi(center);
      } else {
        console.log("else");
        const re = await getAdressFromLatLong(
          CenterLattitude ? +CenterLattitude : +props.lattitude,
          CenterLongitude ? +CenterLattitude : +props.longitude
        );
        if (PostUKok) {
          const adress = {
            nr: re.house_number ? re.house_number : 0,
            line_1: re.road,
            line_2: "",
            city: re.city,
            region: re.state,
            postCode: re.postcode,
            country: re.country,
          };
          const center = {
            center_id: props.center_id,
            CenterName: CenterName ? CenterName : props.name,
            CenterPeakConsumption: CenterPeakConsumption
              ? CenterPeakConsumption
              : props.peak_consumption,
            lat: CenterLattitude ? CenterLattitude : props.lattitude,
            long: CenterLongitude ? CenterLongitude : props.longitude,
            outPost: re.postcode,
            adress: adress,
          };

          if (center.adress.country === "United Kingdom") {
            callPutApi(center);
          } else {
            setPostUKok(false);
          }

          console.log(center);
        }
      }

      //Info notification: Center with return data has been added!
    }
    console.log("end");
    // dialog?.close();
    // navigate(0);
  }

  async function checkPostalCode(postal_code: string) {
    const response = await fetch(
      `https://api.postcodes.io/postcodes/${postal_code}`
    );

    const result = await response.json();

    if (result.error) {
      console.log("PostCode  - error"); //error handling
      setPostUKok(false);
    } else {
      setCenterAdressPostCode(result.result.postcode);
      setPostUKok(true);
    }
    return result.result;
  }

  // function validateInput() {
  //   if (
  //     !CenterName ||
  //     !CenterPeakConsumption ||
  //     (!(CenterLattitude && CenterLongitude) &&
  //       (!CenterAdressLine1 ||
  //         !CenterAdressUnitNr ||
  //         !CenterAdressCity ||
  //         !CenterAdressRegion ||
  //         !CenterAdressCountry ||
  //         !CenterAdressPostCode))
  //   ) {
  //     setValidationError(true);
  //     console.log("validation error");
  //   } else {
  //     setValidationError(false);
  //     console.log("valid ok");
  //   }
  // }

  async function getLatLongFromAdress(
    street: string,
    hnr: string,
    city: string,
    state: string,
    country: string,
    postcode: string
  ) {
    const response = await fetch(
      `https://geocode.maps.co/search?street=${hnr}+${street}&city=${city}&state=${state}&postalcode=${postcode}&country=${country}`
    );

    const result = await response.json();

    if (!result[0]) {
      setPostUKok(false);
    } else {
      setPostUKok(true);
    }
    setCenterLattitude(result[0].lat);
    setCenterLongitude(result[0].lon);

    return result[0];
  }

  async function getAdressFromLatLong(lattitude: number, longitude: number) {
    const response = await fetch(
      `https://geocode.maps.co/reverse?lat=${lattitude}&lon=${longitude}`
    );

    const result = await response.json();
    console.log(result.address);
    return result.address;
  }

  return (
    <>
      <button
        type="button"
        className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        onClick={handleClickOpenEditor}
      >
        <svg
          className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
        </svg>
        Edit
      </button>

      <dialog className="rounded min-w-[50%]" id="dialog">
        <div className="py-2 py-2 lg:px-8">
          <h3 className="text-xl font-medium text-gray-900 dark:text-gray">
            Edit Center
          </h3>
          <form
            className="bg-white rounded pt-4 pb-5 mb-2 mt-2"
            onSubmit={handleSubmit}
          >
            <div className="flex items-start mb-4">
              <div className="flex items-center mb-2">
                <input
                  id="radio-adress"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-1 dark:bg-gray-700 dark:border-gray-600"
                  type="radio"
                  value="Address"
                  name="location"
                  defaultChecked
                  onChange={() => {
                    setUseAddress(!useAddress);
                  }}
                />
                <label
                  htmlFor="radio-adress"
                  className="ml-2 text-sm font-medium text-gray-600"
                >
                  Adress
                </label>
                <input
                  id="radio-coordinates"
                  className="ml-5 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-1 dark:bg-gray-700 dark:border-gray-600"
                  type="radio"
                  value="Coordinates"
                  name="location"
                  onChange={() => {
                    setUseAddress(!useAddress);
                  }}
                />
                <label
                  htmlFor="radio-coordinates"
                  className="ml-2 text-sm font-medium text-gray-600"
                >
                  Coordinates
                </label>
              </div>
            </div>
            <div className="mb-2">
              <label
                className="block mb-2 text-sm font-medium text-gray-900"
                htmlFor="center-name"
              >
                Name:
              </label>
              <input
                id="center-name"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type="text"
                value={CenterName}
                placeholder={props.name}
                onChange={(e) => setCenterName(e.target.value)}
              ></input>
            </div>
            <div className="mb-2">
              <label
                className="block mb-2 text-sm font-medium text-gray-900"
                htmlFor="peak-consumption"
              >
                Peak Consumption:{" "}
              </label>
              <input
                id="peak-consumption"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type="text"
                placeholder={"" + props.peak_consumption}
                value={CenterPeakConsumption}
                onChange={(e) =>
                  validateNumberInput(e.target.value, setCenterPeakConsumption)
                }
              ></input>
            </div>

            {!useAddress ? (
              <>
                <Map points={[props]} spawn={[]} showAdress={false} />
                <div className="mb-6">
                  <label
                    className="block mt-2 mb-2 text-sm font-medium text-gray-900"
                    htmlFor="lat"
                  >
                    Lattitude:{" "}
                  </label>
                  <div>
                    <input
                      id="lat"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      type="text"
                      value={CenterLattitude}
                      placeholder={"" + props.lattitude}
                      onChange={(e) =>
                        validateNumberInput(e.target.value, setCenterLattitude)
                      }
                      size={10}
                    ></input>
                    <label
                      className="block mb-2 text-sm font-medium text-gray-900 mt-2"
                      htmlFor="long"
                    >
                      Longitude:
                    </label>
                    <input
                      id="long"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      type="text"
                      value={CenterLongitude}
                      placeholder={"" + props.longitude}
                      onChange={(e) =>
                        validateNumberInput(e.target.value, setCenterLongitude)
                      }
                      size={10}
                    ></input>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="mb-2">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900"
                    htmlFor="adress-line-1"
                  >
                    Adress Line 1:{" "}
                  </label>
                  <input
                    id="adress-line-1"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    type="text"
                    value={CenterAdressLine1}
                    placeholder={props.adress.adress_line_1}
                    onChange={(e) => setCenterAdressLine1(e.target.value)}
                  ></input>
                </div>
                <div className="mb-2">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900"
                    htmlFor="adress-line-2"
                  >
                    Adress Line 2:{" "}
                  </label>
                  <input
                    id="adress-line-2"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    type="text"
                    value={CenterAdressLine2}
                    placeholder={props.adress.adress_line_2}
                    onChange={(e) => setCenterAdressLine2(e.target.value)}
                  ></input>
                </div>
                <div className="mb-2">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900"
                    htmlFor="unit"
                  >
                    Unit:
                  </label>
                  <input
                    id="unit"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    type="text"
                    value={CenterAdressUnitNr}
                    placeholder={
                      props.adress.unit_number === "0"
                        ? ""
                        : props.adress.unit_number
                    }
                    onChange={(e) => setCenterAdressUnitNr(e.target.value)}
                  ></input>
                </div>
                <div className="mb-2">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900"
                    htmlFor="city"
                  >
                    City:
                  </label>
                  <input
                    id="city"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    type="text"
                    value={CenterAdressCity}
                    placeholder={props.adress.city}
                    onChange={(e) => setCenterAdressCity(e.target.value)}
                  ></input>
                </div>
                <div className="mb-2">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900"
                    htmlFor="postcode"
                  >
                    Postcode:
                  </label>
                  <input
                    id="postcode"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    type="text"
                    value={CenterAdressPostCode}
                    placeholder={props.adress.postal_code}
                    onChange={(e) => setCenterAdressPostCode(e.target.value)}
                  ></input>
                </div>
                <div className="mb-2">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900"
                    htmlFor="state"
                  >
                    State:
                  </label>
                  <input
                    id="state"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    type="text"
                    value={CenterAdressRegion}
                    placeholder={props.adress.region}
                    onChange={(e) => setCenterAdressRegion(e.target.value)}
                  ></input>
                </div>
                <div className="mb-2">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900"
                    htmlFor="country"
                  >
                    Country:
                  </label>
                  <input
                    id="country"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    type="text"
                    value={CenterAdressCountry}
                    placeholder={props.adress.country}
                    onChange={(e) => setCenterAdressCountry(e.target.value)}
                  ></input>
                </div>
              </>
            )}
            {validationError ? (
              <p className="text-red-700">Incomplete Input!</p>
            ) : (
              ""
            )}
            {!PostUKok ? (
              <p className="text-red-700">Give an Adress in UK!</p>
            ) : (
              ""
            )}
            <div className="InputLastLine">
              <button
                className="border border-teal-500 bg-teal-500 text-white rounded-md px-4 py-2 m-3 transition duration-500 ease select-none hover:bg-teal-600 focus:outline-none focus:shadow-outline text-l font-medium"
                type="submit"
              >
                Submit
              </button>
              <div className="Button-Message-row">
                <div className="Button-row">
                  <button
                    className="border border-red-500 bg-red-500 text-white rounded-md px-4 py-2 m-3 transition duration-500 ease select-none hover:bg-red-800 focus:outline-none focus:shadow-outline text-l font-medium"
                    onClick={handleClickCloseEditor}
                  >
                    Cancel
                  </button>
                </div>
                {NoChangesError ? (
                  <p className="text-red-700">No changes made!</p>
                ) : (
                  ""
                )}
              </div>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}

function callPutApi(center: any) {
  fetch(`/api/center/${center.center_id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(center),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}
