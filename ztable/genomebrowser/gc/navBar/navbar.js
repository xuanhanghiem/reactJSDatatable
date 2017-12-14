import React from 'react';

import { Button, Form, FormGroup, FormControl, Nav } from 'react-bootstrap';

export default class NavBar extends React.Component {
    render() {
        let chrLengthNavBar = navBar(this.props.handleCHRLengthMouseClicks);
        let firstChrom, firstChromLength;

        if (this.props.chrom !== undefined
          && this.props.chromLength != undefined) {
          firstChrom = this.props.chrom + ": " +
            this.props.start.toLocaleString() + "-" +
            this.props.end.toLocaleString();
          firstChromLength = this.props.chromLength.toLocaleString();
        } else {
          firstChrom = "undefined" + ": " +
            "_" + "-" +
            "_";
          firstChromLength = "0";

        }

        return (
          <div className = "text-center">
            {'move:    '}
            {chrLengthNavBar}
            {'       zoom in:    '}
            <Button bsSize = "small" onClick =
              {this.props.handleZoomMouseClicks.bind(this, 1/1.5)}> {'1.5x'}
            </Button>
            <Button bsSize = "small" onClick =
              {this.props.handleZoomMouseClicks.bind(this, 1/3)}> {'3x'}
            </Button>
            <Button bsSize = "small" onClick =
              {this.props.handleZoomMouseClicks.bind(this, 1/10)}> {'10x'}
            </Button>
            <Button bsSize = "small" onClick =
              {this.props.handleZoomMouseClicks.bind(this, 1)}> base
            </Button>
            {'        zoom out:    '}
            <Button bsSize = "small" onClick =
              {this.props.handleZoomMouseClicks.bind(this, 1.5)}> {'1.5x'}
            </Button>
            <Button bsSize = "small" onClick =
              {this.props.handleZoomMouseClicks.bind(this, 3)}> {'3x'}
            </Button>
            <Button bsSize = "small" onClick =
              {this.props.handleZoomMouseClicks.bind(this, 10)}> {'10x'}
            </Button>
            <Button bsSize = "small" onClick =
              {this.props.handleZoomMouseClicks.bind(this, 100)}> {'100x'}
            </Button>
            <br/>
            <br/>
              <Form inline>
                <FormGroup
                  controlId = "formBasicText">
                  <font size="3">
                  {firstChrom + '       '
                  + firstChromLength + ' bp.             '}
                  </font>
                  <FormControl bsSize = "small"
                    size = "40"
                    type = "text" placeholder={
                    firstChrom}
                    value = { this.props.value }
                    onChange = { this.props.handleChange }/>
                    <FormControl.Feedback/ >
                </FormGroup>
              </Form>
              <br/>
          </div>
        );
      }
    }

function navBar(handleMouseClicks) {
  return (
    <span>
      <Button bsSize = "small" onClick =
        {handleMouseClicks.bind(this, -.95)}> {'<<<'} </Button>
      <Button bsSize = "small" onClick =
        {handleMouseClicks.bind(this, -.475)}> {'<<'} </Button>
      <Button bsSize = "small" onClick =
        {handleMouseClicks.bind(this, -.1)}> {'<'} </Button>
      <Button bsSize = "small" onClick =
        {handleMouseClicks.bind(this, .1)}> {'>'} </Button>
      <Button bsSize = "small" onClick =
        {handleMouseClicks.bind(this, .475)}> {'>>'} </Button>
      <Button bsSize = "small" onClick =
        {handleMouseClicks.bind(this, .95)}> {'>>>'} </Button>
    </span>
  );
}
