
var utils = require('./utils');

exports.decodeAUC = function(value){

    //console.log('AUC: ' + value)
    var interpretedAUC= {};
    interpretedAUC.byte1 = []
    interpretedAUC.byte2 = []

    if(value){
        for(byte=0;byte<2;byte++){

            var startHexPosition = byte*2
            var aucBinByte = utils.Hex2Bin(value.substr(startHexPosition,2));

            var readableByte = byte + 1;

            //console.log('startHexPos: ' + startHexPosition)
            //console.log("B" + readableByte + ": " + value.substr(startHexPosition,2))
            //console.log("B" + readableByte + " (binary): " + aucBinByte)             
            for(i=0;i<aucBinByte.length;i++){

                //console.log('debug  ' + b + " : " + [aucBinByte[i]])
                var b = 8-i
                //console.log('bit ' + b + " : " + [aucBinByte[i]])
                if(aucBinByte[i] == 1){    
                    //interpretedAUC += "Byte " + readableByte + " - bit " 
                    //+ b + " : " + aucDataAt(readableByte,i)+"\n"
                    if(readableByte == 1){
                        interpretedAUC.byte1.push(utils.createBitValue(b,aucDataAt(readableByte,i)))
                    }
                    else{
                        interpretedAUC.byte2.push(utils.createBitValue(b,aucDataAt(readableByte,i)))
                    }
                }
            }
        }
    }
    return interpretedAUC;
}

//no data storage
function aucDataAt(byte, position){
    var aucValueB1 = [
        "Valid for domestic cash transactions",
        "Valid for international cash transactions",
        "Valid for domestic goods",
        "Valid for international goods",
        "Valid for domestic services",
        "Valid for international services",
        "Valid at ATMs",
        "Valid at terminals other than ATMs"]

    var aucValueB2 = [
        "Domestic cashback allowed",
        "International cashback allowed",
        "RFU",
        "RFU",
        "RFU",
        "RFU",
        "RFU",
        "RFU"]

    if(byte == 1){
        if(position <= aucValueB1.length){
            return aucValueB1[position]
        }
    }
    else if(byte == 2){
        if(position <= aucValueB2.length){
            return aucValueB2[position]
        }
    }
}
