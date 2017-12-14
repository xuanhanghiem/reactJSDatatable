export default function creLocation(item) {
  if ("start" in item) {
    var start = item["start"];
  } else {
    var start = undefined;
  }

  if ("len" in item) {
    var end = start + item["len"];
  } else {
    var end = undefined;
  }

  var loc = ({
    start: start,
    end: end,
    len: (end - start),
    chrom: item["chrom"]
  });

return loc;

}
