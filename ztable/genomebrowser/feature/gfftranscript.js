var GFFTranscript = function (feature) {
    Object.assign(this, feature);
    this.exons = [];
    this.attributeString = feature.attributeString;
}

GFFTranscript.prototype.addExon = function (feature) {
    this.exons.push({
        start: feature.start,
        end: feature.end
    });
    // Expand feature --  for transcripts not explicitly represented in the file
    this.start = Math.min(this.start, feature.start);
    this.end = Math.max(this.end, feature.end);
}

GFFTranscript.prototype.addCDS = function (cds) {

    var i, exon,
        exons = this.exons;

    // Find exon containing CDS
    for (i = 0; i < exons.length; i++) {
        if (exons[i].start <= cds.start && exons[i].end >= cds.end) {
            exon = exons[i];
            break;
        }
    }

    if (exon) {
        exon.cdStart = exon.cdStart ? Math.min(cds.start, exon.cdStart) : cds.start;
        exon.cdEnd = exon.cdEnd ? Math.max(cds.end, exon.cdEnd) : cds.end;

    } else {
        exons.push({start: cds.start, end: cds.end, cdStart: cds.start, cdEnd: cds.end});  // Create new exon
    }

    // Expand feature --  for transcripts not explicitly represented in the file
    this.start = Math.min(this.start, cds.start);
    this.end = Math.max(this.end, cds.end);

    this.cdStart = this.cdStart ? Math.min(cds.start, this.cdStart) : cds.start;
    this.cdEnd = this.cdEnd ? Math.max(cds.end, this.cdEnd) : cds.end;

}

GFFTranscript.prototype.addUTR = function (utr) {

    var i, exon,
        exons = this.exons;

    // Find exon containing CDS
    for (i = 0; i < exons.length; i++) {
        if (exons[i].start <= utr.start && exons[i].end >= utr.end) {
            exon = exons[i];
            break;
        }
    }

    if (exon) {
        if (utr.start === exon.start && utr.end === exon.end) {
            exon.utr = true;
        }

    } else {
        exons.push({start: utr.start, end: utr.end, utr: true});  // Create new exon
    }

    // Expand feature --  for transcripts not explicitly represented in the file
    this.start = Math.min(this.start, utr.start);
    this.end = Math.max(this.end, utr.end);
}

GFFTranscript.prototype.finish = function () {

    var cdStart = this.cdStart;
    var cdEnd = this.cdEnd;

    this.exons.sort(function (a, b) {
        return a.start - b.start;
    })

    // Search for UTR exons that were not explicitly tagged
    if (cdStart) {
        this.exons.forEach(function (exon) {
            if (exon.end < cdStart || exon.start > cdEnd) exon.utr = true;
        });
    }

}


module.exports = GFFTranscript;
