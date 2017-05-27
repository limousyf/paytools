
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

exports.formatChecker = function(value, isHex, minSize, maxSize, genericMessage){
    var format = true
	var message
	
	if(value){
        if(isHex){
            //testing for hex format
            if(!module.exports.isHex(value)){
                message = "It doesn't look to be in hex format";
				format = false
            }
        }
        
        //testing for size
        if(minSize && maxSize && format){
            if(!module.exports.checkBytesNumber(value,minSize,maxSize)){
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