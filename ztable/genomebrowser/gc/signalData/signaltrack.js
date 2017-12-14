import React from 'react';
import {zscorelabel, signalTrackLabels} from './signaltracklabels';
import {printChrSignalData, printZScoreData} from './printsignaltrackchrdata';
import {xAxisRange, rectHighlight} from '../graphlabels';
import packageSignalTrackData from './packagesignaltrackdata';
export default class SignalTrack extends React.Component {
  render() {
    let viewBoxWidth = this.props.viewBoxWidth,
      viewBoxHeight = this.props.viewBoxHeight,
      horizontal_off_set = this.props.horizontal_off_set,
      gbStart = this.props.gbStart,
      signalData = this.props.signalData,
      zScoreData = this.props.zScoreData;
    var testvar = packageSignalTrackData(viewBoxWidth,
      viewBoxHeight, horizontal_off_set, gbStart, signalData,
      zScoreData, this.props.cellType, this.props.maxX,
      this.props.minX, this.props.handleRectBarMouseClicks);
    return (
      <svg>
         {testvar}
      </svg>
    );
  }
}
