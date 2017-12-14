import React from 'react';
import { Form, FormGroup, FormControl, Nav } from 'react-bootstrap';

export default class SearchBar extends React.Component {
  render() {
    return (
      <Nav pullRight>
        <Form inline>
          <FormGroup
            controlId = "formBasicText"> Search:
            <FormControl bsSize = "small"
              size = "15"
              type = "text"
              value = { this.props.value }
              onChange = { this.props.searchEvent }/>
              <FormControl.Feedback/ >
          </FormGroup>
        </Form>
      </Nav>
    );
  }
}
