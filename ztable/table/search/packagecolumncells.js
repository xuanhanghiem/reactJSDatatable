export default function packageColumnCells(handleCellClicks,
  positionText, cols, columnkey, columnlabel, item, rowIndex, undefinedDataCounts) {
  let cells = [];

if(undefinedDataCounts)
  if (undefinedDataCounts.length == cols.length) {
    var testData = undefinedDataCounts;
  }

  for (let i = 0; i < cols.length; i++) {
    let search_item;

    let colData = cols[i],
        columnName = colData[columnkey],
        columnIndex = i,
        kclass = "";

    if (testData) {
      var eliminateUndefinedData = testData[columnIndex];
    } else {
      var eliminateUndefinedData = undefined;
    }

    // ignore undefined/null data
    if (colData[columnlabel] == null
      || colData[columnlabel] == undefined
      || eliminateUndefinedData == true) {
      continue;
    }

    if ("visible" in colData) {
      if (!colData["visible"])
        continue;
    }

    if ("className" in colData) {
      kclass = positionText + colData["className"];
    }

    // render
    if (colData["defaultContent"]) {
      search_item = colData.defaultContent;
    } else if (colData["render"]) {

      if ("display" in colData["render"])
        search_item =
        colData["render"]["display"](item[columnName], rowIndex);
      else {
        search_item = colData.render(item[columnName], rowIndex);
      }

      // not rendered
    } else {
      search_item = item[columnName];
      // if data cannot be outputted, returns blank
      if (typeof(search_item) == 'object') {
        cells.push( < td className = { kclass }
          onClick = {
            handleCellClicks.bind(this, columnIndex,
              columnkey, kclass) } > {"--"} < /td>);
          continue;
        }
      }
      // adds commas to numbers
      if (!isNaN(search_item)
      && search_item != null
      && search_item != undefined) {
        search_item = search_item.toLocaleString();
      }
      //stores cell data
      if (search_item) {
        cells.push( < td className = {
            kclass
          }
          onClick = {
            handleCellClicks.bind(this, columnIndex,
              columnkey, kclass) }> { search_item } </td>);
        }
        else {
          cells.push( < td className = { kclass }
            onClick = { handleCellClicks.bind(this,
              columnIndex, columnkey, kclass) } > {"--"} < /td>);
          }
        }

        return cells;
      }
