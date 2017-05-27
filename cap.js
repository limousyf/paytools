
var utils = require('./utils');

/**
 * Description: Decodes a Card Additional Processes (CAP - Visa proprietary tag)
 * Input: 4-bytes parameter representing the CAP value, entered as hexadecimal
 * Output: Decoded value for the 4 bytes of the CAP. The output is represented 
 * as a list of key-pair for each relevant bits (bits set to 1b).
 */
exports.decodeCAP = function(value){
    //loop on 4 bytes

    var interpretedCAP= {};
    interpretedCAP.byte1 = []
    interpretedCAP.byte2 = []
    interpretedCAP.byte3 = []
    interpretedCAP.byte4 = []

    for(byte=0;byte<4;byte++){
        
        var startHexPosition = byte*2
        var capBinByte = utils.Hex2Bin(value.substr(startHexPosition,2));

        var readableByte = byte + 1;
          
        for(i=0;i<capBinByte.length;i++){

            var b = 8-i
            if(capBinByte[i] == 1){    
                if(readableByte == 1){
                    interpretedCAP.byte1.push(utils.createBitValue(b,capDataAt(readableByte,i)))
                }
                else if(readableByte == 2){
                    interpretedCAP.byte2.push(utils.createBitValue(b,capDataAt(readableByte,i)))
                }
                else if(readableByte == 3){
                    interpretedCAP.byte3.push(utils.createBitValue(b,capDataAt(readableByte,i)))
                }
                else if(readableByte == 4){
                    interpretedCAP.byte4.push(utils.createBitValue(b,capDataAt(readableByte,i)))
                }
            }
        }
    }
    return interpretedCAP
}

//no data storage
function capDataAt(byte, position){
    var capValueB1 = [
        "Low Value Check supported",
        "Low Value AND CTTA Check supported",
        "Not used for VIS",
        "RFU",
        "Not used for VIS",
        "Not used for VIS",
        "Not used for VIS",
        "Not used for VIS"]

    var capValueB2 = [
        "Not used for VIS",
        "Not used for VIS",
        "RFU",
        "Contactless Issuer Update Processing supported",
        "RFU",
        "RFU",
        "RFU",
        "Not used for VIS"]

    var capValueB3 = [
        "Not used for VIS",
        "Not used for VIS",
        "RFU",
        "Not used for VIS",
        "RFU",
        "RFU",
        "RFU",
        "RFU"]

    var capValueB4 = [
        "Not used for VIS",
        "RFU",
        "RFU",
        "RFU",
        "RFU",
        "RFU",
        "RFU",
        "RFU"]

    if(byte == 1){
        if(position <= capValueB1.length){
            return capValueB1[position]
        }
    }
    else if(byte == 2){
        if(position <= capValueB2.length){
            return capValueB2[position]
        }
    }
    else if(byte == 3){
        if(position <= capValueB3.length){
            return capValueB3[position]
        }
    }
    else if(byte == 4){
        if(position <= capValueB4.length){
            return capValueB4[position]
        }
    }
}