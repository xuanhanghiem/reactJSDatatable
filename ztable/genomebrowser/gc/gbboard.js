import React from 'react';

import {printChromHeader, gbBoarders, vertDivider,
  highlightDefaultChromLength, chromLengthScaleBar} from './graphlabels';

import SignalTrack from './signalData/signaltrack';

import GeneTrack from './geneData/genetrack';

export default class GBBoard extends React.Component {
  render() {
    let viewBoxWidth = this.props.viewBoxWidth,
      viewBoxHeight = this.props.viewBoxHeight,
      horizontal_off_set = this.props.horizontal_off_set,
      gbStart = this.props.gbStart,

      chrom = this.props.chrom,

      maxX = this.props.maxX,
      minX = this.props.minX;

    let scaleInc = 5,
      dataLengthSegment = (maxX - minX) / scaleInc,
      scaleBar = [],
      segment = (viewBoxWidth -
      horizontal_off_set) / scaleInc;

    scaleBar.push(gbBoarders(gbStart,
      viewBoxWidth, viewBoxHeight));
    scaleBar.push(chromLengthScaleBar(scaleInc, minX,
      dataLengthSegment, segment, horizontal_off_set));

    let highlightChromLength = highlightDefaultChromLength(
      this.props.defaultChromLength,
      this.props.defaultStart, maxX, minX, viewBoxWidth,
      viewBoxHeight, horizontal_off_set);
    let chromHeader = printChromHeader(chrom, gbStart);
    let vert_divider = vertDivider(viewBoxHeight,
      viewBoxWidth, horizontal_off_set);
    return (
      <svg className = "signalTrack" width={viewBoxWidth} 
        height={viewBoxHeight}
        viewBox={"0 0 " + viewBoxWidth + " " +
        viewBoxHeight} xmlns="http://www.w3.org/2000/svg"
        onClick = {this.props.handleGBMouseClicks} onDrag = {this.props.handleGBMouseDrags}>
        {highlightChromLength}
        {vert_divider}
        {chromHeader}
        <SignalTrack
        viewBoxWidth = {viewBoxWidth}
        viewBoxHeight = {viewBoxHeight}
        horizontal_off_set = {horizontal_off_set}
        gbStart = {gbStart}
        cellType = {this.props.cellType}
        handleRectBarMouseClicks = {this.props.handleRectBarMouseClicks}
        signalData = {this.props.signalData}
        zScoreData = {this.props.zScoreData}

        maxX = {maxX} minX = {minX}
        />
        <GeneTrack
        viewBoxWidth = {viewBoxWidth}
        viewBoxHeight = {viewBoxHeight}
        horizontal_off_set = {horizontal_off_set}
        gbStart = {gbStart}
        maxX = {maxX} minX = {minX}
        geneData = {this.props.geneData}
        handleDoubleArrow = {this.props.handleDoubleArrow}/>
        {scaleBar}
        <line x1={horizontal_off_set}
          y1="0" x2={horizontal_off_set}
          y2={viewBoxHeight}
          stroke-width="100" stroke="red"/>
      </svg>
    );
  }
}
