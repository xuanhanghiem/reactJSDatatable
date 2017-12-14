import React from 'react';

import ReactiveTable from './table/reactivetable';
import generateRows from './table/tablecomponents/generaterows';
import generateHeaders from './table/tablecomponents/generateheaders';

import { Button, Glyphicon } from 'react-bootstrap';

import SearchBar from './table/searchbar';
import findUndefinedData from './table/search/findundefineddata';

import customSort from './table/sort/customsort';
import sortData from './table/sort/sortdata';

import GenomeBrowser from './genomebrowser/genomebrowser';

import { printCSVHeader, printCSVRowData } from './printCSV/printcsv';
import { storeRadioCheck, switchRadioCheck, turnOffRadio } from './radiobutton/radiobutton';

export default class ZTable extends React.Component {

    constructor(props) {
      super(props);

      // initializes state of variable
      this.state = {

        positionText: "text-left ",
        columnkey: "data",
        columnlabel: "title",

        activePage: 1,
        activeSearchPage: 1,
        pageLength: 10,

        value: '',
        searchCondition: false,
        searchedResultsIndex: [],
        // variables for sorting
        columnSort: [],

        genomeBrowserOn: false,
        rowData: undefined,

        radioData: undefined,

      };

      // binds event handler
      this.handleSelect = this.handleSelect.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleColumnClicks = this.handleColumnClicks.bind(this);
      this.handleCellClicks = this.handleCellClicks.bind(this);

      this.handleCSVButtonClicks = this.handleCSVButtonClicks.bind(this);
    }


    render() {

        let data = this.props.data,
          cols = this.props.cols;

        if (this.props.table) {
          var table = this.props.table;
          if (table.cols) {
            cols = table.cols;
          }
        }

        if (this.props.columnkey)
          var columnkey = this.props.columnkey;
        else
          var columnkey = this.state.columnkey;

        if (this.props.columnlabel)
          var columnlabel = this.props.columnlabel;
        else
          var columnlabel = this.state.columnlabel;

        if (this.props.positionText)
          var positionText = this.props.positionText;
        else
          var positionText = this.state.positionText;

        if (this.props.pageLength)
          var per_page = this.props.pageLength;
        else
          var per_page = this.state.pageLength;

        if (this.props.bPaginate != undefined &&
          this.props.bPaginate != null) {
          if (!this.props.bPaginate) {
            per_page = data.length;
          }
        }

        if (this.state.searchCondition)
          var current_page = this.state.activeSearchPage;
        else
          var current_page = this.state.activePage;

        if (this.props.bFilter != undefined &&
          this.props.bFilter != null) {
          if (this.props.bFilter) {

            var searchBar = ( <SearchBar value = {
                this.state.value
              }
              searchEvent = { this.handleChange }/>
            );
          } else {
            var searchBar = undefined;
          }
        } else {
          var searchBar = ( <
            SearchBar value = {
              this.state.value
            }
            searchEvent = {
              this.handleChange
            }
            />);
          }

          var undefinedDataCounts = findUndefinedData(data, cols, columnkey);

          let rc = generateRows(this.handleCellClicks.bind(this,
              cols), positionText, cols,
            columnkey, columnlabel, data, this.state.value,
            this.state.searchedResultsIndex, current_page,
            per_page, undefinedDataCounts);

          let rowComponents = rc.rowComponents,
            dataLength = rc.dataLength, genomeData = rc.genomeData;

          let hc = generateHeaders(this.handleColumnClicks, positionText,
            cols, columnkey, columnlabel, this.state.columnSort,
            dataLength, undefinedDataCounts);
          let headerComponents = hc.columnHeader,
            columnSortTypes = hc.columnSortTypes;

          let pages = Math.ceil(dataLength / per_page);

          this.state.searchedResultsIndex = rc.searchedResultsIndex;

          if (columnSortTypes.length == cols.length) {
            this.state.columnSort = columnSortTypes;
          }

          var buttons = ( <
              Button bsSize = "small"
              onClick = {
                this.handleCSVButtonClicks.bind(this,
                  cols, columnkey, columnlabel, data)
              } > CSV <
              font color = "#C0C0C0" >
              <
              Glyphicon glyph = "save" / >
              <
              /font> <
              /Button>);
              if (this.props.buttonsOff) {
                buttons = [];
              }

              this.state.radioData = storeRadioCheck("radioBOfCellType",
                this.state.searchCondition, this.state.searchedResultsIndex,
                current_page, per_page, this.state.radioData, data);

              switchRadioCheck("radioBOfCellType",
                this.state.searchCondition, this.state.searchedResultsIndex,
                current_page, per_page, this.state.radioData, data);

                if(this.props.genomeBrowserOn)
                  this.state.genomeBrowserOn = this.props.genomeBrowserOn;

                if(this.state.genomeBrowserOn == true){

                  if(genomeData || this.state.rowData != undefined){
                    var genomeBrowser = (<GenomeBrowser data = {genomeData}
                 cellType = {this.props.cellType} rowData = {this.state.rowData}/>);

                  } else {
                    var genomeBrowser = (<GenomeBrowser data = {{
                      start: undefined,
                      end: undefined,
                      len: undefined,
                      chrom: undefined
                    }}
                 cellType = {this.props.cellType} rowData = {this.state.rowData}/>);
                  }
                }
            // returns search box and result table
            return (
              <div>
              {genomeBrowser}
                {buttons}
                { searchBar }
                <ReactiveTable
                  headerComponents = { headerComponents }
                  rowComponents = { rowComponents }
                  per_page = { per_page }
                  pages = { pages }
                  current_page = { current_page }
                  bPaginate = { this.props.bPaginate }
                  pageChange = { this.handleSelect }
                  dataLength = { dataLength }
                  searchCondition = { this.state.searchCondition }/>
              </div>
            );
          }

          handleChange(e) {
            // checks search condition
            if (e.target.value != '') {
              this.setState({
                value: e.target.value,
                searchedResultsIndex: [],
                rowData: undefined,
                searchCondition: true,
                activeSearchPage: 1
              });
            } else {
              this.setState({
                value: e.target.value,
                searchedResultsIndex: [],
                rowData: undefined,
                searchCondition: false
              });
            }

            turnOffRadio("radioBOfCellType", this.state.radioData);
          }

          handleSelect(eventKey) {
            if (this.state.searchCondition)
              this.setState({
                activeSearchPage: eventKey, rowData: undefined
              });
            else
              this.setState({
                activePage: eventKey, rowData: undefined
              });

              turnOffRadio("radioBOfCellType", this.state.radioData);
          }

          handleCSVButtonClicks(cols, columnkey,
            columnlabel, data) {
            var csvContent = "data:text/csv;charset=utf-8,";
            cols.map(function(colData) {
              var headerLabel = printCSVHeader(colData, columnlabel);
              csvContent += headerLabel + ',';
            });

            if (this.state.searchCondition) {
              var searchedResultsIndex = this.state.searchedResultsIndex;

              searchedResultsIndex.map(function(item) {
                var dataContent = '';
                csvContent += "\n";
                cols.map(function(colData) {
                  dataContent = printCSVRowData(colData,
                    columnkey, data[item]);
                  csvContent += dataContent + ',';
                });
              });
            } else {
              data.map(function(item) {
                var dataContent = '';
                csvContent += "\n";
                cols.map(function(colData) {
                  dataContent = printCSVRowData(colData,
                    columnkey, item);
                  csvContent += dataContent + ',';
                });
              });
            }

            var encodedUri = encodeURI(csvContent);
            var link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "SCREEN.csv");
            document.body.appendChild(link); // Required for FF

            link.click();
          }

          handleCellClicks(cols, rowIndex, rowData,
            columnIndex, columnkey, kclass) {
            var data = this.props.data[rowIndex];

            this.setState({
              rowData: rowData
            });

            if (this.props.onTdClick) {
              var onTdClick = this.props.onTdClick;
              onTdClick(kclass, data);
            }
            if (this.props.onButtonClick) {
              var onButtonClick = this.props.onButtonClick;
              onButtonClick(kclass, data);
            }
            if (this.props.rowClicks) {
              var rowClicks = this.props.rowClicks;
              rowClicks(kclass,
                cols[columnIndex][columnkey], data);
            }
          }

          handleColumnClicks(columnName, index) {
            // rerender if sorting is true
            if(!this.state.searchCondition) {
              this.setState({
                searchedResultsIndex: [], rowData: undefined
              });
            } else {
              this.setState({rowData: undefined});
            }

            turnOffRadio("radioBOfCellType", this.state.radioData);

            let columnSort = this.state.columnSort,
              data = this.props.data;

            if (data.length > 1) {
              let columnSortType = [];
              if (columnSort.length > 0) {

                if (columnSort[index]['sortOn'] != 'disabled') {
                  for (let i = 0; i < columnSort.length; i++) {
                    if (columnSort[i]['sortOn'] != 'disabled') {
                      Object.assign(columnSort[i], {
                        sortOn: 'inactive'
                      });
                    }
                  }
                  columnSortType = columnSort[index];
                  Object.assign(columnSort[index], {
                    sortOn: 'active'
                  });

                  if (columnSortType["customSort"]) {
                    customSort(data, columnSortType, columnName);
                  } else {
                    sortData(data, columnSortType, columnName,
                      this.state.searchedResultsIndex);
                  }
                  if (columnSort[index].direction == 'asc') {
                    Object.assign(columnSort[index], {
                      direction: 'desc'
                    });
                  } else {
                    Object.assign(columnSort[index], {
                      direction: 'asc'
                    });
                  }
                }
              }
            }
          }
        }
