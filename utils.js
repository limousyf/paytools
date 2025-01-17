
//utilities

//transfer a 2-byte value to binary and returns it in a string
exports.Hex2Bin = function(n){
    var hexValue =  parseInt(n,16).toString(2)
    if(n.length == 1){
        //1 nibble
        hexValue="0000".substr(hexValue.length)+hexValue;
    }
    else if (n.length == 2){
        //1 byte
        hexValue="00000000".substr(hexValue.length)+hexValue;
    }
    return hexValue
}

//check that the data is in hexadecimal format
exports.isHex = function(data){

    //console.log('Testing hex format: ', data)

    var re = /^[0-9a-fA-F]+$/

    if(re.test(data)) {
        return true
    } else {
        return false
    }

    re.lastIndex = 0
}

//check that the data is in decimal format
exports.isDec = function(data){

    //console.log('Testing dec format: ', data)

    var re = /^[0-9]+$/

    if(re.test(data)) {
        return true
    } else {
        return false
    }

    re.lastIndex = 0
}

//checks that the number of bytes is between min and max 
//for instance 2 bytes will contain 4 hex characters
exports.checkBytesNumber = function(data,min,max){
    if(data){
        if(min && max){
            if(max != 0){
                if((data.length >= (min*2)) && (data.length <=(max*2))){
                    return true
                }
                else{
                    return false
                }
            }
            else{
                //no check on max
                if(data.length >= (min*2)){
                    return true
                }
                else{
                    return false
                }
            }
        }
        else{
            return false
        }
    }
    else{
        return false
    }
}

exports.Hex2Dec = function(n){
    //if(!checkHex(n))
       // return 0;
    return parseInt(n,16).toString(10)
}

exports.splitBytes = function(value){
    var result = [];
    if(value){
        result = splitChars(value,2)
    }
    return result
}

exports.splitText = function(value, size){
    var result = [];
    if(value){
        result = splitChars(value,size)
    }
    return result
}

function splitChars(value, num) {
  var result = [];
  for (var i = 0; i < value.length; i += num) {
    result.push(value.substr(i, num));
  }
  return result;
}

exports.decimalFormatChecker = function(value, minSize, maxSize, genericMessage){
    var format = true
	var message
	
	if(value){
        //testing for decimal format
        if(!module.exports.isDec(value)){
            message = "It doesn't look to be in decimal format";
            format = false
        }
        
        //testing for size
        if(format){
            if(!module.exports.checkGenericSize(value,minSize,maxSize)){
                message = "Not really the correct size ... Enter " + genericMessage
				format = false
            }
        }
    }
    else{
		message = "No parameter entered ... Enter " + genericMessage
		format = false
    }
	
	return{
		formatOk : format,
		errorMessage : message
	}
}

exports.checkGenericSize = function(value,minSize,maxSize){
    minCheck = false;
    maxCheck = false;
    if(value){
        if(minSize){
            //just check for minimal size
            if(value.length >= minSize){
                minCheck = true
            }
        }
        else{
            minCheck = true
        }
        if(maxSize){
            //just check for minimal size
            if(value.length <= maxSize){
                maxCheck = true
            }
        }
        else{
            maxCheck = true
        }
    }
   return minCheck & maxCheck
}

exports.formatChecker = function(value, isHex, minSize, maxSize, genericMessage){
    var format = true
	var message
	
	var valueProcessed = value
	
	if(valueProcessed){
        if(isHex){
            //testing for hex format
            if(!module.exports.isHex(valueProcessed)){
                message = "It doesn't look to be in hex format";
				format = false
            }
        }
        
        //testing for size
        if(minSize && maxSize && format){
            if(!module.exports.checkBytesNumber(valueProcessed,minSize,maxSize)){
                message = "Not really the correct size ... Enter " + genericMessage
				format = false
            }
        }
    }
    else{
		message = "No parameter entered ... Enter " + genericMessage
		format = false
    }
	
	return{
		formatOk : format,
		errorMessage : message
	}
}

exports.createBitValue = function(bit,value){
    var bit = {
        "bit" : bit,
        "value" : value
    }
    return bit
}

 exports.formatError = function(errorMessage,originalInput){
    //return errorMessage
    
    var errorObj = {
        "errorMessage" : errorMessage,
        "requestInput" : originalInput 
    }
    return errorObj;
}

exports.removeSpaces = function(input){
  if(input){
    return input.replace(/\s+/g, '');
  }
  else{
      return input
  } 
}
 
//Binary Operations
function Bin2Dec(n){if(!checkBin(n))return 0;return parseInt(n,2).toString(10)}
//function Bin2Hex(n){if(!checkBin(n))return 0;return parseInt(n,2).toString(16)}
//Decimal operations
function Dec2Bin(n){if(!checkDec(n)||n<0)return 0;return n.toString(2)}
//function Dec2Hex(n){if(!checkDec(n)||n<0)return 0;return n.toString(16)}

//Useful Functions
function checkBin(n){return/^[01]{1,64}$/.test(n)}
function checkDec(n){return/^[0-9]{1,64}$/.test(n)}
function checkHex(n){return/^[0-9A-Fa-f]{1,64}$/.test(n)}
function pad(s,z){s=""+s;return s.length<z?pad("0"+s,z):s}
function unpad(s){s=""+s;return s.replace(/^0+/,'')}
