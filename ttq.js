
var utils = require('./utils');

exports.decodeTTQ = function(value){
    //console.log('TTQ: ' + value)
    var interpretedTTQ= {};
    interpretedTTQ.byte1 = []
    interpretedTTQ.byte2 = []
    interpretedTTQ.byte3 = []
    interpretedTTQ.byte4 = []

    if(value){

        var nbBytes = 4
        if(value.length == 6){
            nbBytes = 3
        }

        for(byte=0;byte<nbBytes;byte++){

            var startHexPosition = byte*2
            var ttqBinByte = utils.Hex2Bin(value.substr(startHexPosition,2));

            var readableByte = byte + 1;

            //console.log('startHexPos: ' + startHexPosition)
            //console.log("B" + readableByte + ": " + value.substr(startHexPosition,2))
            //console.log("B" + readableByte + " (binary): " + ttqBinByte)             
            for(i=0;i<ttqBinByte.length;i++){

                //console.log('debug  ' + b + " : " + [ttqBinByte[i]])
                var b = 8-i
                //console.log('bit ' + b + " : " + [ttqBinByte[i]])
                if(ttqBinByte[i] == 1){    
                    //interpretedTTQ += "Byte " + readableByte + " - bit " 
                    //+ b + " : " + ttqDataAt(readableByte,i)+"\n"
                    //interpretedTTQ["byte" + readableByte] = ttqDataAt(readableByte,i)
                    interpretedTTQ["byte" + readableByte].push(utils.createBitValue(b,ttqDataAt(readableByte,i)))
                }
            }
        }
    }
    return interpretedTTQ;
}

function ttqDataAt(byte, position){
    var ttqValueB1 = [
        "Mag-stripe mode supported",
        "RFU",
        "EMV mode supported",
        "EMV contact chip supported",
        "Offline-only reader",
        "Online PIN supported",
        "Signature supported",
        "RFU"]

    var ttqValueB2 = [
        "Online cryptogram required",
        "CVM required",
        "(Contact Chip) Offline PIN supported",
        "RFU",
        "RFU",
        "RFU",
        "RFU",
        "RFU"]

    var ttqValueB3 = [
        "Issuer Update Processing supported",
        "Consumer Device CVM supported",
        "RFU",
        "RFU",
        "RFU",
        "RFU",
        "RFU",
        "RFU"]

    var ttqValueB4 = [
        "RFU",
        "RFU",
        "RFU",
        "RFU",
        "RFU",
        "RFU",
        "RFU",
        "RFU"]

    if(byte == 1){
        if(position <= ttqValueB1.length){
            return ttqValueB1[position]
        }
    }
    else if(byte == 2){
        if(position <= ttqValueB2.length){
            return ttqValueB2[position]
        }
    }
    else if(byte == 3){
        if(position <= ttqValueB3.length){
            return ttqValueB3[position]
        }
    }
    else if(byte == 4){
        if(position <= ttqValueB4.length){
            return ttqValueB4[position]
        }
    }
}