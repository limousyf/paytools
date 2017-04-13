
var utils = require('./utils');

exports.decodeCVMResults = function(value){
    //loop on 3 bytes
    //console.log('CVM Results: ' + value)

    var interpretedCVMResults = {}

    for(byte=0;byte<3;byte++){      
        var startHexPosition = byte*2
        var cvmResultsBinByte = value.substr(startHexPosition,2);

        var readableByte = byte + 1;

        //console.log('startHexPos: ' + startHexPosition)
        //console.log("B" + readableByte + ": " + params.substr(startHexPosition,2))           

        interpretedCVMResults["byte" + readableByte] = cvmResultsAt(readableByte,cvmResultsBinByte)
        //interpretedCVMResults += "Byte " + readableByte + 
        //" : " + cvmResultsAt(readableByte,cvmResultsBinByte)+"\n"
    }
    return interpretedCVMResults
}

function cvmResultsAt(byte, value){
    //console.log('Getting value: ' + value + " in byte " + byte)

    //different processing from the other values as not a bit field
    var cvmResultsB1 = {
        '00' : "Failed CVM Processing",
        '40' : "Failed CVM Processing - Apply succeding CVM rule",
        '01' : "Plaintext PIN verification performed by ICC",
        '41' : "Plaintext PIN verification performed by ICC - Apply succeding CVM rule",
        '02' : "Enciphered PIN verified online",
        '42' : "Enciphered PIN verified online - Apply succeding CVM rule",
        '03' : "Plaintext PIN verification performed by ICC and signature (paper)",
        '43' : "Plaintext PIN verification performed by ICC and signature (paper) - Apply succeding CVM rule",
        '04' : "Enciphered PIN verification performed by ICC",
        '44' : "Enciphered PIN verification performed by ICC",
        '05' : "Enciphered PIN verification performed by ICC and signature (paper) -Apply succeding CVM rule",
        '45' : "Enciphered PIN verification performed by ICC and signature (paper) -Apply succeding CVM rule"
    }

    var cvmResultsB2 = {
        '00' : "Always",
        '01' : "If unattended cash",
        '02' : "If not unattended cash and not manual cash and not purchase with cashback",
        '03' : "If terminal supports the CVM",
        '04' : "If manual cash",
        '05' : "If purchase with cashback",
        '06' : "If transaction is in the application currency and is under X value",
        '07' : "If transaction is in the application currency and is over X value",
        '08' : "If transaction is in the application currency and is under Y value",
        '09' : "If transaction is in the application currency and is over Y value",
        //0A - 7F" : "RFU",
        '0A' : "RFU",
        //80 - FF" : "Reserved for use by individual payment systems"    
        '80' : "Reserved for use by individual payment systems"    
    }

    var cvmResultsB3 = {
        '00' : "Unknown (checked online)",
        '01' : "Failed (e.g: verified offline)",
        '02' : "Successful (e.g: verified offline)"
    }

    if(byte == 1){
        //return cvmResultsB1.value
        return cvmResultsB1[value]
    }
    else if (byte == 2){
        //add processing for values 0A < value < 7F
        //and > 80
        var decValue = utils.Hex2Dec(value)
        
        //console.log('Decimal value: ' + decValue)
        
        if((decValue >= 10) && (decValue <128)){
           return cvmResultsB2['0A']
        }
        else if (decValue >= 128){
           return cvmResultsB2['80']
        }
        else{
            return cvmResultsB2[value]
        }
    }    
    else if (byte == 3){
        return cvmResultsB3[value]
    }

}