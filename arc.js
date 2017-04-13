var utils = require('./utils');

/**
 * Decodes an Authorization Response Code (ARC - EMV tag 8A)
 * Input: 2-characters parameter representing the ARC value
 * Output: Description of the ARC value
 */
exports.decodeARC = function(value){

    //different processing from the other values as not a bit field
    var arcValues = {
        "00" : "Successful approval/completion or that V.I.P. PIN verification is valid",
        "01" : "Refer to card issuer",
        "02" : "Refer to card issuer, special condition",
        "03" : "Invalid merchant or service provider",
        "04" : "Pickup card",
        "05" : "Do not honor",
        "06" : "Error",
        "07" : "Pickup card, special condition (other than lost/stolen card)",
        "10" : "Partial Approval",
        "11" : "V.I.P. approval",
        "12" : "Invalid transaction",
        "13" : "Invalid amount (currency conversion field overflow) or amount exceeds maximum for card program",
        "14" : "Invalid account number (no such number)",
        "15" : "No such issuer",
        "17" : "Customer cancellation",
        "19" : "Re-enter transaction",
        "20" : "Invalid response",
        "21" : "No action taken (unable to back out prior transaction)",
        "22" : "Suspected Malfunction",
        "25" : "Unable to locate record in file, or account number is missing from the inquiry",
        "28" : "File is temporarily unavailable",
        "30" : "Format Error",
        "41" : "Pickup card (lost card)",
        "43" : "Pickup card (stolen card)",
        "51" : "Insufficient funds",
        "52" : "No checking account",
        "53" : "No savings account",
        "54" : "Expired card",
        "55" : "Incorrect PIN",
        "57" : "Transaction not permitted to cardholder",
        "58" : "Transaction not allowed at terminal",
        "59" : "Suspected fraud",
        "61" : "Activity amount limit exceeded",
        "62" : "Restricted card (for example, in Country Exclusion table)",
        "63" : "Security violation",
        "65" : "Activity count limit exceeded",
        "68" : "Response received too late",
        "75" : "Allowable number of PIN-entry tries exceeded",
        "76" : "Unable to locate previous message (no match on Retrieval Reference number)",
        "77" : "Previous message located for a repeat or reversal, but repeat or reversal data are inconsistent with original message",
        "78" : "\’Blocked, first used\’—The transaction is from a new cardholder, and the card has not been properly unblocked.",
        "80" : "Visa transactions: credit issuer unavailable. Private label and check acceptance: Invalid date",
        "81" : "PIN cryptographic error found (error found by VIC security module during PIN decryption)",
        "82" : "Negative CAM, dCVV, iCVV, or CVV results",
        "83" : "Unable to verify PIN",
        "85" : "No reason to decline a request for account number verification, address verification, CVV2 verification, or a credit voucher or merchandise return",
        "91" : "Issuer unavailable or switch inoperative (STIP not applicable or available for this transaction)",
        "92" : "Destination cannot be found for routing",
        "93" : "Transaction cannot be completed, violation of law",
        "94" : "Duplicate Transmission",
        "95" : "Reconcile error",
        "96" : "System malfunction, System malfunction or certain field error conditions",
        "B1" : "Surcharge amount not permitted on Visa cards (U.S. acquirers only)",
        "N0" : "Force STIP",
        "N3" : "Cash service not available",
        "N4" : "Cashback request exceeds issuer limit",
        "N7" : "Decline for CVV2 failure",
        "P2" : "Invalid biller information",
        "P5" : "PIN Change/Unblock request declined",
        "P6" : "Unsafe PIN",
        "Q1" : "Card Authentication failed",
        "R0" : "Stop Payment Order",
        "R1" : "Revocation of Authorization Order",
        "R3" : "Revocation of All Authorizations Order",
        "XA" : "Forward to issuer",
        "XD" : "Forward to issuer",
        "Y1" : "Offline approved",
        "Z1" : "Offline declined",
        "Y3" : "Unable to go online, offline approved",
        "Z3" : "Unable to go online, offline declined"
    }

    var interpretedARC = "Not found"

    if(arcValues[value]){
        interpretedARC = arcValues[value]
    }

    return {
        "value" : interpretedARC
    }

}