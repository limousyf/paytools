
//Takes an currency code value in parameter
//Returns a match in the ISO-4217 currency code list in a JSON structure
/**
 * Identify a currency code passed in parameter. 
 * This function can perform only an exact match
 * Input: 
 * currencyCode: currency code value, entered as decimal
 * Output: Currency code details matching the pattern passed in parameter
 */
exports.currencyCodeValues = function(currencyCode){

    //console.log('Getting value: ' + aid)

    var regex = new RegExp("^"+currencyCode+"$","i");
    
    let m;

    var test = [
        {"code" : "AED", "num" : "784", "exponent": 2, "currency" : "United Arab Emirates dirham", "countries" : ["United Arab Emirates"]  }
    ]

    //new method using the table
    var results = {}

    for (var i = 0; i < test.length; i++)
    {
        var toTest = test[i].num
        //console.log('Testing: ' + toTest);
        if(toTest.match(regex)){
            results.code = test[i].code
            results.num = test[i].num
            results.exponent = test[i].exponent
            results.currency = test[i].currency
            results.countries = test[i].countries
            return results
        }
    }

    return false

}