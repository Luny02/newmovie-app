import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import './random-planet.css';
import Spinner from '../spinner/spinner';
import ErrorIndicator from '../error-indicator/error.indicator';

export default class RandomPlanet extends Component {

  SwapiService = new SwapiService();

  state = {
    planet: {},
    loading: true,
    error: false

  };

  onError = (err) => {
    this.setState({
      error: true
    })
  };

  constructor() {
    super()
    this.updatePlanet()
    setInterval(this.updatePlanet, 2500)
  };

  onPlanetLoaded = (planet) => {
    this.setState({ planet, loading: false, error: false });
  };



  updatePlanet = () => {

    const id = Math.floor(Math.random() * 17 + 2 )
    console.log(id)

    this.SwapiService.getPlanet(id).then((planet) => this.onPlanetLoaded(planet))
  }

  render() {

    const { planet: { id, name, population, rotationPeriod,
      diameter },
      loading, error } = this.state
    if (error) return <ErrorIndicator />
    if (loading) {
      return <Spinner />
    }


    return (
      <div className="random-planet jumbotron rounded">
        <img className="planet-image"
          src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
        <div>
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Population</span>
              <span>{population}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Rotation Period</span>
              <span>{rotationPeriod}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Diameter</span>
              <span>{diameter}</span>
            </li>
          </ul>
        </div>
      </div>

    );
  }
}


