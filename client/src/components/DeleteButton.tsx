import { useNavigate } from "react-router-dom";

export function DeleteButton(props: {
  id: number;
  path: string;
  user_id: number;
}) {
  const navigate = useNavigate();
  const handleClick = (e: any) => {
    e.preventDefault();

    fetch(props.path, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => console.log(data));

    //Info notification: Center with return data has been added!

    navigate(`/dashboard/${props.user_id}`);
  };

  return (
    <>
      <button onClick={handleClick}>Delete</button>
    </>
  );
}
