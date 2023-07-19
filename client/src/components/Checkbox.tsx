import { useState } from "react";
import { CenterObj } from "./CenterInterface";
const Checkbox = (props: {
  label: String;
  checked: boolean;
  cen: number[];
  center: CenterObj;
}) => {
  console.log(props.label, ` props.checked: `, props.checked);
  const [isChecked, setIsChecked] = useState(props.checked);

  console.log(
    props.label,
    `isChecked: `,
    isChecked,
    ` props.checked: `,
    props.checked
  );

  return (
    <div className="checkbox-wrapper">
      <label className="text-lg">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => {
            setIsChecked((prev) => !prev);
            if (props.cen.indexOf(props.center.center_id) > -1) {
              const index = props.cen.indexOf(props.center.center_id);
              props.cen.splice(index, 1);
            } else {
              props.cen.push(props.center.center_id);
            }
            console.log(props.cen);
          }}
        />
        <span> {props.label}</span>
      </label>
    </div>
  );
};
export default Checkbox;
