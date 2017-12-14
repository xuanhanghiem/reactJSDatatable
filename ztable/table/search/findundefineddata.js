export default function findUndefinedData(data, cols, columnkey) {
  let undefinedDataCounts = [];
  let dataLength = data.length;
  let colsLength = cols.length;
  for (let i = 0; i < dataLength; i++) {
    let item = data[i];
    for (let j = 0; j < colsLength; j++) {
      let colData = cols[j][columnkey];
      if (!item[colData] && colData != null && colData != "in_cart") {
        if (undefinedDataCounts[j] != undefined) {
          undefinedDataCounts[j]++;
          if (undefinedDataCounts[j] == dataLength) {
            undefinedDataCounts[j] = true;
          }
        } else {
          undefinedDataCounts.push(1);
        }
      } else {
        if (undefinedDataCounts[j] == undefined) {
          undefinedDataCounts.push(-1);
        }
      }
    }
  }
  return undefinedDataCounts;
}
