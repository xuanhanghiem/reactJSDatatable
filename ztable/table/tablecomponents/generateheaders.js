import printColumn from './hc/printcolumn';
import { Glyphicon } from 'react-bootstrap';
import sortArrow from './hc/sortarrow';

export default function generateHeaders(handleColumnClicks, positionText,
  cols, columnkey, columnlabel, columnSort, dataLength, undefinedDataCounts) {
  let columnHeader = [], columnSortTypes = [];
if(undefinedDataCounts)
  if (undefinedDataCounts.length == cols.length) {
    var testData = undefinedDataCounts;
  }

  for (let index = 0; index < cols.length; index++) {
    let colData = cols[index],
        columnName = colData[columnkey],
        columnLabel = colData[columnlabel];

    let kclass = "";

    if (testData) {
      var eliminateUndefinedData = testData[index];
    } else {
      var eliminateUndefinedData = undefined;
    }

    if ("className" in colData) {
      kclass = positionText + colData["className"];
    }

    if("width" in colData) {
      var width = colData["width"];
    } else {
      var width = undefined;
    }

    // initital load, samples data for sorting
    if (columnSort.length == 0) {

      var cc = printColumn(colData, columnName,
        columnLabel, index, kclass, handleColumnClicks,
        eliminateUndefinedData);
      var printCols = cc.printCols;
      if (cc.columnSortTypes)
        columnSortTypes.push(cc.columnSortTypes);
      if (cc.columnHeader){
        columnHeader.push(cc.columnHeader);
      }
      if (!printCols) {
        continue;
      }

      if (columnSortTypes[index] && dataLength > 1) {
        if (columnSortTypes[index].sortOn != 'disabled') {
          var inactiveArrowColor = "#C0C0C0";

          // if inactive color gray
          if (columnSortTypes[index].sortOn == 'inactive') {

            var inactiveArrow = ( < font color = {
                inactiveArrowColor
              } size = "3" > < Glyphicon glyph = "sort" / > < /font>);

              sortArrow(width, columnHeader, columnName, columnLabel,
                kclass, handleColumnClicks, index,
                inactiveArrow);
            }
          }
        } else {

          sortArrow(width, columnHeader, columnName,
            columnLabel, kclass, handleColumnClicks, index);
        }
        // after initial load, draws active, inactive arrows
      } else if (dataLength > 1) {

        var cc = printColumn(colData, columnName,
          columnLabel, index, kclass, handleColumnClicks,
          eliminateUndefinedData);
        var printCols = cc.printCols;

        if (cc.columnHeader)
          columnHeader.push(cc.columnHeader);
        if (!printCols) {
          continue;
        }

        if (columnSort[index].sortOn != 'disabled') {
          var activeArrowColor = "#9fbedf",
            inactiveArrowColor = "#C0C0C0";

          // if inactive color gray
          if (columnSort[index].sortOn == 'inactive') {

            var inactiveArrow = ( < font color = {
                inactiveArrowColor
              } size = "3" > < Glyphicon glyph = "sort" / > < /font>);

              sortArrow(width, columnHeader, columnName, columnLabel,
                kclass, handleColumnClicks, index, inactiveArrow);

            }
            else if (columnSort[index].sortOn == 'active') {
              if (columnSort[index].direction == 'desc') {
                var activeArrow = ( < font color = {
                    activeArrowColor
                  } size = "3" > < Glyphicon glyph = "sort-by-attributes" / > < /font>);

                  sortArrow(width, columnHeader, columnName, columnLabel,
                    kclass, handleColumnClicks, index, activeArrow);
                }
                else {
                  var activeArrow = ( < font color = {
                      activeArrowColor
                    } size = "3" > < Glyphicon glyph = "sort-by-attributes-alt" / > < /font>);

                    sortArrow(width, columnHeader, columnName, columnLabel,
                      kclass, handleColumnClicks, index, activeArrow);
                  }
                }
              } else {
                sortArrow(width, columnHeader, columnName, columnLabel,
                  kclass, handleColumnClicks, index);
              }
            } else {
              // initial load, data length == 1
              if (colData[columnlabel] == null
                || colData[columnlabel] == undefined
                || eliminateUndefinedData == true) {
                continue;
              }

              sortArrow(width, columnHeader, columnName, columnLabel,
                kclass, handleColumnClicks, index);
            }
          }
          // generate our header (th) cell components
          return {
            columnHeader,
            columnSortTypes
          }
        }
