import React from "react";
import { people } from "./data.js";
import { getImageUrl } from "@/utils/index.js";
import "./style.css";

function getPerson(isChemist) {
  const temp = people.filter((item) => {
    if (isChemist) {
      return item.profession === "chemist";
    } else {
      return item.profession !== "chemist";
    }
  });
  console.log(temp);
  return temp;
}

function createList(personData) {
  const listItems = personData.map((person) => (
    <div key={person.id} className="card">
      <img src={getImageUrl(person)} alt={person.name} />
      <div>
        <b>{person.name}:</b>
        {" " + person.profession + " "}
        <p>
          <span style={{ color: "orange" }}>known for</span>{" "}
          {person.accomplishment}
        </p>
      </div>
    </div>
  ));
  return <>{listItems}</>;
}

export default React.memo(function PersonList() {
  return (
    <section>
      <h1>chemist</h1>
      <div className="flex">{createList(getPerson(true))}</div>
      <h1>Scientists</h1>
      <div className="flex">{createList(getPerson(false))}</div>
    </section>
  );
});
