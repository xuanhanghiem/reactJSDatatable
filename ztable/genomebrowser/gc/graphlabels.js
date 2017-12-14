import {truncateSignal} from './computePanZoomLevels';

export function printChromHeader(item, gbStart) {
  return (
    <g>
      <text x = {gbStart + 125} y = "35" font-family = "ariel"
        font-size = "3" fill = "black" > { item + ': ' }
      </text>
      <text x = {gbStart + 130} y = "15" font-family = "ariel"
        font-size = "2" fill = "black"> scale
      </text>
    </g> );
}

export function gbBoarders(gbStart, viewBoxWidth, viewBoxHeight){
      return(
        <g>
        <line x1={gbStart} y1="0" x2={viewBoxWidth}
          y2="0" stroke-width="1" stroke="black"/>
        <line x1={gbStart} y1={viewBoxHeight}
          x2={viewBoxWidth} y2={viewBoxHeight}
          stroke-width="1" stroke="black"/>
        <line x1={viewBoxWidth} y1="0"
          x2={viewBoxWidth} y2={viewBoxHeight}
          stroke-width="1" stroke="black"/>
        <line x1={gbStart} y1="0"
          x2={gbStart} y2={viewBoxHeight}
          stroke-width="1" stroke="black"/>
        <line x1={Number(gbStart) + 20} y1="0"
          x2={Number(gbStart) + 20} y2={viewBoxHeight}
          stroke-width="1" stroke="black"/>
        </g>);

    }

export function vertDivider(viewBoxHeight,
  viewBoxWidth, horizontal_off_set) {
  let vert_divider = [],
    len = ((viewBoxWidth - horizontal_off_set) / 100),
    halfLen = len/2;
  for (let i = 0; i < viewBoxWidth; i = i + len) {
    vert_divider.push(<g>
      <line x1 = { horizontal_off_set + i }
      y1 = "0" x2 = { horizontal_off_set + i }
      y2 = {viewBoxHeight} stroke-width = "1" stroke = "#B4CFEC"/>
      <rect x={horizontal_off_set + i - halfLen} y="0"
      width={len} id="verthoverover" height={viewBoxHeight}
      stroke="white" fill="white" opacity="0.1"/>
      </g>);
  }
  return(vert_divider);
}

export function chromLengthScaleBar(scaleInc, minX,
  dataLengthSegment, segment, horizontal_off_set){
      let scaleBar = [];
      for(let i = 0; i < scaleInc; i++){
        if(i === 0){
          continue;
        }
        let dataLengthkb = Math.round(dataLengthSegment*2*.001);
        if(dataLengthkb > 0){
          var dlUnit = dataLengthkb.toLocaleString() + " kb";
        } else {
          var dlUnit = Math.round(dataLengthSegment*2).toLocaleString() + " bp";
        }
        let lengthOffset = dlUnit.length*9;

        if(i === scaleInc - 1){
          scaleBar.push(<g>
            <line x1={horizontal_off_set + segment*(i - 2)} y1="8"
          x2={horizontal_off_set + segment*i} y2="8"
          stroke-width="1" stroke="black"/>

          <line x1={horizontal_off_set + segment*(i - 2)} y1="4"
          x2={horizontal_off_set + segment*(i - 2)} y2="12"
          stroke-width="1" stroke="black"/>
          <line x1={horizontal_off_set + segment*(i)} y1="4"
          x2={horizontal_off_set + segment*(i)} y2="12"
          stroke-width="1" stroke="black"/>
          <text x={horizontal_off_set + segment*(i - 2)
            - lengthOffset} y="13" font-family="ariel"
            font-size=".2" fill="black"> {dlUnit}
          </text>
          </g>);
        }
          let value = minX + Math.round(dataLengthSegment*i);
          scaleBar.push(<line x1={horizontal_off_set + segment*i} y1="23"
          x2={horizontal_off_set + segment*i} y2="37"
          stroke-width="1" stroke="black"/>);
          let valueLength = String(value).length*9.5;
          scaleBar.push(
            <text x={horizontal_off_set + segment*i
              - valueLength} y="35" font-family="ariel"
              font-size=".2" fill="black"> {value.toLocaleString()}
            </text>
          );
      }
      return scaleBar;
    }

export function highlightDefaultChromLength(defaultChromLength,
  defaultStart, maxX, minX, viewBoxWidth,
  viewBoxHeight, horizontal_off_set) {
  let pageWindow = viewBoxWidth - horizontal_off_set,
    maxChromLength = (maxX - minX),
    maxStart = (defaultStart - minX) / (maxChromLength) *
    (pageWindow),
    chromLength = defaultChromLength / (maxChromLength) *
    (pageWindow),
    maxEnd = maxStart + chromLength;

    let maxMinC = truncateSignal(maxEnd,
      maxStart, pageWindow, viewBoxHeight);
    if(maxMinC !== undefined){
      maxEnd = maxMinC.normalizedMax;
      maxStart = maxMinC.normalizedMin;
      chromLength = maxMinC.barWidth;
    } else {
      return;
    }
  return (
    <g>
      <rect x={ horizontal_off_set + maxStart}
        y="0" width={chromLength} height={viewBoxHeight}
        fill="#ADDFFF"/>
    </g>
  );
}

export function rectHighlight(
gbStart,
  viewBoxWidth, rectHeight, rectY, handleRectBarMouseClicks){
return( <g>
    <rect x={gbStart} y={rectY} width="20"
      id="horizontalhoverover" height={rectHeight}
      stroke="black" fill="#D3D3D3" onClick = {handleRectBarMouseClicks}/>
      <rect x={gbStart + 20} y={rectY} width={viewBoxWidth}
        id="horizontalhoverover" height={rectHeight}
        stroke="white" fill="white" opacity="0.1" />
      </g>
  );
}

export function xAxisRange(color,
  horizontal_off_set, barGraphYStart, maxY, minY){
    let positionX1 = horizontal_off_set - 10,
      positionX2 = horizontal_off_set - 5,
      positionY = 3;
    let offsetX = (String(maxY).length - 1) *5;
    return(
      <g>
      <line x1={positionX1} y1={positionY}
      x2={positionX2} y2={positionY}
      stroke-width="100" stroke={color}/>
      <line x1={positionX1} y1={barGraphYStart}
      x2={positionX2} y2={barGraphYStart}
      stroke-width="100" stroke={color}/>
      <text x={horizontal_off_set - 25 - offsetX}
        y={barGraphYStart + 5} font-family="ariel"
        font-size=".01" fill={color}> {minY}
      </text>
      <text x={horizontal_off_set - 30 - offsetX}
        y="8" font-family="ariel"
        font-size=".01" fill={color}>{maxY}
      </text>
      </g>
    );
}
