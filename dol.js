
var utils = require('./utils');
var tagUtils = require('./emvtags');

exports.decodeDOL = function(dol){
    var interpretedDOL = []
    if(dol){
        
        //console.log("Decoding DOL: " + dol)
        
        //first split in bytes (2 chars values)
        var splitDOL = utils.splitBytes(dol);

        //console.log("Bytes found in DOL: " + splitDOL.length)
        
        var startPoint=0
        //if starting by 83 (tag for DOL), removing dol tag and length from the analysis
        if(splitDOL[0] == "83"){
            startPoint = 2
        }

        //loop on value byte per byte
        for(var i=startPoint;i<splitDOL.length;i++){
            var tag = splitDOL[i]
            var binTag = utils.Hex2Bin(tag)
            //console.log("bin tag: " + binTag)
            //if((binTag & 0x1F) == 0x1F){
            //bitwise operator doesn't work, try dumb test on string instead
            var last5 = binTag.substr(3,5)
            if(last5 == "11111"){
                //Tag is 2 bytes long
                i++
                tag+= splitDOL[i]
            }

            //console.log("Tag found: " + tag)
            
            //now getting length
            i++
            var tagLength = splitDOL[i]
            //if ((tagLength & 0x80) == 0x80){}

            //console.log("Length found: " + tagLength)
            
            //adding to results
            //interpretedDOL += processTag(tag) + " - Length: "+tagLength + "\n"
            var newEntry = {}
            newEntry.tag = {
                "tag" : tag,
                "name" : processTag(tag)
            }
            newEntry.length = tagLength
            interpretedDOL.push(newEntry)
        }
        //console.log("Interpreted DOL: " + interpretedDOL)
    }
    return interpretedDOL
}

function processTag(tag){
    var interpretedTag = "Unknown tag"

    var foundTag = tagUtils.tagValues(tag,1)
    if(foundTag.length > 0){
        //console.log("Tag found: " + foundTag)
        interpretedTag = foundTag[0].name
    }

    return interpretedTag
}
