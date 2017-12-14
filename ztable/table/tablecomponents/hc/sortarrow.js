export default function sortArrow(width, columnHeader, columnName, columnLabel,
  kclass, handleColumnClicks, index, arrowDirection){
    // outputs sort arrow directionality
    if (arrowDirection) {
      columnHeader.push(
        <th key = { columnName +  index}
          width = {width} className = { kclass } 
          onClick = { handleColumnClicks.bind(this, columnName,
            index) }>
          <div><span>{ columnLabel }</span><span>{ arrowDirection }</span></div>
        </th> );
    } else {
      columnHeader.push( <th key = { columnName + index}
        width = {width} className = { kclass }
        onClick = { handleColumnClicks.bind(this,
          columnName, index)}> { columnLabel } </th>);
    }
}
