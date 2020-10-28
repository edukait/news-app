import React from "react";
import { Button, Form } from "semantic-ui-react";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchTopic: "" };
  }

  handleChange = event => {
    this.setState({ searchTopic: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.searchForTopic(this.state.searchTopic);
  };

  // design of the search bar
  render() {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Input
              placeholder="Search topic i.e. Sports"
              name="topic"
              value={this.state.searchTopic}
              onChange={this.handleChange}
            />
            <Button type="submit" color="blue">
              Search
            </Button>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default SearchBar;
