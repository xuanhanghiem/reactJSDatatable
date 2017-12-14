export default function stainFeatures(feature,
  bandWidth, bandHeight, start, end, color){
    switch (feature) {
      case "gneg":
        return (<rect x={start} y="0" width={end-start}
                  height={bandHeight} fill = "hsl(0, 0%, 100%)"
                  stroke = 'black'/>);
      case "acen":
        return (<svg width={bandWidth} height={bandHeight}
                  xmlns="http://www.w3.org/2000/svg"><polyline fill={color}
                  stroke="black" points={ start+',0 ' + start + ","
                  + bandHeight + " " + end + "," + (bandHeight/2)
                  + " " + start+',0' }/>
                </svg>);
      case "inv_acen":
        return (<svg width={bandWidth} height={bandHeight}
                  xmlns="http://www.w3.org/2000/svg"><polyline
                  fill={color} stroke="black" points={ start+','
                  + (bandHeight/2) + ' ' + end + ",0 " + end
                  + "," +  bandHeight + " " + start+',' + (bandHeight/2)}/>
                </svg>);
      case "gvar":
        return (<rect x={start} y="0" width={end-start}
                  height={bandHeight} fill = {"color"} stroke = 'black'/>);
      case "stalk":
        return (<rect x={start} y="0" width={end-start}
                  height={bandHeight} fill = "#880000" stroke = 'black'/>);
      default:
        return (<rect x={start} y="0" width={end-start}
                  height={bandHeight} fill = {color} stroke = 'black'/>);
    }
   }
