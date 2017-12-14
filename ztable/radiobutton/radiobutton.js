export function storeRadioCheck(radioName, searchCondition,
  searchedResultsIndex, current_page, per_page, radioData, data){
  var radioButton = document.getElementsByName(radioName);
  for (let i = 0; i < radioButton.length; i++) {
    if (searchCondition) {
      var radioIndex =
      searchedResultsIndex[(current_page - 1) * per_page + i];
    } else {
      var radioIndex = (current_page - 1) * per_page + i;
    }
    if (radioButton[i].checked) {
      if (radioData == undefined) {
        radioData = data[radioIndex];
      } else if (radioData != data[radioIndex]) {
        radioData = data[radioIndex];
      }
    }
  }
return radioData;
}

export function switchRadioCheck(radioName, searchCondition,
  searchedResultsIndex, current_page, per_page, radioData, data){
  var radioButton = document.getElementsByName(radioName);
  for (let i = 0; i < radioButton.length; i++) {
    if (searchCondition) {
      var radioIndex =
      searchedResultsIndex[(current_page - 1) * per_page + i];
    } else {
      var radioIndex = (current_page - 1) * per_page + i;
    }
    if (radioData == data[radioIndex] &&
      radioData != undefined) {
      radioButton[i].checked = true;
    }
  }
}

export function turnOffRadio(radioName, radioData){
  var radioButton = document.getElementsByName(radioName);
  for (let i = 0; i < radioButton.length; i++) {
    if (radioData != undefined) {
      if (radioButton[i].checked) {
        radioButton[i].checked = false;
        break;
      }
    }
  }
}
