import { useState } from "react";

const User = ({ name, location }) => {
  const [count] = useState(0);
  const [count2] = useState(2);
  return (
    <div>
      <h2>{name}</h2>
      <h3>{location}</h3>
      <h3>Count={count}</h3>
      <h3>Count2={count2}</h3>
    </div>
  );
};
export default User;
