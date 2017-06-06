
//Takes an country code value in parameter
//Returns a match in the ISO-3166-1 country code list in a JSON structure
/**
 * Identify a country code passed in parameter. 
 * This function can perform only an exact match
 * Input: 
 * countryCode: country code value, entered as decimal
 * Output: Country code details matching the pattern passed in parameter
 */
exports.countryCodeValues = function(countryCode){

    //console.log('Getting value: ' + aid)

    var regex = new RegExp("^"+countryCode+"$","i");
    
    let m;

    var test = [
        {"shortName" : "France", "alpha2" : "FR", "alpha3": "FRA", "numeric" : 250, "independent" : "yes"  }
    ]

    //new method using the table
    var results = {}

    for (var i = 0; i < test.length; i++)
    {
        var toTest = test[i].numeric
        //console.log('Testing: ' + toTest);
        if(toTest.match(regex)){
            results.shortName = test[i].shortName
            results.alpha2 = test[i].alpha2
            results.alpha3 = test[i].alpha3
            results.numeric = test[i].numeric
            results.independent = test[i].independent
            return results
        }
    }

    return false

}