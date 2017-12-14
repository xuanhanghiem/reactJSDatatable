import React from 'react';
import stainFeatures from './stainfeatures';
import chrombands from '../../../../../d3/chrombands';

export default class CytoBand extends React.Component {
    render() {
        let bandWidth = this.props.bandWidth,
          bandHeight = this.props.bandHeight;
        let chromData = chrombands.data,
          specificChromData = undefined;
        if (this.props.chrom !== undefined) {
          specificChromData = chromData[this.props.chrom];
          var chromDataLength = specificChromData.length,
            chromEnd = specificChromData[chromDataLength - 1]["end"],
            start = this.props.start / chromEnd * bandWidth,
            end = this.props.end / chromEnd * bandWidth;
          var segment_highlight = (
            <rect x={start} y="0" width={end - start}
            height={bandHeight} stroke="red" fill="#D3D3D3"
            fillOpacity="0.25" stroke-width="40"/>
          );
          var segment = [],
            color = "",
            cen = false;

          for (let i = 0; i < chromDataLength; i++) {
            let item = specificChromData[i];
              start = item["start"] / chromEnd * bandWidth;
              end = item["end"] / chromEnd * bandWidth;
            let feature = item["feature"];

            if ("color" in item) {
              color = colorPercent(item["color"]);
            } else {
              color = 'hsl(0, 0%, 100%)';
            }

            if (item["feature"] === "acen") {
              if (cen === false) {
                cen = true;
              } else {
                feature = "inv_acen";
              }
            }
            segment.push(stainFeatures(feature, bandWidth,
              bandHeight, start, end, color));
          }

        } else {
          var chromDataLength = undefined,
            chromEnd = undefined;
          var segment = (<rect x="0" y="0" width={bandWidth}
            height={bandHeight} stroke="black" fill="white"
            fillOpacity="0.25" stroke-width="40"/>),
            segment_highlight = (<rect x="10" y="0" width="20"
            height={bandHeight} stroke="red" fill="#D3D3D3"
            fillOpacity="0.25" stroke-width="40"/>);
        }

      return (
        <div className = "text-center" onClick =
          {this.props.handleChromBandMouseClicks.bind(this,
            null, chromEnd, bandWidth)}>
          <svg className="genomeBrowser" width={this.props.bandWidth}
            height={this.props.bandHeight} viewBox={"0 0 " + this.props.bandWidth
            + " " + this.props.bandHeight}
            xmlns="http://www.w3.org/2000/svg" id = "cytoband">
            {segment}
            {segment_highlight}
          </svg>
        </div>
      );
    }
  }

  function colorPercent(num) {
    return "hsl(0, 0%," + (1 - num) * 100 + "%)";
  }
