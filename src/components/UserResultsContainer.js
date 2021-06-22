import React, { Component } from "react";
import UserDataset from "../components/UserDataset/UserDataset";
import Search from "./Search/Search";
import API from "../utils/api.js";

class UserResultsContainer extends Component {
  state = {
    search: "",
    results: [],
    filteredResults: [],
  };

  componentDidMount() {
    this.loadEmployees();
  }

  loadEmployees = () => {
    API.fetchEmployees()
      .then((res) => {
        this.setState({
          results: res.data.results,
          filteredResults: res.data.results,
        });
        console.log(this.state.results);
      })
      .catch((err) => console.log(err));
  };

  handleInputChange = (event) => {
    const value = event.target.value;
    this.setState({ search: value });
    this.searchByName(value.toLowerCase());
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
  };

  searchByName = (input) => {
    if (input !== "") {
      this.setState({
        filteredResults: this.state.results.filter((user) => {
          return user.name.first.toLowerCase().includes(input);
        }),
      });
      console.log(this.state.filteredResults);
    } else {
      this.setState({ filteredResults: this.state.results });
    }
  };

  render() {
    return (
      <>
        <Search
          value={this.state.search}
          handleInputChange={this.handleInputChange}
          handleFormSubmit={this.handleFormSubmit}
        />

        <UserDataset
          results={this.state.filteredResults}
          searchByName={this.searchByName}
        />
      </>
    );
  }
}

export default UserResultsContainer;
