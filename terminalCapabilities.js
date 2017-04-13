
var utils = require('./utils');

exports.decodeTermCap = function(value){
    //loop on 2 bytes
    //console.log('Terminal Capabilities: ' + value)

    var interpretedTermCap = {}
    interpretedTermCap.byte1 = []
    interpretedTermCap.byte2 = []
    interpretedTermCap.byte3 = []

    for(byte=0;byte<3;byte++){
        
        var startHexPosition = byte*2
        var termCapBinByte = utils.Hex2Bin(value.substr(startHexPosition,2));

        var readableByte = byte + 1;

        //console.log('startHexPos: ' + startHexPosition)
        //console.log("B" + readableByte + ": " + params.substr(startHexPosition,2))
        //console.log("B" + readableByte + " (binary): " + termCapBinByte)             
        for(i=0;i<termCapBinByte.length;i++){
            
            //console.log('debug  ' + b + " : " + [termCapBinByte[i]])
            var b = 8-i
            //console.log('bit ' + b + " : " + [termCapBinByte[i]])
            if(termCapBinByte[i] == 1){    
                //interpretedTermCap += "Byte " + readableByte + " - bit " 
                //+ b + " : " +termCapDataAt(readableByte,i)+"\n"
                //interpretedTermCap["byte" + readableByte] = termCapDataAt(readableByte,i)
                interpretedTermCap["byte" + readableByte].push(utils.createBitValue(b,termCapDataAt(readableByte,i)))
            }
        }
    }
    return interpretedTermCap
}

//no data storage
function termCapDataAt(byte, position){
    var termCapValueB1 = [
        "Manual key entry",
        "Magnetic stripe",
        "IC with contacts",
        "RFU",
        "RFU",
        "RFU",
        "RFU",
        "RFU"]

    var termCapValueB2 = [
        "Plaintext PIN for ICC verification",
        "Enciphered PIN for online verification",
        "Signature (paper)",
        "Enciphered PIN for offline verification",
        "No CVM Required",
        "RFU",
        "RFU",
        "RFU"]

    var termCapValueB3 = [
        "SDA",
        "DDA",
        "Card capture",
        "RFU",
        "CDA",
        "RFU",
        "RFU",
        "RFU"]        

    if(byte == 1){
        if(position <= termCapValueB1.length){
            return termCapValueB1[position]
        }
    }
    else if(byte == 2){
        if(position <= termCapValueB2.length){
            return termCapValueB2[position]
        }
    }
    else if(byte == 3){
        if(position <= termCapValueB3.length){
            return termCapValueB3[position]
        }
    }
}