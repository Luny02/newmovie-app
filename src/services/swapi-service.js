export default class SwapiService {
    _apiBase = `https://swapi.dev/api`
    async getResource (url) {
      const res = await fetch(`${this._apiBase}${url}`);
      if (!res.ok) {
        throw new Error(`Could not fetch ${url}`)
      }
      const body = await res.json();
      return body;
    }
    async getAllPeople () {
      const res = await this.getResource (`/people/`);
      return res.results.map(this._transformPerson)
    }
   async getPerson (id) {
      const person = await this.getResource(`/people/${id}`)
      console.log(person)
      return this._transformPerson(person)
    }
    async getAllPlanets () {
      const res = await this.getResource (`/planets/`);
      return res.results
    }
     async getPlanet (id) {
      const planetData = await this.getResource(`/planets/${id}`);
      console.log(planetData)
      console.log(this._transformPlanet(planetData))
      return this._transformPlanet(planetData)
    }
    async getAllStarships () {
      const res  =await this.getResource (`/starships/`);
      return res.results
  }
  getStarship (id) {
    return this.getResource(`/starships/${id}`)
  }
    _transformPlanet  = (planet) => {
      const idRegExp = /\/([0-9]*)\/$/

      return {
        id: planet.url.match(idRegExp)[1],
        name: planet.name,
        population: planet.population,
        rotationPeriod: planet.rotation_period,
        diameter: planet.diameter,
      }
    };

    _transformPerson = (person) => {
      const idRegExp = /\/([0-9]*)\/$/

      return {
        id: person.url.match(idRegExp)[1],
       name: person.name,
       gender: person.gender,
       birthYear: person.birth_year,
       eyeColor: person.eye_color
    }
  } 
}