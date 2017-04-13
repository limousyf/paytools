
var utils = require('./utils');

exports.decodeCTQ = function(value){
    //console.log('CTQ: ' + value)
    var interpretedCTQ= {};
    interpretedCTQ.byte1 = []
    interpretedCTQ.byte2 = []

    if(value){
        for(byte=0;byte<2;byte++){

            var startHexPosition = byte*2
            var ctqBinByte = utils.Hex2Bin(value.substr(startHexPosition,2));

            var readableByte = byte + 1;

            //console.log('startHexPos: ' + startHexPosition)
            //console.log("B" + readableByte + ": " + value.substr(startHexPosition,2))
            //console.log("B" + readableByte + " (binary): " + ctqBinByte)             
            for(i=0;i<ctqBinByte.length;i++){

                //console.log('debug  ' + b + " : " + [ctqBinByte[i]])
                var b = 8-i
                //console.log('bit ' + b + " : " + [ctqBinByte[i]])
                if(ctqBinByte[i] == 1){    
                    if(readableByte == 1){
                        interpretedCTQ.byte1.push(utils.createBitValue(b,ctqDataAt(readableByte,i)))
                    }
                    else{
                        interpretedCTQ.byte2.push(utils.createBitValue(b,ctqDataAt(readableByte,i)))
                    }
                    //interpretedCTQ += "Byte " + readableByte + " - bit " 
                    //+ b + " : " + ctqDataAt(readableByte,i)+"\n"
                }
            }
        }
    }
    return interpretedCTQ;
}

function ctqDataAt(byte, position){
    var ctqValueB1 = [
        "Online PIN Required",
        "Signature Required",
        "Go Online if Offline Data Authentication Fails and Reader is online capable.",
        "Switch Interface if Offline Data Authentication fails and Reader supports contact chip",
        "Go Online if Application Expired",
        "Switch Interface for Cash Transactions",
        "Switch Interface for Cashback Transactions",
        "RFU"]

    var ctqValueB2 = [
        "Consumer Device CVM Performed",
        "Card supports Issuer Update Processing at the POS",
        "RFU",
        "RFU",
        "RFU",
        "RFU",
        "RFU",
        "RFU"]

    if(byte == 1){
        if(position <= ctqValueB1.length){
            return ctqValueB1[position]
        }
    }
    else if(byte == 2){
        if(position <= ctqValueB2.length){
            return ctqValueB2[position]
        }
    }
}