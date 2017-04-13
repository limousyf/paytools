var utils = require('./utils');

exports.decodeCVR = function(value){
    //console.log('CVR value: ' + value)
    
    var format = 0

    if(value.length == 8){
    //4 bytes, format 0/1/3

    }
    else if(value.length == 10){
        //5 bytes, format 2
        format = 2
    }
    
    var interpretedCVR = {}
    interpretedCVR.byte1 = {}
    interpretedCVR.byte2 = {}
    interpretedCVR.byte4 = {}

    //B1 processing
    if(format == 2){
        var cvrB1 = value.substr(0,2);
        interpretedCVR.byte1.type = "Other"
        if(cvrB1 != 00){
            interpretedCVR.byte1.value = "Byte 1: RFU"                      
        }
    }
    else{
        //length
        interpretedCVR.byte1.type = "Length"
        interpretedCVR.byte1.value = value.substr(0,2);
    }

    //B2 processing
    //Left nibble
    var cvrB2LeftNibble = value.substr(2,1);
    //console.log('B2L: ' + cvrB2LeftNibble)
    var interpretedCVRB2LeftNibble = cvrResultsAt(2,8,cvrB2LeftNibble)
    //console.log('Interpreted B2L: ' + interpretedCVRB2LeftNibble)
    /*if(interpretedCVRB2LeftNibble){
        interpretedCVR += interpretedCVRB2LeftNibble + "\n"
    }*/
    interpretedCVR.byte2.leftNibble = interpretedCVRB2LeftNibble

    //Right nibble
    //bit field
    var cvrB2RightNibble = value.substr(3,1);
    /*console.log('B2R: ' + cvrB2RightNibble)
    var interpretedCVRB2RightNibble = cvrUtils.cvrResultsAt(2,4,cvrB2RightNibble)
    console.log('Interpreted B2R: ' + interpretedCVRB2RightNibble)
    if(interpretedCVRB2RightNibble){
        interpretedCVR += interpretedCVRB2RightNibble + "\n"
    }*/
    
    var cvrBinByte2R = utils.Hex2Bin(cvrB2RightNibble);

    //console.log('B2Rb ' + cvrBinByte2R)
    interpretedCVR.byte2.rightNibble = []

        for(i=0;i<cvrBinByte2R.length;i++){                        
            
            var b = 4-i
            if(cvrBinByte2R[i] == 1){    
                //interpretedCVR += "Byte 2 - bit " 
                //+ b + " : " + cvrResultsAt(2,i)+"\n"
                interpretedCVR.byte2.rightNibble.push(utils.createBitValue(b,cvrResultsAt(2,i)))
            }
        }

    //B3 processing
    //bit field
    var cvrBinByte3 = utils.Hex2Bin(value.substr(4,2));
    interpretedCVR.byte3 = []
    //console.log('B3b ' + cvrBinByte3)
    
        for(i=0;i<cvrBinByte3.length;i++){                        
            
            var b = 8-i
            if(cvrBinByte3[i] == 1){    
                //interpretedCVR += "Byte 3 - bit " 
                //+ b + " : " + cvrResultsAt(3,i)+"\n"
                interpretedCVR.byte3.push(utils.createBitValue(b,cvrResultsAt(3,i)))
            }
        }

    //B4 processing
    //Left nibble
    var cvrB4LeftNibble = value.substr(6,1);
    //if(cvrB4LeftNibble != 0){
        //Nb of issuer scripts
        //interpretedCVR += "Nb of issuer scripts " + utils.Hex2Dec(cvrB4LeftNibble)
        //interpretedCVR += cvrResultsAt(4,8,cvrB4LeftNibble)
        interpretedCVR.byte4.nbOfIssuerScripts = cvrResultsAt(4,8,cvrB4LeftNibble)
    //}

    //Right nibble
    var cvrB4RightNibbleBin = utils.Hex2Bin(value.substr(7,1));
    interpretedCVR.byte4.rightNibble = []
    //console.log('B4Rb ' + cvrB4RightNibbleBin)
    
    for(i=0;i<cvrB4RightNibbleBin.length;i++){
            
            //start at position 4
            var b = 4-i
            if(cvrB4RightNibbleBin[i] == 1){    
                //interpretedCVR += "Byte 4 - bit " 
                //+ b + " : " + cvrResultsAt(4,4,i)+"\n"
                interpretedCVR.byte4.rightNibble.push(utils.createBitValue(b,cvrResultsAt(4,4,i)))
            }
    }

    //B5 bitfield
    var cvrBinByte5 = utils.Hex2Bin(value.substr(8,2));
    interpretedCVR.byte5 = []
        for(i=0;i<cvrBinByte5.length;i++){
            
            var b = 8-i
            if(cvrBinByte5[i] == 1){    
                //interpretedCVR += "Byte 5 - bit " 
                //+ b + " : " + cvrResultsAt(5,i)+"\n"
                interpretedCVR.byte5.push(utils.createBitValue(b,cvrResultsAt(5,i)))
            }
        }

    return interpretedCVR
}

function cvrResultsAt(byte, position, value, format2){

    //different processing from the other values as not a bit field
    //if format 0/1/3 => Length
    //if format 2 => RFU
    var cvrResultsB1 = [
        "RFU",
        "RFU",
        "RFU",
        "RFU",
        "RFU",
        "RFU",
        "RFU",
        "RFU"
    ]

    var cvrResultsB2LeftNibble = {
        '0' : "AAC returned in second GENERATE AC\nAAC returned in first GENERATE AC",
        '1' : "AAC returned in second GENERATE AC\nTC returned in second GENERATE AC",
        '2' : "AAC returned in second GENERATE AC\nARQC returned in second GENERATE AC",
        '3' : "AAC returned in second GENERATE AC\nRFU",
        '4' : "TC returned in second GENERATE AC\nAAC returned in second GENERATE AC",
        '5' : "TC returned in second GENERATE AC\nTC returned in second GENERATE AC",
        '6' : "TC returned in second GENERATE AC\nARQC returned in second GENERATE AC",
        '7' : "TC returned in second GENERATE AC\nRFU",
        'C' : "Second GENERATE AC not requested\nAAC returned in second GENERATE AC",
        'D' : "Second GENERATE AC not requested\nTC returned in second GENERATE AC",
        'E' : "Second GENERATE AC not requested\nARQC returned in second GENERATE AC",
        'F' : "Second GENERATE AC not requested\nRFU",
    }

    //different processing from the other values as not a bit field
    /*var cvrResultsB2b8b7 = {
        '00' : "AAC returned in second GENERATE AC",
        '01' : "TC returned in second GENERATE AC",
        '11' : "Second GENERATE AC not requested"   
    }

    var cvrResultsB2b6b5 = {
        '00' : "AAC returned in first GENERATE AC",
        '01' : "TC returned in second GENERATE AC",
        '10' : "ARQC returned in second GENERATE AC",   
        '11' : "RFU"
    }*/

    //Bitfield
    var cvrResultsB2RightNibble = [
        "Issuer Authentication performed and failed",
        "Offline PIN verification performed",
        "Offline PIN verification failed",
        "Unable to go online"
    ]

    var cvrResultsB3 = [
        "Last online transaction not completed",
        "PIN Try Limit exceeded",
        "Exceeded velocity checking counters",
        "New card",
        "Issuer Authentication failure on last online transaction",
        "Issuer Authentication not performed after online authorization",
        "Application blocked by card because PIN Try Limit exceeded",
        "Offline static data authentication failed on last transaction and transaction declined offline"
    ]

    //B4 left nibble => nb of issuer scripts
    //B4 right nibble => bitfield
    var cvrResultsB4RightNibble = [
        "Issuer Script processing failed",
        "Offline dynamic data authentication failed on last transaction and transaction declined offline",
        "Offline dynamic data authentication performed",
        "RFU (0b)"
    ]

    //Only for Format 2
    var cvrResultsB5 = [
        "RFU",
        "RFU",
        "RFU",
        "RFU",
        "RFU",
        "RFU",
        "CDCVM Successfully Performed",
        "Secure Messaging uses EMV Session keybased derivation"
    ]

    if(byte == 1){
        if(format2){
            return cvrResultsB1[position]
        }
        else{
            return "CVR length: " + value
        }
    }
    else if (byte == 2){
        //console.log("Byte 2 - position " + position)
        //console.log("Value " + value)
        if((position <= 8) && (position >=5)){
            return cvrResultsB2LeftNibble[value]
        }
        else{
            //bit field
            return cvrResultsB2RightNibble[position]
        }
    }    
    else if (byte == 3){
        return cvrResultsB3[position]
    }
    else if (byte == 4){
        if((position <= 8) && (position >=5)){
            return "Nb of issuer scripts: " + utils.Hex2Dec(value) + "\n"
        }
        else {
            return cvrResultsB4RightNibble[value]
        }
    }
    else if (byte == 5){
        return cvrResultsB5[position]
    }

}
