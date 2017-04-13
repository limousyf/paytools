
var utils = require('./utils');

/**Description: Decodes a Transaction Status Information (TSI - EMV tag 9B)
Input: 2-bytes parameter representing the TSI value, entered as hexadecimal
Output: Decoded value for the 2 bytes of the TSI. The output is represented as 
a list of key-pair for each relevant bits (bits set to 1b).*/
exports.decodeTSI = function(value){
        var tsiBinByte1 =utils.Hex2Bin(value.substr(0,2));
        var interpretedTSI= {};
        interpretedTSI.byte1 = []
        interpretedTSI.byte2 = []

        //console.log('B1: ' + tsiBinByte1)
        //processing B1
        for(i=0;i<tsiBinByte1.length;i++){
            //console.log('bit ' + i + " : " + [tsiBinByte1[i]])
            if(tsiBinByte1[i] == 1){
                var b = 8-i
                //interpretedTSI += "Byte 1 - bit " + b + " : " + tsiDataAt(1,i)+"\n"
                interpretedTSI.byte1.push(utils.createBitValue(b,tsiDataAt(1,i)))
            }
        }

        //processing B2
        if(value.length == 4){
            var tsiBinByte2 = utils.Hex2Bin(value.substr(2,2));

            //console.log('B2: ' + tsiBinByte2)
            for(i=0;i<tsiBinByte2.length;i++){
            
                //console.log('bit ' + i + " : " + [tsiBinByte2[i]])
                if(tsiBinByte2[i] == 1){
                    var b = 8-i
                    //interpretedTSI += "Byte 2 - bit " + b + " : " + tsiDataAt(2,i)+"\n"
                    interpretedTSI.byte2.push(utils.createBitValue(b,tsiDataAt(2,i)))
                }
            }
        }

        return interpretedTSI
}

//no data storage
function tsiDataAt(byte, position){
    var tsiValueB1 = ["Offline data authentication was performed",
    "Cardholder verification was performed",
    "Card risk management was performed",
    "Issuer authentication was performed",
    "Terminal risk management was performed",
    "Script processing was performed",
    "RFU",
    "RFU"]

    var tsiValueB2 = ["RFU",
    "RFU",
    "RFU",
    "RFU",
    "RFU",
    "RFU",
    "RFU",
    "RFU"]

    if(byte == 1){
        if(position <= tsiValueB1.length){
            return tsiValueB1[position]
        }
    }
    else if(byte == 2){
        if(position <= tsiValueB2.length){
            return tsiValueB2[position]
        }
    }
}