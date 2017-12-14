import React from 'react';
import {zscorelabel, signalTrackLabels} from './signaltracklabels';
import {printChrSignalData, printZScoreData} from './printsignaltrackchrdata';
import {xAxisRange, rectHighlight} from '../graphlabels';

export default function packageSignalTrackData(viewBoxWidth,
  viewBoxHeight, horizontal_off_set,
gbStart, signalData, zScoreData, cellType, maxX, minX, handleRectBarMouseClicks){

    let signalLabel = [];
    let zScoreDataCount = 0, signalScoreDataCount= 0;
  if (cellType) {
    var signalTrack = Globals.byCellType[cellType];

    var signalTrackLength = signalTrack.length;
    if (maxX !== undefined && minX !== undefined) {

      let  barYOffSet = 170;

      for (let i = 0; i < signalTrackLength; i++) {

        let fileId = signalTrack[i]["fileID"],
          assay = signalTrack[i]["assay"],
          color = Globals.colors["cREs"][assay],
          barYEndGeneral = 25 + (30) * (zScoreDataCount + 1),
          barYEndCRE = 25 + (30) * (zScoreDataCount + 4);


        if (assay == 'DNase') {
          var maxY = 150
        } else {
          var maxY = 50;
        }

        let mod = '', mod1 = '';
        if (assay === "CTCF") {
          mod = "Es (9 state) ";
          mod1 = "cRE ";
        } else if (assay === "H3K27ac" || assay === "H3K4me3") {
          mod = "(9 state) ";
          mod1 = "cRE ";

        }

        let barSignalYEnd = (55) * (signalScoreDataCount + 1) + barYOffSet;

        if (fileId in signalData) {
          if ("data" in signalData[fileId]) {
            let dataLength = signalData[fileId]["data"].length;
            if (dataLength > 0) {
              if (Object.keys(zScoreData).length > 0
                && assay in zScoreData) {
                if (zScoreData[assay].length > 0){
                zScoreDataCount++;
                signalLabel.push(<svg y ={barYEndGeneral}
                  width={viewBoxWidth} height="50"
                  viewBox={"0 0 " + viewBoxWidth + " " +
                  "20"} xmlns="http://www.w3.org/2000/svg">
                  {zscorelabel(mod + assay, "general cREs " + assay,
                    horizontal_off_set, gbStart, 13.3,
                    viewBoxWidth)} {rectHighlight(
                    gbStart,
                      viewBoxWidth, 30.3, -11.7, handleRectBarMouseClicks.bind(this, fileId))}
                      {printZScoreData(zScoreData,
                        assay, 13.3, 0,
                        horizontal_off_set, viewBoxWidth,
                        maxX, minX)}</svg>
                );

                signalLabel.push(<svg y ={barYEndCRE} width={viewBoxWidth}
                  height="50"
                  viewBox={"0 0 " + viewBoxWidth + " " +
                  "20"} xmlns="http://www.w3.org/2000/svg">
                    {zscorelabel(mod1 + assay, "cREs " + assay,
                      horizontal_off_set, gbStart, 13.3,
                      viewBoxWidth)}
                      {rectHighlight(
                          gbStart,
                            viewBoxWidth, 30.3, -11.7, handleRectBarMouseClicks.bind(this, fileId))}
                      </svg>
                );
              }

              }
              signalScoreDataCount++;
              signalLabel.push(<svg y = {barSignalYEnd}
                width={viewBoxWidth} height="70"
                viewBox={"0 0 " + viewBoxWidth + " " +
                "40"} xmlns="http://www.w3.org/2000/svg" >
                {signalTrackLabels(color, assay, fileId
                  + " Signal " + assay + " K562",
                  horizontal_off_set, 35,
                  viewBoxWidth, maxY)}
                {rectHighlight(
                  gbStart,
                  viewBoxWidth, 63, -13, handleRectBarMouseClicks.bind(this, fileId))}
                {xAxisRange(color,
                  horizontal_off_set, 35, maxY, 0)}
                {printChrSignalData(
                  signalData[fileId]["data"], dataLength,
                  assay, 35, 0,
                  horizontal_off_set, viewBoxWidth,
                  viewBoxHeight, maxX, minX)}</svg>
              );
            }
          }
        }
      }
    }
  }
  return signalLabel;
}
