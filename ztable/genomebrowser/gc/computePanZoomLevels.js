export function panCHRLength(start, end, newStart, newEnd,
  chromBandEnd) {
  if (newStart >= 0 && newEnd <= chromBandEnd) {
    start = Math.round(newStart);
    end = Math.round(newEnd);
  } else {
    let oldStart = newStart,
      oldEnd = newEnd;
    newEnd = oldStart - (oldEnd - chromBandEnd);
    newStart = oldEnd - oldStart;
    if (newStart <= chromBandEnd && newStart > 0 && oldStart < 0) {
      end = Math.round(newStart);
      start = 0;
    } else if (newEnd >= 0 && newEnd < chromBandEnd
      && oldEnd > chromBandEnd) {
      start = Math.round(newEnd);
      end = chromBandEnd;
    }
  }
  return {
    start,
    end
  };
}

export function truncateSignal(normalizedMax,
  normalizedMin, pageWindow, itemHeight){
  let barWidth = normalizedMax - normalizedMin;
  if((normalizedMin < 0 && normalizedMax < 0)
    || (normalizedMin > pageWindow && normalizedMax > pageWindow)){
    return;
  } else if(normalizedMin < 0 && normalizedMax >= 0){
    normalizedMin = 0;
    barWidth = normalizedMax;
  } else if(normalizedMin <= pageWindow && normalizedMax > pageWindow){
    normalizedMax =pageWindow;
    barWidth = pageWindow - normalizedMin;
  }

  if (barWidth === 0 && itemHeight !== 0) {
    barWidth = 1;
  }
  return {normalizedMax, normalizedMin, barWidth};
}

export function estZoomLevel(chromLength) {
  var zoomLevel = -1;
  if (chromLength < 1000000) {
    zoomLevel = -1;
  } else if (chromLength >= 1000000 + Math.pow(9, 3) * 900000) {
    zoomLevel = 9;
  } else {
    let i = 0;
    while (i < 9) {
      if (chromLength < 1000000 +
        Math.pow(i + 1, 3) * 900000 &&
        chromLength >= 1000000 + Math.pow(i, 3) * 900000) {
        zoomLevel = i;
        break;
      }
      i++;
    }
  }
  console.log("zoom", zoomLevel);
  return zoomLevel;
}
