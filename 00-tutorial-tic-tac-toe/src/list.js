import { people } from './data.js';
import { getImageUrl } from './utils.js';

function getPerson(isChemist){

 return  people.map(item=>{
    if(isChemist) {
      return item.profession === 'chemist'
    }else{
      item.profession !== 'chemist'
    }
  })

}
function createList(personData){
    const listItems = personData.map(person =>
    <li key={person.id}>
      <img
        src={getImageUrl(person)}
        alt={person.name}
      />
      <p>
        <b>{person.name}:</b>
        {' ' + person.profession + ' '}
        known for {person.accomplishment}
      </p>
    </li>
  );
  return <ul>{listItems}</ul>
}
export default function List() {

  return (
    <article>
      <h1>chemist</h1>
      {createList(getPerson(true))}
      <h1>Scientists</h1>
      {createList(getPerson(false))}
    </article>
  );
}
