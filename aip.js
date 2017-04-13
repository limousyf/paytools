
var utils = require('./utils');

/**
 * Description: Decodes an Application Interchange Profile (AIP - EMV tag 82)
 * Input: 2-bytes parameter representing the AIP value, entered as hexadecimal
 * Output: Decoded value for the 2 bytes of the AIP. The output is represented 
 * as a list of key-pair for each relevant bits (bits set to 1b).
 */
exports.decodeAIP = function(value){
    //loop on 2 bytes
    //console.log('AIP: ' + value)

    var interpretedAIP= {};
    interpretedAIP.byte1 = []
    interpretedAIP.byte2 = []

    var reversedAIP= {};
    reversedAIP.byte1 = []
    reversedAIP.byte2 = []

    for(byte=0;byte<2;byte++){
        
        var startHexPosition = byte*2
        var aipBinByte = utils.Hex2Bin(value.substr(startHexPosition,2));

        var readableByte = byte + 1;

        //console.log('startHexPos: ' + startHexPosition)
        //console.log("B" + readableByte + ": " + value.substr(startHexPosition,2))
        //console.log("B" + readableByte + " (binary): " + aipBinByte)             
        for(i=0;i<aipBinByte.length;i++){
            
            //console.log('debug  ' + b + " : " + [aipBinByte[i]])
            var b = 8-i
            //console.log('bit ' + b + " : " + [aipBinByte[i]])
            if(aipBinByte[i] == 1){    
                //interpretedAIP += "Byte " + readableByte + " - bit " 
                //+ b + " : " + aipDataAt(readableByte,i)+"\n"
                if(readableByte == 1){
                    interpretedAIP.byte1.push(utils.createBitValue(b,aipDataAt(readableByte,i)))
                }
                else{
                    interpretedAIP.byte2.push(utils.createBitValue(b,aipDataAt(readableByte,i)))
                }
            }
            else{
                //reversedAIP += "Byte " + readableByte + " - bit " 
                //+ b + " : " + aipDataAt(readableByte,i)+"\n"
                if(readableByte == 1){
                    reversedAIP.byte1.push(utils.createBitValue(b,aipDataAt(readableByte,i)))
                }
                else{
                    reversedAIP.byte2.push(utils.createBitValue(b,aipDataAt(readableByte,i)))
                }
            }
        }
    }
    return interpretedAIP
}

//no data storage
function aipDataAt(byte, position){
    var aipValueB1 = [
        "RFU",
        "SDA supported",
        "DDA supported",
        "Cardholder verification is supported",
        "Terminal risk management is to be performed",
        "Issuer authentication is supported",
        "RFU",
        "CDA supported"]

    var aipValueB2 = [
        "Reserved for use by the EMV Contactless Specifications",
        "RFU",
        "RFU",
        "RFU",
        "RFU",
        "RFU",
        "RFU",
        "RFU"]

    if(byte == 1){
        if(position <= aipValueB1.length){
            return aipValueB1[position]
        }
    }
    else if(byte == 2){
        if(position <= aipValueB2.length){
            return aipValueB2[position]
        }
    }
}