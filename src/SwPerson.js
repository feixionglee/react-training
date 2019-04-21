import React from 'react';

function getPersonPlanet(name) {
  return fetch("https://swapi.co/api/people")
    .then(people_resp => people_resp.json())
    .then(people => {
      return people["results"].find((person) => person.name === name);
    })
    .then(person => {
      if (!person) {
        throw new Error("Not Found");
      }
      return fetch(person["homeworld"]);
    })
    .then(planets_resp => planets_resp.json())
    .then(planet => {
      let result = `${planet["name"]} - ${planet["population"]}`
      return result;
    })
    .catch(err => err.message);
}

class SwPerson extends React.Component {
  constructor(props) {
    super(props);

    const name = this.props.name || '';
    this.state = {
      name: name,
      target: ''
    }
  }

  componentDidMount() {
    getPersonPlanet("Luke Skywalker").then(str =>
      this.setState({name: str})
    );
  }

  handleClick = () => {
    let target = this.state.target;
    getPersonPlanet(target).then(str =>
      this.setState({name: str})
    );
  }

  handleChange = (evt) => {
    this.setState({
      target: evt.target.value
    })
  }

  render() {
    return(
      <div>
        <p>{this.state.name}</p>
        <input size={50} value={this.state.target} onChange={evt => this.handleChange(evt)} />
        <button style={{width:100}} onClick={this.handleClick} >Get Details</button>
      </div>
    )
  }
}

export { SwPerson };