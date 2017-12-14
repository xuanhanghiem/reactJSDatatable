export function signalTrackLabels(color, title, idLabel,
  horizontal_off_set, barGraphYStart,
  viewBoxWidth, maxY){

      let signalLabelOffSet = (String(title).length - 1)*5,

      fontSize = "4",
      midRange = (viewBoxWidth-horizontal_off_set)/2 + 50;

      let startXlabel = horizontal_off_set - 70,
        textOffSet = Math.ceil(idLabel.length/2)*10;
      var fileId = (
        <text x={horizontal_off_set + midRange - textOffSet}
          y="-3" font-family="ariel"
          font-size=".01" fill={color}> {idLabel}
        </text>
      );
    return(
      <g>
        <text x={startXlabel - signalLabelOffSet}
          y={barGraphYStart - 10} font-family="ariel"
          font-size={fontSize} fill={color}> {title}
        </text>
        {fileId}
      </g>
    );
}

export function zscorelabel(title, signalLabel,
  horizontal_off_set, gbStart, barGraphYStart,
  viewBoxWidth){
    let signalLabelOffSet = (String(title).length - 1)*5,
      midRange = (viewBoxWidth-horizontal_off_set)/2 + 50;

      if(title === "DNase"){
        return;
      }

      let fontSize = "3",
        startXlabel = horizontal_off_set - 50,
        textOffSet = Math.ceil(signalLabel.length/2)*10 - 10;
      var fileId = (
        <text x={horizontal_off_set + midRange - textOffSet}
          y={barGraphYStart - 15} font-family="ariel"
          font-size=".01" fill="black"> {signalLabel}
        </text>
      );

    return(
      <g>
        <text x={startXlabel - signalLabelOffSet}
          y={barGraphYStart - 5} font-family="ariel"
          font-size={fontSize} fill="black"> {title}
        </text>
        {fileId}
      </g>
    );
}
