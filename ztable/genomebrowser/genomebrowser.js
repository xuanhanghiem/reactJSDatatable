import React from 'react';

import NavBar from './gc/navBar/navbar';

import chrombands from '../../../d3/chrombands';
import CytoBand from './gc/navBar/cytoband';

import GBBoard from './gc/gbboard';

import {searchBrowserValues, numRange} from './gc/navBar/searchbrowser';
import {panCHRLength, estZoomLevel} from './gc/computePanZoomLevels';

var bigwig = require('./external/bigwig.js');
var bin = require('./external/bin.js');
var igv = require('./feature/featureSource.js');



export default class GenomeBrowser extends React.Component {

  constructor(props, key) {
    super(props);

    this.key = key;
    // initializes state of variable
    this.state = {
      value: '',
      horizontal_off_set: 300,

      viewBoxWidth: "1200",
      viewBoxHeight: "200",
      gbStart: 115,

      signalData: {},
      zScoreData: {},
      geneData: [],
      navTrans: 1,

      start: undefined,
      defaultStart: undefined,
      end: undefined,
      chrom: undefined,
      chromLength: undefined,
      chromBandEnd: undefined,
      defaultChromLength: undefined,

      zoomLevel: -1,
    };

    this.handleZoomMouseClicks = this.handleZoomMouseClicks.bind(this);
    this.handleCHRLengthMouseClicks = this.handleCHRLengthMouseClicks.bind(this);
    this.handleChromBandMouseClicks = this.handleChromBandMouseClicks.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.handleGBMouseDrags = this.handleGBMouseDrags.bind(this);
    this.handleDoubleArrow = this.handleDoubleArrow.bind(this);
    this.handleRectBarMouseClicks = this.handleRectBarMouseClicks.bind(this);
    this.readBigWig = this.readBigWig.bind(this);
    this.readBigBed = this.readBigBed.bind(this);
    this.readGTF = this.readGTF.bind(this);
  }

  componentWillMount() {
    var chromData = chrombands.data;
    this.readGTF(this.state);
    this.readBigBed(this.state);
    this.readBigWig(this.props["cellType"], this.state);
    if (this.props["data"] != undefined) {
      this.state.start = this.props["data"]["start"];
      this.state.end = this.props["data"]["end"];
      this.state.chrom = this.props["data"]["chrom"];
      this.state.chromLength = this.props["data"]["len"];
      this.state.defaultChromLength = this.props["data"]["len"];
      this.state.defaultStart = this.props["data"]["start"];
        if(this.state.chrom !== undefined)
      this.state.chromBandEnd = chromData[this.state.chrom]
        [chromData[this.state.chrom].length - 1]["end"];
    }
  }

  componentDidMount() {
    if (this.state.chrom != undefined){
      this.readGTF(this.state);
      this.readBigBed(this.state);
      this.readBigWig(this.props["cellType"], this.state);
    }

  }

  componentWillReceiveProps(nextProps) {
    var chromData = chrombands.data;
    if (nextProps["rowData"] != undefined) {
      this.state.start = nextProps["rowData"]["start"];
      this.state.defaultStart = nextProps["rowData"]["start"];
      this.state.end = nextProps["rowData"]["end"];
      this.state.chrom = nextProps["rowData"]["chrom"];
      this.state.chromLength = nextProps["rowData"]["len"];
      this.state.defaultChromLength = nextProps["rowData"]["len"];
      if(this.state.chrom !== undefined)
      this.state.chromBandEnd = chromData[this.state.chrom]
        [chromData[this.state.chrom].length - 1]["end"];
    } else if (nextProps["data"] != undefined) {
      this.state.start = nextProps["data"]["start"];
      this.state.defaultStart = nextProps["data"]["start"];
      this.state.end = nextProps["data"]["end"];
      this.state.chrom = nextProps["data"]["chrom"];
      this.state.chromLength = nextProps["data"]["len"];
      this.state.defaultChromLength = nextProps["data"]["len"];
        if(this.state.chrom !== undefined)
      this.state.chromBandEnd = chromData[this.state.chrom]
        [chromData[this.state.chrom].length - 1]["end"];
    }
    this.readGTF(this.state);
    this.readBigBed(this.state);
    this.readBigWig(nextProps["cellType"], this.state);
  }

  componentWillUpdate(nextProps, nextState) {
    if ((Object.keys(nextState["signalData"]).length === 0 &&
        nextState["signalData"].constructor === Object) ||
      nextState["navTrans"] === 1) {
      this.readGTF(nextState);
      this.readBigBed(nextState);
      this.readBigWig(nextProps["cellType"], nextState);
    }
  }

  render() {
    loadFile ('../../../../../../static/hs.gtf', geneDataParser);
    let chrom = this.state.chrom;
    if (this.props.cellType) {
      let signalTrack = Globals.byCellType[this.props.cellType];
      var signalTrackLength = signalTrack.length;
    }

    let maxX, minX, horizontal_off_set = this.state.horizontal_off_set;
    if (chrom !== undefined) {
      this.state.viewBoxHeight = 20 + (60) *
        (signalTrackLength + 1) * 2.5;
      maxX = this.state.end;
      minX = this.state.start;
    } else {
      this.state.viewBoxHeight = "100";
    }

    return (
      <div>
        <NavBar handleCHRLengthMouseClicks =
          {this.handleCHRLengthMouseClicks}
          handleZoomMouseClicks = {this.handleZoomMouseClicks}
          chrom = {chrom}
          start = {minX} end = {maxX}
          chromLength = {this.state.chromLength}
          value = {this.state.value} handleChange = {this.handleChange}/>

        <div className="genomeBrowser" >
          <CytoBand chrom = {chrom}
            bandWidth = {"700"} bandHeight = {"15"}
            start = {minX} end = {maxX}
            handleChromBandMouseClicks = {this.handleChromBandMouseClicks}/>
          <GBBoard viewBoxWidth = {this.state.viewBoxWidth}
            viewBoxHeight = {this.state.viewBoxHeight}
            horizontal_off_set = {horizontal_off_set}
            gbStart = {this.state.gbStart}

            chrom = {chrom}
            defaultChromLength = {this.state.defaultChromLength}
            defaultStart = {this.state.defaultStart}

            cellType = {this.props.cellType}

            signalData = {this.state.signalData}
            zScoreData = {this.state.zScoreData}
            geneData = {this.state.geneData}
            maxX = {maxX} minX = {minX}
            handleRectBarMouseClicks = {this.handleRectBarMouseClicks}
            handleDoubleArrow = {this.handleDoubleArrow}

            handleGBMouseDrags = {this.handleGBMouseDrags}/>
        </div>
      </div>
    );
  }

  handleGBMouseDrags(e){
    e = window.event;
    let root = document.getElementById('cytoband');
    let x = root.createSVGPoint();
    x.x = e.clientX;
    x.y = e.clientY;
    let ctm = e.target.getScreenCTM();
    if (ctm = ctm.inverse())
      x = x.matrixTransform(ctm);
console.log("x", x);


  }

handleRectBarMouseClicks(fileId){

alert(fileId);

}


  handleDoubleArrow(e){

alert(e);



  }




readGTF(nextState) {
  var chr = "chr1",
    bpStart = 1,
    bpEnd = 10000;
    let chrom = nextState["chrom"],
      start = nextState["start"],
      end = nextState["end"], chromLength = this.state.chromLength,
      viewBoxWidth = this.state.viewBoxWidth;

  var featureSource = new igv.FeatureSource({
    url: '../../../../../../static/hs.gtf',
    format: 'gff3'
  });

  featureSource.getFeatures(chr, bpStart, bpEnd).then(function(data) {
    this.state.geneData = data;
  }.bind(this)).catch(function(error) {
    console.log(error);
  });
}

  readBigBed(nextState) {
    if(nextState["chrom"] !== undefined){
      let bbURI = [{
          key: "CTCF",
          "CTCF": 'http://bib7.umassmed' +
            '.edu/~purcarom/screen/ver4/v10/hg19-cRE.CTCF.cREs.bigBed'
        },
        {
          key: "H3K27ac",
          "H3K27ac": 'http://bib7.umassmed.edu/' +
            '~purcarom/screen/ver4/v10/hg19-cRE.Enhancer.cREs.bigBed'
        },
        {
          key: "H3K4me3",
          "H3K4me3": 'http://bib7.umassmed.edu/' +
            '~purcarom/screen/ver4/v10/hg19-cRE.Promoter.cREs.bigBed'
        }
      ];

      let urlLength = bbURI.length,
        chrom = nextState["chrom"],
        start = nextState["start"],
        end = nextState["end"];

      let zScoreData = {};
      for (let i = 0; i < urlLength; i++) {
        let key = bbURI[i]["key"],
          url = bbURI[i][key];

        bigwig.makeBwg(new bin.URLFetchable(url),
          function(key, bwg, err) {
            if (bwg) {
              let data;
              if (nextState["zoomLevel"] < 0) {
                data = bwg.getUnzoomedView();
              } else {
                data = bwg.getZoomedView(nextState["zoomLevel"]);
              }
              data.readWigData(chrom, start, end, function(key, data, err) {
                if (data) {
                  zScoreData[key] = data;
                  if (i === urlLength - 1) {
                    this.state.zScoreData = zScoreData;
                  }
                } else {
                  console.log("error!", err);
                }
              }.bind(this, key));
            } else {
              console.log("error!", err);
            }
          }.bind(this, key));
      }


    }

  }

  readBigWig(cellType, nextState) {
    if (cellType !== undefined && nextState["chrom"] !== undefined) {
      let signalTrack = Globals.byCellType[cellType];
      var signalTrackLength = signalTrack.length;
      let signalData = {},
        chrom = nextState["chrom"],
        start = nextState["start"],
        end = nextState["end"];
      for (let i = 0; i < signalTrackLength; i++) {
        let fileId = signalTrack[i]["fileID"];
        if (fileId in nextState["signalData"]) {
          if ((Object.keys(signalData).length === 0 &&
              signalData.constructor === Object)) {
            signalData = nextState["signalData"];
          }
          if ("dataId" in signalData[fileId]) {
            let data;
            if (nextState["zoomLevel"] < 0) {
              data = signalData[fileId]["dataId"].getUnzoomedView();
            } else {
              data = signalData[fileId]["dataId"].getZoomedView(nextState["zoomLevel"]);
            }

            data.readWigData(chrom,
              start, end,
              function(fileId, data, err) {
                if(data){
                  signalData[fileId]["data"] = data;
                  if (i === signalTrackLength - 1) {
                    this.setState({
                      signalData,
                      navTrans: 0
                    });
                  }
                } else {
                  console.log("error!", err);
                }
              }.bind(this, fileId));
          }
        } else {
          signalData[fileId] = {};
          let url = "https://www.encodeproject.org/files/" +
            fileId + "/@@download/" + fileId + ".bigWig";
          bigwig.makeBwg(new bin.URLFetchable(url), function(fileId, bwg, err) {
            if (bwg) {
              signalData[fileId]["dataId"] = bwg;
              let data;
              if (nextState["zoomLevel"] < 0) {
                data = bwg.getUnzoomedView();
              } else {
                data = bwg.getZoomedView(nextState["zoomLevel"]);
              }
              data.readWigData(chrom, start, end, function(fileId, data, err) {
                if(data){
                  signalData[fileId]["data"] = data;
                  if (i === signalTrackLength - 1) {
                    this.setState({
                      signalData,
                      navTrans: 0
                    });
                }
              } else {
                console.log("error!", err);
              }
              }.bind(this, fileId));
            } else {
              console.log("error!", err);
            }
          }.bind(this, fileId));
        }
      }
    }
  }

  handleChange(e) {
    let value = e.target.value;
    if (value !== '') {

      let sbc = searchBrowserValues(value,
        this.state.chrom, this.state.start, this.state.defaultStart,
        this.state.end, this.state.chromLength, this.state.defaultChromLength,
        chrombands.data);

      let end = sbc.end,
      chromLength = sbc.chromLength,
      chrom = sbc.chrom,
      start = sbc.start,
      chromBandEnd = sbc.chromBandEnd,
      defaultStart = sbc.defaultStart,
      defaultChromLength = sbc.defaultChromLength;

      let zoomLevel = estZoomLevel(chromLength);
      Object.assign(this.key, {
        chrom,
        start,
        end,
        zoomLevel
      });

      this.setState({
        value,
        start, defaultStart,
        end,
        chromLength,
        defaultChromLength,
        chromBandEnd,
        chrom,
        navTrans: 1,
        zoomLevel
      });
    } else {
      this.setState({
        value: value,
      });
    }
  }


  handleCHRLengthMouseClicks(panFactor) {
    if (this.state.chrom !== undefined && this.state.chromLength > 0) {
      let chromBandEnd = this.state.chromBandEnd,
       chromLength = this.state.chromLength * panFactor,
       newStart = this.state.start + chromLength,
       newEnd = this.state.end + chromLength;
      let lc = panCHRLength(this.state.start, this.state.end,
        newStart, newEnd, chromBandEnd);
      let start = lc.start,
        end = lc.end;
        chromLength = lc.end - lc.start;
      if (this.state.start !== start
        && this.state.end !== end && chromLength > 0) {
        Object.assign(this.key, {
          start,
          end
        });
        this.setState({
          start,
          end,
          chromLength,
          navTrans: 1
        });
      }
    }
  }

  handleChromBandMouseClicks(e, chromEnd, bandWidth) {
    if(chromEnd !== undefined && this.state.chromLength > 0){
      e = window.event;
      let root = document.getElementById('cytoband');
      let x = root.createSVGPoint();
      x.x = e.clientX;
      x.y = e.clientY;
      let ctm = e.target.getScreenCTM();
      if (ctm = ctm.inverse())
        x = x.matrixTransform(ctm);
        let barChromEnd = x.x / bandWidth * chromEnd,
          halfChromLength = this.state.chromLength/2,
          newStart = barChromEnd - halfChromLength,
          newEnd = barChromEnd + halfChromLength;

        let lc = panCHRLength(this.state.start, this.state.end,
          newStart, newEnd, chromEnd);
        let start = lc.start,
          end = lc.end, chromLength = lc.end - lc.start;

         if(start != this.state.start
           && end != this.state.end && chromLength > 0){
           Object.assign(this.key, {
             start,
             end
           });
           this.setState({
             start,
             end,
             chromLength,
             navTrans: 1
           });
         }
    }
  }

  handleZoomMouseClicks(zoomFactor) {
    if (this.state.chromLength > 0) {
      if (zoomFactor === 1) {
        this.setState({
          chromLength: this.state.defaultChromLength,
          zoomLevel: -1,
          start: this.state.defaultStart,
          end: this.state.defaultStart + this.state.defaultChromLength,
          signalData: {},
        });
      } else {
        let chromBandEnd = this.state.chromBandEnd,
          chromLength = (this.state.chromLength * zoomFactor / 2),
          centerPoint = this.state.start +
          Math.round((this.state.chromLength) / 2),
          newStart = centerPoint - chromLength,
          newEnd = centerPoint + chromLength;
        let lc = panCHRLength(this.state.start, this.state.end,
          newStart, newEnd, chromBandEnd);
        let start = lc.start,
          end = lc.end;
          chromLength = end - start;
        if (start != this.state.start
          && end != this.state.end && chromLength > 0) {
          let zoomLevel = estZoomLevel(chromLength);
          Object.assign(this.key, {
            start,
            end,
            zoomLevel
          });
          this.setState({
            chromLength,
            zoomLevel,
            start,
            end,
            navTrans: 1,
          });
        }
      }
    }
  }
  }


  function xhrSuccess () { this.callback.apply(this, this.arguments); }

  function xhrError () { console.error(this.statusText); }

  function loadFile (sURL, fCallback) {
  var oReq = new XMLHttpRequest();
  oReq.callback = fCallback;
  oReq.arguments = Array.prototype.slice.call(arguments, 2);
  oReq.onload = xhrSuccess;
  oReq.onerror = xhrError;
  oReq.open("get", sURL, true);
  oReq.send(null);
}

function geneDataParser() {

var lines = this.responseText.split('\n');
console.log("lines", lines);
var lineLength = lines.length;

var geneData = [];
var count = 0;
for (let i = 5; i < lineLength; i++){
geneData.push({count});


var component = lines[i].split(';');
var componentLength = component.length;
for (let j = 0; j < componentLength; j++){
var parsedElement = component[j].split('\t');
var parsedElementLength = parsedElement.length;

if(parsedElementLength === 1){
var geneData = parsedElement.split(" ");
geneData[count][geneData[0]] = geneData[1];
  console.log("geneData", geneData);
}
  


}

}




}
