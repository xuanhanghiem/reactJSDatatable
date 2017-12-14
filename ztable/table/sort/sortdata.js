import sortFullData from './sortfulldata';
import sortSearchedData from './sortsearcheddata';

export default function sortData(data, columnSortType,
  columnName, searchedResultsIndex) {
  if (searchedResultsIndex.length == 0) {
    sortFullData(data, columnSortType, columnName);
  } else {
    sortSearchedData(data, columnSortType, columnName, searchedResultsIndex);
  }
}
