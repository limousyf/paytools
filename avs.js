
/**
 * Decode an Address verification value
 * input:
 * code: AVS code
 * scheme (optional): payment scheme (values are: Visa, Mastercard, Amex, Discover)
 * output: decoded AVS value for the specified payment scheme, or for all of them if no payment scheme was specified
 */
exports.decodeAVS = function(code,scheme){
        
    var avsVisaCodes = {
        'Y' : "Address & 5-digit or 9-digit ZIP match",
        'A' : "Address matches, ZIP does not",
        'S' : "AVS not supported",
        'R' : "System unavailable, retry",
        'U' : "Information not available",
        'Z' : "Either 5-digit or 9-digit ZIP match, address does not",
        'N' : "Neither ZIP nor address match",
        'W' : "Not applicable",
        'X' : "Not applicable",
        'B' : "Address matches, ZIP not verified",
        'T' : "Not applicable",
        'P' : "ZIP matches, address not verified",
        'C' : "Address and ZIP not verified",
        'D' : "Address & ZIP match (International only)",
        'G' : "Address not verified for International transaction (International only)",
        'I' : "Address not verified (International only)",
        'M' : "Address & ZIP match (International only)",
        'F' : "Address & ZIP match (UK only)"
    }

    var avsMastercardCodes = {
        'Y' : "Address & 5-digit ZIP match",
        'A' : "Address matches, ZIP does not",
        'S' : "AVS not supported",
        'R' : "System unavailable, retry",
        'U' : "Information not available",
        'Z' : "5-digit ZIP matches, address does not",
        'N' : "Neither ZIP nor address match",
        'W' : "For U.S., 9-digit ZIP matches, address does not. For non-U.S., ZIP matches, address does not",
        'X' : "For U.S., all digits match. For non-U.S., ZIP and address match.",
        'B' : "Not applicable",
        'T' : "Not applicable",
        'P' : "Not applicable",
        'C' : "Not applicable",
        'D' : "Not applicable",
        'G' : "Not applicable",
        'I' : "Not applicable",
        'M' : "Not applicable",
        'F' : "Not applicable"
    }

    var avsAmexCodes = {
        'Y' : "Address & ZIP match",
        'A' : "Address only matches",
        'S' : "AVS not supported",
        'R' : "System unavailable, retry",
        'U' : "Information not available",
        'Z' : "ZIP code only matches",
        'N' : "Neither ZIP nor address match",
        'W' : "Not applicable",
        'X' : "Not applicable",
        'B' : "Not applicable",
        'T' : "Not applicable",
        'P' : "Not applicable",
        'C' : "Not applicable",
        'D' : "Not applicable",
        'G' : "Not applicable",
        'I' : "Not applicable",
        'M' : "Not applicable",
        'F' : "Not applicable"
    }

    var avsDiscoverCodes = {
        'Y' : "Address only matches",
        'A' : "Address & 5-digit ZIP match",
        'S' : "AVS not supported",
        'R' : "Not applicable",
        'U' : "System unavailable, retry",
        'Z' : "5-digit ZIP matches, address does not",
        'N' : "Neither ZIP nor address match",
        'W' : "Information not available",
        'X' : "Address & 9-digit ZIP match",
        'B' : "Not applicable",
        'T' : "9-digit ZIP matches, address does not",
        'P' : "Not applicable",
        'C' : "Not applicable",
        'D' : "Not applicable",
        'G' : "Not applicable",
        'I' : "Not applicable",
        'M' : "Not applicable",
        'F' : "Not applicable"
    }

    var interpretedAVS = []
    interpretedAVS[0] = { 'scheme' : 'Unknown',
                 'value' : 'Unknown'}

    if(code){
        if(scheme){
            interpretedAVS[0].scheme = scheme
            if(scheme.toUpperCase() == "VISA"){
                interpretedAVS[0].value = avsVisaCodes[code.toUpperCase()]
            }
            else if (scheme.toUpperCase() == "MASTERCARD"){
                interpretedAVS[0].value = avsMastercardCodes[code.toUpperCase()]
            }
            else if (scheme.toUpperCase() == "AMEX"){
                interpretedAVS[0].value = avsAmexCodes[code.toUpperCase()]
            }
            else if (scheme.toUpperCase() == "DISCOVER"){
                interpretedAVS[0].value = avsDiscoverCodes[code.toUpperCase()]
            }
        }
        else{
            //all schemes
                interpretedAVS[1] = { 'scheme' : 'Unknown',
                 'value' : 'Unknown'}
                interpretedAVS[2] = { 'scheme' : 'Unknown',
                 'value' : 'Unknown'}
                interpretedAVS[3] = { 'scheme' : 'Unknown',
                 'value' : 'Unknown'}
            interpretedAVS[0].scheme = "Visa"
            interpretedAVS[0].value = avsVisaCodes[code.toUpperCase()]
            interpretedAVS[1].scheme = "Mastercard"
            interpretedAVS[1].value = avsMastercardCodes[code.toUpperCase()]
            interpretedAVS[2].scheme = "Amex"
            interpretedAVS[2].value = avsAmexCodes[code.toUpperCase()]
            interpretedAVS[3].scheme = "Discover"
            interpretedAVS[3].value = avsDiscoverCodes[code.toUpperCase()]
        }
    }

    return interpretedAVS
}