import ifRationalIncreaseIndex from './isrational';

export default function searchRows(show_row, search_item, value,
  colData, filterSearch) {

  if (filterSearch)
    return show_row;

  let search_index = 0,
    value_index = 0,
    searchLength = String(search_item).length;

  let renderCondition = true;

  // value is numberic, enter the loop only once
  if (!isNaN(value) && value != 0 &&
    !isNaN(search_item)) {

    if ("render" in colData) {
      // checks rationality
      var numSearch_item = colData.render(search_item);
    } else {
      var numSearch_item = search_item;
    }
    // checks rationality
    let tc = ifRationalIncreaseIndex(
      numSearch_item, value, search_index, value_index);

    search_index = tc.search_index;
    value_index = tc.value_index;

    var compareValue = value.substr(value_index,
      value.length);
    var compareSearchItem =
      String(numSearch_item).substr(search_index,
        compareValue.length);
    if (compareValue == compareSearchItem) {
      // found match
      return true;
    }
    // value is string or object
  } else {
    var compareValue = value.toLowerCase();
    while (search_index < searchLength) {

      if (renderCondition) {
        var compareSearchItem =
          String(search_item).substr(search_index,
            compareValue.length).toLowerCase();
      } else {
        var compareSearchItem =
          String(compareSearchItem).substr(search_index,
            compareValue.length).toLowerCase();
      }

      if (compareValue.length + search_index <= searchLength) {
        if (compareValue == compareSearchItem) {
          // reveals column, found a match
          return true;
        }
      } else {
        //initial found not found, use render method/continue
        if ("render" in colData && renderCondition) {
          compareSearchItem = colData.render(search_item);
          if (typeof search_item == 'string') {
            search_index = 0;
            renderCondition = false;
            searchLength = String(compareSearchItem).length;
            continue;
          }
        }
        break;
      }
      //increment search index of string
      search_index++;
    }
  }
  // returns search condition
  return show_row;
}
