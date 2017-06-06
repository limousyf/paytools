
var utils = require('./utils');

/**
 * Description: Computes the Luhn check digit (or mod10 digit) for a given value
 * Input: numeric value for which the Luhn digit must be computed
 * Output: Check digit
 */
exports.computeLuhnDigit = function(value){
    var nCheck = computeLuhnCheckDigit(value);
    return nCheck;
}

/**
 * Description: Verifies a Luhn (mod10) digit value for a given numeric value
 * Input: numeric value and Luhn (mod10) digit
 * Output: True if the Luhn digit is correct, false otherwise
 */
exports.checkLuhnDigit = function(value, luhnDigit){
    var nCheck = computeLuhnCheckDigit(value);
    if(nCheck == luhnDigit){
        return true
    }
    else{
        return false
    }
}

function computeLuhnCheckDigit(value){

  // accept only digits, dashes or spaces
	if (/[^0-9-\s]+/.test(value)) return false;

	// The Luhn Algorithm. It's so pretty.
	var nCheck = 0, nDigit = 0, bEven = false;
	value = value.replace(/\D/g, "");

    for (var n = value.length - 1; n >= 0; n--) {
		var cDigit = value.charAt(n),
			  nDigit = parseInt(cDigit, 10);
		if (bEven) {
			if ((nDigit *= 2) > 9) nDigit -= 9;
		}

		nCheck += nDigit;
		bEven = !bEven;
	}

	return nCheck % 10;
}