import {truncateSignal} from '../computePanZoomLevels';

export function printChrSignalData(data, dataLength,
  assay, barGraphYStart, barGraphYEnd,
  horizontal_off_set, viewBoxWidth, viewBoxHeight, maxX, minX) {
    let indexFirst = 0;
  if (dataLength > 0) {
    let pageWindow = viewBoxWidth - horizontal_off_set,
      color = Globals.colors["cREs"][assay];

    if (assay === 'DNase') {
      var maxY = 150
    } else {
      var maxY = 50;
    }

    let segment = [],
      points = (horizontal_off_set) + ',' + barGraphYStart + ' ',
      maxChromLength = (maxX - minX);
    for (let i = 0; i < dataLength; i++) {
      let item = data[i],

        normalizedMin = (item["min"] - minX) / (maxChromLength) * (pageWindow),
        normalizedMax = (item["max"] - minX) / (maxChromLength) * (pageWindow),

       itemHeight = item["score"] / maxY * (barGraphYStart - barGraphYEnd);

      let high = false;
      if (itemHeight >= (barGraphYStart - barGraphYEnd)) {
        itemHeight = barGraphYStart - barGraphYEnd;
        high = true;
      }

      if(i === 0){
        points += (horizontal_off_set) + ','
        + (barGraphYStart - itemHeight) + ' ';
      }
      if(i === dataLength - 1){
          points += viewBoxWidth + ','
          + (barGraphYStart - itemHeight) + ' ';
      }

      let maxMinC = truncateSignal(normalizedMax,
        normalizedMin, pageWindow, itemHeight);
      if(maxMinC !== undefined){
        normalizedMax = maxMinC.normalizedMax;
        normalizedMin = maxMinC.normalizedMin;
        var barWidth = maxMinC.barWidth;
      } else {
        continue;
      }

        points += (horizontal_off_set + normalizedMin) + "," +
          (barGraphYStart - itemHeight) + ' ' + (horizontal_off_set +
            normalizedMin + barWidth) + ',' +
          (barGraphYStart - itemHeight) + ' ';
        if (high === true) {
          segment.push(
            <line x1 = { horizontal_off_set + normalizedMin }
            y1 = { barGraphYEnd }
            x2 = { horizontal_off_set + normalizedMin + barWidth }
            y2 = { barGraphYEnd }
            stroke-width = "30"
            stroke = '#ff00ff' / >
          );
        }
    }
    points += (viewBoxWidth) + "," + barGraphYStart;
    segment.unshift(
      <svg width = { viewBoxWidth }
      height = { viewBoxHeight }
      xmlns = "http://www.w3.org/2000/svg" >
      <polyline fill = { color }
      stroke = {color}
      points = { points }/></svg >
    );
    return segment;
  }
  return;
}


export function printZScoreData(data,
  assay, barYStart, barYEnd,
  horizontal_off_set, viewBoxWidth, maxX, minX) {

  if (assay in data) {
    let dataLength = data[assay].length,
      pageWindow = viewBoxWidth - horizontal_off_set;

    if (dataLength > 0) {
      let itemHeight = (barYStart - barYEnd),
        segment = [],
        maxChromLength = (maxX - minX);
      for (let i = 0; i < dataLength; i++) {
        let item = data[assay][i],
          color = item["itemRgb"],
          normalizedMin = (item["min"] - minX) /
          (maxChromLength) * (pageWindow),
          normalizedMax = (item["max"] - minX) /
          (maxChromLength) * (pageWindow);

        let maxMinC = truncateSignal(normalizedMax,
          normalizedMin, pageWindow, itemHeight);
        if (maxMinC !== undefined) {
          normalizedMax = maxMinC.normalizedMax;
          normalizedMin = maxMinC.normalizedMin;
          var barWidth = maxMinC.barWidth;
        } else {
          continue;
        }

          segment.push(
            <rect x = { horizontal_off_set + normalizedMin }
              y = { barYEnd }
              width = { barWidth }
              height = { barYStart - barYEnd }
              fill = { color }/>
          );

      }
      return segment;
    }
    return;
  }
}
