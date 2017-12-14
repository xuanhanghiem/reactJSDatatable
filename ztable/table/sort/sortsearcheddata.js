export default function sortSearchedData(data,
  columnSortType, columnName, searchedResultsIndex){
  if (columnSortType.sortOn != 'disabled') {
    let testCondition = false;
    if ("value" in columnSortType) {
      if (columnSortType["value"]) {
        testCondition = !isNaN(data[0][columnName][columnSortType["value"]]);
      }
    } else {
      testCondition = !isNaN(data[0][columnName]);
    }
    // filters numeric data
    if (testCondition) {

      if ("value" in columnSortType) {
        if (columnSortType["value"]) {
          if (columnSortType.direction == 'asc') {
            searchedResultsIndex.sort(function(a, b) {
              if (data[a][columnName][columnSortType["value"]]
              && data[b][columnName][columnSortType["value"]])
                return data[a][columnName][columnSortType["value"]]
                - data[b][columnName][columnSortType["value"]];
            });
          } else {
            searchedResultsIndex.sort(function(a, b) {
              if (data[a][columnName][columnSortType["value"]]
              && data[b][columnName][columnSortType["value"]])
                return data[b][columnName][columnSortType["value"]]
                - data[a][columnName][columnSortType["value"]];
            });
          }
        }
      } else {
        if (columnSortType.direction == 'asc') {
          searchedResultsIndex.sort(function(a, b) {
            if (data[a][columnName] && data[b][columnName])
              return data[a][columnName] - data[b][columnName];
          });
        } else {
          searchedResultsIndex.sort(function(a, b) {
            if (data[a][columnName] && data[b][columnName])
              return data[b][columnName] - data[a][columnName];
          });
        }
      }
          // filters strings
    } else {
      // case when it is a string
      if ("value" in columnSortType) {
        if (columnSortType["value"]) {

          if (columnSortType.direction == 'asc') {
            searchedResultsIndex.sort(function(a, b) {
              if (data[a][columnName][columnSortType["value"]]
              && data[b][columnName][columnSortType["value"]]) {
                let nameA =
                  data[a][columnName][columnSortType["value"]].toLowerCase(); // ignore upper and lowercase
                let nameB =
                  data[b][columnName][columnSortType["value"]].toLowerCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                  return -1;
                }
                if (nameA > nameB) {
                  return 1;
                }
                // names must be equal
                return 0;
              }
            });
          } else {
            searchedResultsIndex.sort(function(a, b) {

              if (data[a][columnName][columnSortType["value"]]
              && data[b][columnName][columnSortType["value"]]) {
                let nameA =
                  data[a][columnName][columnSortType["value"]].toLowerCase(); // ignore upper and lowercase
                let nameB =
                  data[b][columnName][columnSortType["value"]].toLowerCase(); // ignore upper and lowercase
                if (nameA > nameB) {
                  return -1;
                }
                if (nameA < nameB) {
                  return 1;
                }
                // names must be equal
                return 0;
              }
            });
          }
        }
      } else {
        if (columnSortType.direction == 'asc') {
          searchedResultsIndex.sort(function(a, b) {
              if (data[a][columnName] && data[b][columnName]) {
                let nameA = data[a][columnName].toLowerCase(); // ignore upper and lowercase
                let nameB = data[b][columnName].toLowerCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                  return -1;
                }
                if (nameA > nameB) {
                  return 1;
                }
                // names must be equal
                return 0;
              }
            }
          );
        } else {
          searchedResultsIndex.sort(function(a, b) {
            if (data[a][columnName] && data[b][columnName]) {
              let nameA = data[a][columnName].toLowerCase(); // ignore upper and lowercase
              let nameB = data[b][columnName].toLowerCase(); // ignore upper and lowercase
              if (nameA > nameB) {
                return -1;
              }
              if (nameA < nameB) {
                return 1;
              }
              // names must be equal
              return 0;
            }
          });
        }
      }
    }
  }
}
