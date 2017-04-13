
var utils = require('./utils');

exports.decodeTVR = function(value){
            
    var interpretedTVR = {}
    interpretedTVR.byte1 = []
    interpretedTVR.byte2 = []
    interpretedTVR.byte3 = []
    interpretedTVR.byte4 = []
    interpretedTVR.byte5 = []
    
    if(value){
        //loop on 5 bytes
        //console.log('TVR: ' + params)

        for(byte=0;byte<5;byte++){
            var startHexPosition = byte*2
            var tvrBinByte = utils.Hex2Bin(value.substr(startHexPosition,2));

            var readableByte = byte + 1;

            //console.log('startHexPos: ' + startHexPosition)
            //console.log("B" + readableByte + ": " + params.substr(startHexPosition,2))
            //console.log("B" + readableByte + " (binary): " + tvrBinByte)             
            for(i=0;i<tvrBinByte.length;i++){

                //console.log('debug  ' + b + " : " + [tvrBinByte[i]])
                var b = 8-i
                //console.log('bit ' + b + " : " + [tvrBinByte[i]])
                if(tvrBinByte[i] == 1){    
                    //interpretedTVR += "Byte " + readableByte + " - bit " 
                    //+ b + " : " + tvrDataAt(readableByte,i)+"\n"
                    interpretedTVR["byte" + readableByte].push(utils.createBitValue(b,tvrDataAt(readableByte,i)))
                }
            }
        }    
    }
    return interpretedTVR
}

//no data storage
function tvrDataAt(byte, position){
    var tvrValueB1 = [
        "Offline data authentication was not performed",
        "SDA failed",
        "ICC data missing",
        "Card appears on terminal exception file",
        "DDA failed",
        "CDA failed",
        "RFU",
        "RFU"]

    var tvrValueB2 = [
        "ICC and terminal have different application versions",
        "Expired application",
        "Application not yet effective",
        "Requested service not allowed for card product",
        "New card",
        "RFU",
        "RFU",
        "RFU"]

        var tvrValueB3 = [
            "Cardholder verification was not successful",
            "Unrecognised CVM",
            "PIN Try Limit exceeded",
            "PIN entry required and PIN pad not present or not working",
            "PIN entry required, PIN pad present, but PIN was not entered",
            "Online PIN entered",
            "RFU",
            "RFU"]

        var tvrValueB4 = [
            "Transaction exceeds floor limit",
            "Lower consecutive offline limit exceeded",
            "Upper consecutive offline limit exceeded",
            "Transaction selected randomly for online processing",
            "Merchant forced transaction online",
            "RFU",
            "RFU",
            "RFU"]

        var tvrValueB5 = [
            "Default TDOL used",
            "Issuer authentication failed",
            "Script processing failed before final GENERATE AC",
            "Script processing failed after final GENERATE AC",
            "RFU",
            "RFU",
            "RFU",
            "RFU"]

    if(byte == 1){
        if(position <= tvrValueB1.length){
            return tvrValueB1[position]
        }
    }
    else if(byte == 2){
        if(position <= tvrValueB2.length){
            return tvrValueB2[position]
        }
    }
        else if(byte == 3){
        if(position <= tvrValueB3.length){
            return tvrValueB3[position]
        }
    }
        else if(byte == 4){
        if(position <= tvrValueB4.length){
            return tvrValueB4[position]
        }
    }
        else if(byte == 5){
        if(position <= tvrValueB5.length){
            return tvrValueB5[position]
        }
    }
}
