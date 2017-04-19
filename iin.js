var utils = require('./utils');

//Takes a BIN/IIN value in parameter
//Returns a list of matches (partial and exact) in a JSON structure
/**
 * Identify an BIN (Bank Identification Number) or IIN (Issuer Identification Number) passed in parameter. 
 * This function can perform an exact match a return a list of partial matches
 * Input: 
 * Aid: BIN value, entered as decimal
 * Exact (optional): will return only an exact match if set to true
 * Output: List of Financial Institutions matching the pattern passed in parameter
 */
exports.iinValues = function(iin, exact){

    //console.log('Getting value: ' + aid)

    var regex = new RegExp(iin,"gi");
    
    if(exact){
        regex = new RegExp("^"+iin+"$","i");
    }
    
    let m;

    var test = [
        {"iinStart" : "342562","iinEnd" : "","scheme" : "AMEX","brand" : "American Express","type" : "", "country" : "", "issuerName" : ""},
        {"iinStart" : "","iinEnd" : "","scheme" : "","brand" : "","type" : "", "country" : "", "issuerName" : ""},
        {"iinStart" : "","iinEnd" : "","scheme" : "","brand" : "","type" : "", "country" : "", "issuerName" : ""},
        {"iinStart" : "","iinEnd" : "","scheme" : "","brand" : "","type" : "", "country" : "", "issuerName" : ""},
        {"iinStart" : "","iinEnd" : "","scheme" : "","brand" : "","type" : "", "country" : "", "issuerName" : ""}
    ]
    
    //new method using the table
    var results = []
    var resultIndex = 0

    for (var i = 0; i < test.length; i++)
    {
        var iinStart = test[i].iinStart
        var iinEnd = test[i].iinEnd
        //console.log('Testing: ' + iinStart);
        //console.log('Testing: ' + iinEnd);
        if(iinEnd){
            //range processing
            if((iin >= iinStart) && (iin <= iinEnd)){
                //match found
                results[resultIndex] = {}
                results[resultIndex].scheme = test[i].scheme
                results[resultIndex].brand = test[i].brand 
                results[resultIndex].country = test[i].country 
                results[resultIndex].type = test[i].type 
                results[resultIndex].issuerName = test[i].issuerName 
                resultIndex++
            }
        }
        else{
            if(iinStart.match(regex)){
                //match found
                //console.log('adding to result list: ' + test[i].description);
                results[resultIndex] = {}
                results[resultIndex].scheme = test[i].scheme
                results[resultIndex].brand = test[i].brand 
                results[resultIndex].country = test[i].country 
                results[resultIndex].type = test[i].type 
                results[resultIndex].issuerName = test[i].issuerName 
                resultIndex++
            }
        }
    }

    return results

}
