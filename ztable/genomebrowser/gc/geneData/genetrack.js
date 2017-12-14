import React from 'react';
import {xAxisRange, rectHighlight} from '../graphlabels';

export default class GeneTrack extends React.Component {
  render() {
    let geneData = this.props.geneData,
      geneDataLength = this.props.geneData.length;

    let viewBoxWidth = this.props.viewBoxWidth,
      viewBoxHeight = this.props.viewBoxHeight,
      horizontal_off_set = this.props.horizontal_off_set;
      let handleDoubleArrow = this.props.handleDoubleArrow;
    let geneStrand = [];

    var max = 9000;
    var min = 1200;
    var normalizedLength = max - min;

    var color = "black";
    var pageWindow = (viewBoxWidth - horizontal_off_set);
    var count = 0;
    horizontal_off_set = horizontal_off_set + 12;
console.log("geneData", geneData);
    for (let i = 0; i < geneDataLength; i++) {
      var item = geneData[i];

      if ("id" in item) {
        if (item["id"].includes("mRNA")) {
          var color = "red";
        } else if (item["id"].includes("cds")) {
          var color = "blue";
        } else {
          color = "black"
        }
      }

      if ("exons" in item) {
        var exonData = item["exons"];
        var exonDataLength = item["exons"].length;
        if (exonDataLength > 0) {
          count++;
          for (let j = 0; j < exonDataLength; j++) {
            var exonItem = exonData[j];
            var start = (exonItem["start"] - min) / normalizedLength * (pageWindow);
            var end = (exonItem["end"] - min) / normalizedLength * (pageWindow);

            if ("cdStart" in exonItem && "cdEnd" in exonItem) {
              var cdStart = (exonItem["cdStart"] - min) / normalizedLength * viewBoxWidth;
              var cdEnd = (exonItem["cdEnd"] - min) / normalizedLength * viewBoxWidth;
              var mid = (count - 1) * 15;

              geneStrand.push(
                <g>
                {drawIntronLines(horizontal_off_set,
                    mid, -5, 10, viewBoxWidth, color,
                    handleDoubleArrow) }
                {drawExon(horizontal_off_set + cdStart,
                    horizontal_off_set + cdEnd, mid - 2.5,
                    color, 5) }
                </g>
              );
            }
          }
        }
      }
    }
    var geneStrandLength = count * 15 + 10;
    return (
      <svg y ="500" width={viewBoxWidth}
        height={geneStrandLength}
        viewBox={"0 -10 " + viewBoxWidth + " " +
        (geneStrandLength)}
        xmlns="http://www.w3.org/2000/svg">
        {rectHighlight(this.props.gbStart,
          viewBoxWidth, geneStrandLength, -10)}
          {geneStrand}
      </svg>
    );
  }
}


function drawIntronLines(start, mid,
  direction, height, end, color, doubleArrowClick) {
  var intronLength = (end - start) / 100;
  var intronArrows = [];
  var intronheight = height / 2;
  for (let i = start; i <= end; i += intronLength) {
    intronArrows.push(drawSingleIntronArrows(i,
      mid, direction, intronheight, color));
  }
  return (
    <g>
      <line x1={start} y1={mid} x2={end}
        y2={mid} stroke-width=".01" stroke={color}/>
        {intronArrows}
      {drawDoubleArrow(start, mid, direction,
        height, doubleArrowClick.bind(this, -1))}
      {drawDoubleArrow(end - 12, mid, -direction,
        height, doubleArrowClick.bind(this, 1))}
    </g>
  );
}

function drawSingleIntronArrows(start,
  mid, direction, height, color) {
  height = height / 2;
  return (
    <path d={("M" + (start)
      + " " + (mid-height)+ " L" + (start)
      + " " + (mid+height)
      + "L" + (start + direction) + " "
      + (mid) )} fill = {color}/>
  );
}

function drawDoubleArrow(start, mid,
  direction, height, doubleArrowClick) {
  height = height / 2;
    return (
      <g onClick = {doubleArrowClick}>
        <path d={("M" + (start) + " "
          + (mid-height)+ " L" + (start) + " " + (mid+height)
          + "L" + (start + direction) + " "
          + (mid) + "Z") + ("M" + (start + direction)
          + " " + (mid-height)+ " L" + (start+ direction)
          + " " + (mid+height)
          + "L" + (start + 2*direction)
          + " " + (mid) + "Z")} stroke="black" fill = "white" />
        </g>
    );
}


function drawExon(startX, endX, startY, color, height) {
  return (
    <rect x={startX} y={startY} width={endX - startX}
      height={height}
      stroke={color} fill={color}/>
  );
}
