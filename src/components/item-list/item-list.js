import React, { Component } from 'react';
import './item-list.css';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner/spinner';
export default class ItemList extends Component {

  SwapiService = new SwapiService();

  state = {
    peopleList: null,
  };

  componentDidMount() {
    this.SwapiService
      .getAllPeople()
      .then((peopleList) => {
        this.setState({
          peopleList
        });
      });
  }

  renderItems(arr) {
    return arr.map(({ id, name }) => {
      return (

        <li className="list-group-item"
          key={id}
          onClick={() => this.props.onItemSelected(id)}>
          {name}
        </li>
      );
    });
  }


  render() {
    const { peopleList } = this.state;

    if (!peopleList) {
      return <Spinner />;
    }
    const items = this.renderItems(peopleList)
    // const listItems = peopleList.map((human) => {

    //   return (

    //     <li className='list-group-item'>{peopleList}</li>
    //     )
    // }
    // );


    return (

      <ul className="item-list list-group">
        {items}
        {/* <li className="list-group-item">
          Luke Skywalker
        </li>
        <li className="list-group-item">
          Darth Vader
        </li>
        <li className="list-group-item">
          R2-D2
        </li> */}
      </ul>
    );
  }
}