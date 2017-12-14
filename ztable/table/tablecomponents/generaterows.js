import matchFound from '../search/matchfound';
import packageColumnCells from '../search/packagecolumncells';
import creLocation from '../../genomebrowser/crelocations';

export default function generateRows(handleCellClicks, positionText, cols,
  columnkey, columnlabel, data, value, searchedResultsIndex,
  current_page, per_page, undefinedDataCounts) {

  let start_count = 0,
    dataLength = 0,
    dataIndex = 0;

  let start_offset = (current_page - 1) * per_page,
    searchLength = searchedResultsIndex.length,
    fullDataLength = data.length;

  if (value == '') {
    dataIndex = start_offset;
  } else if (searchLength > 0) {
    dataIndex = start_offset;
    fullDataLength = searchLength;
  }

  // stores search results
  let cells = [],
    rowComponents = [],
    newSearchedResultsIndex = [];

  let rowIndex;

  let loc = undefined;

  for (dataIndex; dataIndex < fullDataLength; dataIndex++) {

    if (value != '' && searchLength > 0) {
      var item = data[searchedResultsIndex[dataIndex]];
      rowIndex = searchedResultsIndex[dataIndex];
      var show_row = true;
    } else {
      var item = data[dataIndex];
      rowIndex = dataIndex;

      var show_row = matchFound(cols,
        columnkey, item, value);
    }

    // returns rows when search condition true
    if (show_row) {
      dataLength++;

      // stores searched data
      if (value != '' && searchLength == 0) {
        newSearchedResultsIndex.push(dataIndex);
      }

      // sections off pages for pagination
      if (dataIndex >= start_offset && start_count < per_page) {

        start_count++;
        if (start_count == 1) {
          loc = creLocation(item);
        }

        var rowData = creLocation(item);
        cells = packageColumnCells(handleCellClicks.bind(this,
            rowIndex, rowData), positionText, cols,
          columnkey, columnlabel, item, rowIndex, undefinedDataCounts);

        rowComponents.push( < tr key = {
            start_count
          } > {
            cells
          } < /tr>);
        }

      } else {
        start_offset++;
      }
      // exits loop at per page limit
      if (start_count == per_page || dataIndex == fullDataLength - 1) {
        if (value == '' || (searchLength > 0)) {
          dataLength = fullDataLength;
          break;
        }
      }
    }

    if (value != '' && searchLength == 0) {
      searchedResultsIndex = newSearchedResultsIndex;
    }

    if (dataLength == 0) {
      rowComponents.push( < td colSpan = {
          cols.length
        }
        className = "text-center " > No matching records found. < /td>);
      }

      return {
        dataLength,
        rowComponents,
        searchedResultsIndex,
        genomeData: loc
      };
    }
