import React from 'react';
import { Pagination, HelpBlock } from 'react-bootstrap';

export default class ReactiveTable extends React.Component {
    render() {
        let dataLength = this.props.dataLength;

          let tableKlass = "table table-bordered-bottom table-condensed table-hover";

        if (this.props.bPaginate != undefined
          && this.props.bPaginate != null) {
          if (this.props.bPaginate) {

            var pagination = (
              <Pagination className = "users-pagination pull-right"
              bsSize = "medium"
              maxButtons = { 3 }
              first last next prev boundaryLinks
              items = { this.props.pages }
              activePage = { this.props.current_page }
              onSelect = { this.props.pageChange } />);
            }
            else {
              var pagination = undefined;
            }
          } else {
            var pagination = (
              <Pagination className = "users-pagination pull-right"
              bsSize = "medium"
              maxButtons = { 3 }
              first last next prev boundaryLinks
              items = { this.props.pages }
              activePage = { this.props.current_page }
              onSelect = { this.props.pageChange }/>);
            }
            if (dataLength <= 1 && !this.props.searchCondition) {
              var helpBlock = undefined;
            } else {
              if(dataLength == 1){
                var helpBlock = (
                  <HelpBlock> Found { dataLength } result </HelpBlock>);
              } else {
                var helpBlock = (
                  <HelpBlock> Found { dataLength } results </HelpBlock>);
              }
              }
              return (
                <div>
                  <table className = { tableKlass }>
                    <thead> { this.props.headerComponents } </thead>
                    <tbody> { this.props.rowComponents } </tbody>
                  </table>
                { pagination }
                { helpBlock }
                </div>);
              }
            }
