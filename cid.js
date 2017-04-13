
var utils = require('./utils');

exports.decodeCID = function(value){
    
    var interpretedCID= {};
    
    if((value) && (value.length == 2)){
        
        var binValue = utils.Hex2Bin(value)
        
        //process b8b7
        var b8b7 = binValue.substr(0,2)
        //toReturn += "Type: "
        //toReturn += cidValuesAt(8,b8b7) + "\n"
        interpretedCID.type = cidValuesAt(8,b8b7)

        //process b6b5
        var b6b5 = binValue.substr(2,2)
        //toReturn += "Payment specific: "
        //toReturn += cidValuesAt(6,b6b5) + "\n"
        interpretedCID.paymentSpecific = cidValuesAt(6,b6b5)

        //process b4
        var b4 = binValue.substr(4,1)
        //toReturn += "Advice: "
        //toReturn += cidValuesAt(4,b4) + "\n"
        interpretedCID.advice = cidValuesAt(4,b4)

        //process b3b2b1
        var b3b2b1 = binValue.substr(5,3)
        //toReturn += "Reason: "
        //toReturn += cidValuesAt(3,b3b2b1) + "\n"
        interpretedCID.reason = cidValuesAt(3,b3b2b1)
    }

    return interpretedCID
}

function cidValuesAt(position, value){
    
    var cidB8B7 = {
        '00' : 'AAC',
        '01' : 'TC',
        '10' : 'ARQC',
        '11' : 'RFU'
    }

    var cidB6B5 = 'Payment system specific cryptogram'

    var cidB4 = {
        '0' : 'No advice required',
        '1' : 'Advice required'
    }
    
    var cidB3B2B1 = {
        '000' : 'No information given',
        '001' : 'Service not allowed',
        '010' : 'PIN try limit exceeded',
        '011' : 'Issuer authentication failed',
        '100' : 'RFU',
        '101' : 'RFU',
        '110' : 'RFU',
        '111' : 'RFU'
    }    

    if((value) && (position)){
        if((position == 8) || (position ==7)){
            return cidB8B7[value]
        }
        else if ((position == 6) || (position == 5)){
            return cidB6B5
        }
        else if (position == 4){
            return cidB4[value]
        }
        else if (position <= 3){
            return cidB3B2B1[value]
        }
    }
}
