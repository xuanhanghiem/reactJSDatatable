import React from 'react';
import {panCHRLength} from '../computePanZoomLevels';
export function searchBrowserValues(value,
  chrom, start, defaultStart, end, chromLength, defaultChromLength, chromData) {

if(chrom !== undefined)
  var chromBandEnd = chromData[chrom]
      [chromData[chrom].length - 1]["end"];
else
var chromBandEnd = undefined;
  var sc = searchBrowser(value,
    start, end, chromBandEnd);
  if (sc.condition === 1) {
    start = sc.start;
    end = sc.end;
    chromLength = end - start;
  } else if (sc.condition === 2) {
    if (sc.chromValue !== '') {
      chrom = sc.chromValue;
      chromBandEnd = chromData[chrom]
          [chromData[chrom].length - 1]["end"];
    }
    if (sc.compareSTR1 !== '' && sc.compareSTR2 !== '') {
      var nr = numRange(sc.compareSTR1, sc.compareSTR2);
      if(nr.end - nr.start > 0){
        start = nr.start;
        defaultStart = start;
        end = nr.end;
        chromLength = nr.chromLength;
        defaultChromLength = chromLength;
      }
    }
  }
  return {
    start,
    end,
    chromLength,
    chrom, chromBandEnd, defaultStart, defaultChromLength
  };
}


function searchBrowser(value, start, end, chromBandEnd) {
  var condition = 0;
  if (!isNaN(value) && value > 0 && value <= chromBandEnd) {
    var numValue = Number(value)/2;
    var midpoint = start + Math.round((end - start)/2);
    var newStart = midpoint - numValue;
    var newEnd = midpoint + numValue;
      let lc = panCHRLength(start, end,
        newStart, newEnd, chromBandEnd);
      let newStart = lc.start,
        newEnd = lc.end;
       if(start != newStart && end != newEnd && newEnd - newStart > 0){
         return {
           start: newStart,
           end: newEnd,
           chromLength: newEnd - newStart,
           condition: 1
         };
       }
  } else {
    var n = value.search("chr");
    var compareSTR1 = '';
    var compareSTR2 = '';
    var findSTR1 = true;
    var chromValue = '';
    var valueLength = value.length;
    if (n !== -1 && valueLength > n + 3) {
      var chromNum = value[n + 3];
      if (valueLength > n + 4)
        chromNum += value[n + 4];
      if (!isNaN(chromNum)) {
        if (1 <= chromNum && chromNum <= 22) {
          chromValue = "chr" + chromNum;
        }
      } else if (!isNaN(chromNum[0])) {
        chromValue = "chr" + chromNum[0];
      } else if (chromNum.toLowerCase() === 'x' ||
        chromNum.toLowerCase() === 'y') {
        chromValue = "chr" + chromNum.toUpperCase();
      }
    }

    for (let i = 0; i < value.length; i++) {
      if (!isNaN(value[i])) {
        if (findSTR1)
          compareSTR1 += value[i];
        else
          compareSTR2 += value[i];
      } else {
        if (value[i] === "-" && compareSTR1 !== '') {
          if (findSTR1) {
            findSTR1 = false;
          }
        } else {
          compareSTR1 = '';
        }
      }
    }
    if (compareSTR1 !== '' && compareSTR2 !== '') {
      compareSTR1 = Number(compareSTR1);
      compareSTR2 = Number(compareSTR2);
    } else {
      compareSTR1 = "";
      compareSTR2 = "";
    }
    if (chromValue !== '' || (compareSTR1 !== '' && compareSTR2 !== '')) {
      return {
        chromValue,
        compareSTR1,
        compareSTR2,
        condition: 2
      };
    }
  }
  return {
    condition: 0
  };
}

export function numRange(compareSTR1, compareSTR2) {
  if (compareSTR1 < compareSTR2) {
    return {
      start: compareSTR1,
      end: compareSTR2,
      chromLength: compareSTR2 - compareSTR1
    };
  } else if (compareSTR1 > compareSTR2) {
    return {
      start: compareSTR2,
      end: compareSTR1,
      chromLength: compareSTR1 - compareSTR2
    };
  }
  return;
}
