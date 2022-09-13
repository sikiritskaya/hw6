import axios from "axios";
const { useState } = require("react");

let url = [
  "https://api.agify.io/?name=",
  "https://api.genderize.io/?name=",
  "https://api.nationalize.io/?name=",
];

const Input = () => {
  const [text, setText] = useState("");

  const [name, setName] = useState("");

  const [gender, setGender] = useState("");

  const [nation, setNation] = useState("");

  const getInfo = () => {
    Promise.all(url.map((endpoint) => axios.get(`${endpoint}${text}`))).then(
      ([{ data: name }, { data: gender }, { data: nation }]) => {
        console.log({ name, gender, nation });
        setName(name);
        setGender(gender);
        setNation(nation);
      }
    );
  };

  return (
    <>
      <input
        value={text}
        placeholder="name"
        onChange={(e) => setText(e.target.value.toLocaleLowerCase())}
      />
      <button onClick={getInfo}>Get info</button>

      <div>
        {name && <h2> Name: {name.name}</h2>}
        {gender && <h2>Gender: {gender.gender}</h2>}
        {nation && <h2>Nation: {nation.country[0].country_id}</h2>}
      </div>
    </>
  );
};

export default Input;
