import * as React from "react";
import { useEffect, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ScenarioObj, ScenarioStack } from "./ScenarioInterface";
import { CenterStack, CenterObj } from "./CenterInterface";
import Checkbox from "./Checkbox";

export function EditScenario(props: { scenario_id: number; user_id: number }) {
  const user_id = Number(localStorage.getItem("user_id"));
  const { id } = useParams();
  const path1 = `/api/${user_id}`;
  const path = `/api/scenario/${id}`;

  // get scenario specific centers
  const [backendScenario, setBackendScenario] = React.useState<ScenarioObj>({
    scenario_id: 0,
    user_id: 0,
    centers: [],
  });
  useEffect(() => {
    fetch(path)
      .then((response) => response.json())
      .then((data) => {
        setBackendScenario(data.scenario);
        backendScenario.user_id = data.scenario.user_id;
      });
  }, []);

  // getting all centers
  const [backendCenters, setBackendCenters] = React.useState<CenterStack>({
    centers: [],
  });
  useEffect(() => {
    fetch(path1)
      .then((response) => response.json())
      .then((data) => {
        setBackendCenters(data);
      });
  }, []);

  const dialog = document.querySelector("dialog");

  dialog?.addEventListener("cancel", (event) => {
    event.preventDefault();
  });

  const handleClickOpenEditor = () => {
    dialog?.showModal();
  };

  const handleClickCloseEditor = () => {
    dialog?.close();
  };

  async function handleSubmit() {
    const scenario = {
      scenario_id: Number(id),
      user_id: user_id,
      centers: included,
    };

    fetch(`/api/scenario/${Number(id)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(scenario),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
    handleClickCloseEditor();

    window.location.reload();
  }

  const cen: number[] = [];

  const included: number[] = [];
  for (let i = 0; i < backendScenario.centers.length; i++) {
    included.push(backendScenario.centers[i].center_id);
  }

  const check: boolean[] = [];
  for (let i = 0; i < backendCenters.centers.length; i++) {
    if (included.includes(backendCenters.centers[i].center_id)) {
      check.push(true);
    } else {
      check.push(false);
    }
  }

  console.log(`current ids`);
  console.log(included);

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
          <div className="py-2 py-2 lg:px-8">
            <h3 className="text-xl font-medium text-gray-900 dark:text-gray">
              Edit Center
            </h3>
            <form className="bg-white rounded pt-4 pb-5 mb-2 mt-2">
              {typeof backendCenters === "undefined" ? (
                <div>Loading ...</div>
              ) : (
                backendCenters.centers.map(
                  (center: CenterObj, i: number = center.center_id) => (
                    <div key={i}>
                      {included.includes(center.center_id) ? (
                        <div id="adding-center-button">
                          <Checkbox
                            label={center.name}
                            checked={true}
                            cen={included}
                            center={center}
                          />
                        </div>
                      ) : (
                        <Checkbox
                          label={center.name}
                          checked={false}
                          cen={included}
                          center={center}
                        />
                      )}
                    </div>
                  )
                )
              )}
              <div className="InputLastLine">
                <button
                  className="border border-teal-500 bg-teal-500 text-white rounded-md px-4 py-2 m-3 transition duration-500 ease select-none hover:bg-teal-600 focus:outline-none focus:shadow-outline text-l font-medium"
                  type="submit"
                  onClick={handleSubmit}
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
                </div>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
