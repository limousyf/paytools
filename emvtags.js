
//Takes an aid value in parameter
//Returns a list of matches (partial and exact) in a JSON structure
exports.tagValues = function(tag, exact){

    //console.log('Getting value: ' + tag)

    var regex = new RegExp(tag,"gi");
    if(exact){
        regex = new RegExp("^"+tag+"$","i");
    }
    let m;

    var test = [
{"tag" : "5F57","name" : "Account Type","description" : "Indicates the type of account selected on the terminal, coded as specified in Annex G","source" : "Terminal","format" : "n2","template" : "—","length" : "1"},
{"tag" : "9F01","name" : "Acquirer Identifier","description" : "Uniquely identifies the acquirer within each payment system","source" : "Terminal","format" : "n 6-11","template" : "—","length" : "6"},
{"tag" : "9F40","name" : "Additional Terminal Capabilities","description" : "Indicates the data input and output capabilities of the terminal","source" : "Terminal","format" : "b","template" : "—","length" : "5"},
{"tag" : "81","name" : "Amount, Authorised (Binary)","description" : "Authorised amount of the transaction (excluding adjustments)","source" : "Terminal","format" : "b","template" : "—","length" : "4"},
{"tag" : "9F02","name" : "Amount, Authorised (Numeric)","description" : "Authorised amount of the transaction (excluding adjustments)","source" : "Terminal","format" : "n 12","template" : "—","length" : "6"},
{"tag" : "9F04","name" : "Amount, Other (Binary)","description" : "Secondary amount associated with the transaction representing a cashback amount","source" : "Terminal","format" : "b","template" : "—","length" : "4"},
{"tag" : "9F03","name" : "Amount, Other (Numeric)","description" : "Secondary amount associated with the transaction representing a cashback amount","source" : "Terminal","format" : "n 12","template" : "—","length" : "6"},
{"tag" : "9F3A","name" : "Amount, Reference Currency","description" : "Authorised amount expressed in the reference currency","source" : "Terminal","format" : "b","template" : "—","length" : "4"},
{"tag" : "9F26","name" : "Application Cryptogram","description" : "Cryptogram returned by the ICC in response of the GENERATE AC command","source" : "ICC","format" : "b","template" : "77' or '80","length" : "8"},
{"tag" : "9F42","name" : "Application Currency Code","description" : "Indicates the currency in which the account is managed according to ISO 4217","source" : "ICC","format" : "n3","template" : "70' or '77","length" : "2"},
{"tag" : "9F44","name" : "Application Currency Exponent","description" : "Indicates the implied position of the decimal point from the right of the amount represented according to ISO 4217","source" : "ICC","format" : "n1","template" : "70' or '77","length" : "1"},
{"tag" : "9F05","name" : "Application Discretionary Data","description" : "Issuer or payment system specified data relating to the application","source" : "ICC","format" : "b","template" : "70' or '77","length" : "Jan-32"},
{"tag" : "5F25","name" : "Application Effective Date","description" : "Date from which the application may be used","source" : "ICC","format" : "n6 YYMMDD","template" : "70' or '77","length" : "3"},
{"tag" : "5F24","name" : "Application Expiration Date","description" : "Date after which application expires","source" : "ICC","format" : "n6 YYMMDD","template" : "70' or '77","length" : "3"},
{"tag" : "94","name" : "Application File Locator (AFL)","description" : "Indicates the location (SFI, range of records) of the AEFs related to a given application","source" : "ICC","format" : "var.","template" : "77' or '80","length" : "var. up to 252"},
{"tag" : "4F","name" : "Application Dedicated File (ADF) Name","description" : "Identifies the application as described in ISO/IEC 7816-5","source" : "ICC","format" : "b","template" : "61","length" : "16-May"},
{"tag" : "9F06","name" : "Application Identifier (AID) – terminal","description" : "Identifies the application as described in ISO/IEC 7816-5","source" : "Terminal","format" : "b","template" : "—","length" : "16-May"},
{"tag" : "82","name" : "Application Interchange Profile","description" : "Indicates the capabilities of the card to support specific functions in the application","source" : "ICC","format" : "b","template" : "77' or '80","length" : "2"},
{"tag" : "50","name" : "Application Label","description" : "Mnemonic associated with the AID according to ISO/IEC 7816-5","source" : "ICC","format" : "ans with the special character limited to space","template" : "61' or 'A5","length" : "16-Jan"},
{"tag" : "9F12","name" : "Application Preferred Name","description" : "Preferred mnemonic associated with the AID","source" : "ICC","format" : "ans (see section 4.3)","template" : "61' or 'A5","length" : "16-Jan"},
{"tag" : "5A","name" : "Application Primary Account Number (PAN)","description" : "Valid cardholder account number","source" : "ICC","format" : "cn var. up to 19","template" : "70' or '77","length" : "var. up to 10"},
{"tag" : "5F34","name" : "Application Primary Account Number (PAN) Sequence Number","description" : "Identifies and differentiates cards with the same PAN","source" : "ICC","format" : "n2","template" : "70' or '77","length" : "1"},
{"tag" : "87","name" : "Application Priority Indicator","description" : "Indicates the priority of a given application or group of applications in a directory","source" : "ICC","format" : "b","template" : "61' or 'A5","length" : "1"},
{"tag" : "9F3B","name" : "Application Reference Currency","description" : "1-4 currency codes used between the terminal and the ICC when the Transaction Currency Code is different from the Application Currency Code; each code is 3 digits according to ISO 4217","source" : "ICC","format" : "n3","template" : "70' or '77","length" : "8-Feb"},
{"tag" : "9F43","name" : "Application Reference Currency Exponent","description" : "Indicates the implied position of the decimal point from the right of the amount, for each of the 1-4 reference currencies represented according to ISO 4217","source" : "ICC","format" : "n1","template" : "70' or '77","length" : "4-Jan"},
{"tag" : "—","name" : "Application Selection Indicator","description" : "For an application in the ICC to be supported by an application in the terminal, the Application Selection Indicator indicates whether the associated AID in the terminal must match the AID in the card exactly, including the length of the AID, or only up to the length of the AID in the terminal\nThere is only one Application Selection Indicator per AID supported by the terminal","source" : "Terminal","format" : "At the discretion of the terminal. The data is not sent across the interface","template" : "—","length" : "See format"},
{"tag" : "61","name" : "Application Template","description" : "Contains one or more data objects relevant to an application directory entry according to ISO/IEC 7816-5","source" : "ICC","format" : "b","template" : "70","length" : "var. up to 252"},
{"tag" : "9F36","name" : "Application Transaction Counter (ATC)","description" : "Counter maintained by the application in the ICC (incrementing the ATC is managed by the ICC)","source" : "ICC","format" : "b","template" : "77' or '80","length" : "2"},
{"tag" : "9F07","name" : "Application Usage Control","description" : "Indicates issuer’s specified restrictions on the geographic usage and services allowed for the application","source" : "ICC","format" : "b","template" : "70' or '77","length" : "2"},
{"tag" : "9F08","name" : "Application Version Number","description" : "Version number assigned by the payment system for the application","source" : "ICC","format" : "b","template" : "70' or '77","length" : "2"},
{"tag" : "9F09","name" : "Application Version Number","description" : "Version number assigned by the payment system for the application","source" : "Terminal","format" : "b","template" : "—","length" : "2"},
{"tag" : "89","name" : "Authorisation Code","description" : "Value generated by the authorisation authority for an approved transaction","source" : "Issuer","format" : "As defined by the Payment Systems","template" : "—","length" : "6"},
{"tag" : "8A","name" : "Authorisation Response Code","description" : "Code that defines the disposition of a message","source" : "Issuer/ Terminal","format" : "an 2","template" : "—","length" : "2"},
{"tag" : "—","name" : "Authorisation Response Cryptogram (ARPC)","description" : "Cryptogram generated by the issuer and used by the card to verify that the response came from the issuer.","source" : "Issuer","format" : "b","template" : "—","length" : "4 or 8"},
{"tag" : "5F54","name" : "Bank Identifier Code (BIC)","description" : "Uniquely identifies a bank as defined in ISO 9362.","source" : "ICC","format" : "var.","template" : "BF0C' or '73","length" : "8 or 11"},
{"tag" : "8C","name" : "Card Risk Management Data Object List 1 (CDOL1)","description" : "List of data objects (tag and length) to be passed to the ICC in the first GENERATE AC command","source" : "ICC","format" : "b","template" : "70' or '77","length" : "var. up to 252"},
{"tag" : "8D","name" : "Card Risk Management Data Object List 2 (CDOL2)","description" : "List of data objects (tag and length) to be passed to the ICC in the second GENERATE AC command","source" : "ICC","format" : "b","template" : "70' or '77","length" : "var. up to 252"},
{"tag" : "—","name" : "Card Status Update (CSU)","description" : "Contains data sent to the ICC to indicate whether the issuer approves or declines the transaction, and to initiate actions specified by the issuer. Transmitted to the card in Issuer Authentication Data.","source" : "Issuer","format" : "b","template" : "—","length" : "4"},
{"tag" : "5F20","name" : "Cardholder Name","description" : "Indicates cardholder name according to ISO 7813","source" : "ICC","format" : "ans 2-26","template" : "70' or '77","length" : "26-Feb"},
{"tag" : "9F0B","name" : "Cardholder Name Extended","description" : "Indicates the whole cardholder name when greater than 26 characters using the same coding convention as in ISO 7813","source" : "ICC","format" : "ans 27-45","template" : "70' or '77","length" : "27-45"},
{"tag" : "8E","name" : "Cardholder Verification Method (CVM) List","description" : "Identifies a method of verification of the cardholder supported by the application","source" : "ICC","format" : "b","template" : "70' or '77","length" : "10-252"},
{"tag" : "9F34","name" : "Cardholder Verification Method (CVM) Results","description" : "Indicates the results of the last CVM performed","source" : "Terminal","format" : "b","template" : "—","length" : "3"},
{"tag" : "—","name" : "Certification Authority Public Key Check Sum","description" : "A check value calculated on the concatenation of all parts of the Certification Authority Public Key (RID, Certification Authority Public Key Index, Certification Authority Public Key Modulus, Certification Authority Public Key Exponent) using SHA-1","source" : "Terminal","format" : "b","template" : "—","length" : "20"},
{"tag" : "—","name" : "Certification Authority Public Key Exponent","description" : "Value of the exponent part of the Certification Authority Public Key","source" : "Terminal","format" : "b","template" : "—","length" : "1 or 3"},
{"tag" : "8F","name" : "Certification Authority Public Key Index","description" : "Identifies the certification authority’s public key in conjunction with the RID","source" : "ICC","format" : "b","template" : "70' or '77","length" : "1"},
{"tag" : "9F22","name" : "Certification Authority Public Key Index","description" : "Identifies the certification authority’s public key in conjunction with the RID","source" : "Terminal","format" : "b","template" : "—","length" : "1"},
{"tag" : "—","name" : "Certification Authority Public Key Modulus","description" : "Value of the modulus part of the Certification Authority Public Key","source" : "Terminal","format" : "b","template" : "—","length" : "NCA (up to 248)"},
{"tag" : "83","name" : "Command Template","description" : "Identifies the data field of a command message","source" : "Terminal","format" : "b","template" : "—","length" : "var."},
{"tag" : "9F27","name" : "Cryptogram Information Data","description" : "Indicates the type of cryptogram and the actions to be performed by the terminal","source" : "ICC","format" : "b","template" : "77' or '80","length" : "1"},
{"tag" : "9F45","name" : "Data Authentication Code","description" : "An issuer assigned value that is retained by the terminal during the verification process of the Signed Static Application Data","source" : "ICC","format" : "b","template" : "—","length" : "2"},
{"tag" : "84","name" : "Dedicated File (DF) Name","description" : "Identifies the name of the DF as described in ISO/IEC 7816-4","source" : "ICC","format" : "b","template" : "6F","length" : "16-May"},
{"tag" : "—","name" : "Default Dynamic Data Authentication Data Object List (DDOL)","description" : "DDOL to be used for constructing the INTERNAL AUTHENTICATE command if the DDOL in the card is not present","source" : "Terminal","format" : "b","template" : "—","length" : "var."},
{"tag" : "—","name" : "Default Transaction Certificate Data Object List (TDOL)","description" : "TDOL to be used for generating the TC Hash Value if the TDOL in the card is not present","source" : "Terminal","format" : "b","template" : "—","length" : "var."},
{"tag" : "9D","name" : "Directory Definition File (DDF) Name","description" : "Identifies the name of a DF associated with a directory","source" : "ICC","format" : "b","template" : "61","length" : "16-May"},
{"tag" : "73","name" : "Directory Discretionary Template","description" : "Issuer discretionary part of the directory according to ISO/IEC 7816-5","source" : "ICC","format" : "var.","template" : "61","length" : "var. up to 252"},
{"tag" : "9F49","name" : "Dynamic Data Authentication Data Object List (DDOL)","description" : "List of data objects (tag and length) to be passed to the ICC in the INTERNAL AUTHENTICATE command","source" : "ICC","format" : "b","template" : "70' or '77","length" : "up to 252"},
{"tag" : "—","name" : "Enciphered Personal Identification Number (PIN) Data","description" : "Transaction PIN enciphered at the PIN pad for online verification or for offline verification if the PIN pad and IFD are not a single integrated device","source" : "Terminal","format" : "b","template" : "—","length" : "8"},
{"tag" : "BF0C","name" : "File Control Information (FCI) Issuer Discretionary Data","description" : "Issuer discretionary part of the FCI","source" : "ICC","format" : "var.","template" : "A5","length" : "var. up to 222"},
{"tag" : "A5","name" : "File Control Information (FCI) Proprietary Template","description" : "Identifies the data object proprietary to this specification in the FCI template according to ISO/IEC 7816-4","source" : "ICC","format" : "var.","template" : "6F","length" : "var."},
{"tag" : "6F","name" : "File Control Information (FCI) Template","description" : "Identifies the FCI template according to ISO/IEC 7816-4","source" : "ICC","format" : "var.","template" : "—","length" : "var. up to 252"},
{"tag" : "9F4C","name" : "ICC Dynamic Number","description" : "Time-variant number generated by the ICC, to be captured by the terminal","source" : "ICC","format" : "b","template" : "—","length" : "8-Feb"},
{"tag" : "9F2D","name" : "Integrated Circuit Card (ICC) PIN Encipherment Public Key Certificate","description" : "ICC PIN Encipherment Public Key certified by the issuer","source" : "ICC","format" : "b","template" : "70' or '77","length" : "NI"},
{"tag" : "9F2E","name" : "Integrated Circuit Card (ICC) PIN Encipherment Public Key Exponent","description" : "ICC PIN Encipherment Public Key Exponent used for PIN encipherment","source" : "ICC","format" : "b","template" : "70' or '77","length" : "1 or 3"},
{"tag" : "9F2F","name" : "Integrated Circuit Card (ICC) PIN Encipherment Public Key Remainder","description" : "Remaining digits of the ICC PIN Encipherment Public Key Modulus","source" : "ICC","format" : "b","template" : "70' or '77","length" : "NPE − NI + 42"},
{"tag" : "9F46","name" : "Integrated Circuit Card (ICC) Public Key Certificate","description" : "ICC Public Key certified by the issuer","source" : "ICC","format" : "b","template" : "70' or '77","length" : "NI"},
{"tag" : "9F47","name" : "Integrated Circuit Card (ICC) Public Key Exponent","description" : "ICC Public Key Exponent used for the verification of the Signed Dynamic Application Data","source" : "ICC","format" : "b","template" : "70' or '77","length" : "1 to 3"},
{"tag" : "9F48","name" : "Integrated Circuit Card (ICC) Public Key Remainder","description" : "Remaining digits of the ICC Public Key Modulus","source" : "ICC","format" : "b","template" : "70' or '77","length" : "NIC − NI + 42"},
{"tag" : "9F1E","name" : "Interface Device (IFD) Serial Number","description" : "Unique and permanent serial number assigned to the IFD by the manufacturer","source" : "Terminal","format" : "an 8","template" : "—","length" : "8"},
{"tag" : "5F53","name" : "International Bank Account Number (IBAN)","description" : "Uniquely identifies the account of a customer at a financial institution as defined in ISO 13616.","source" : "ICC","format" : "var.","template" : "BF0C' or '73","length" : "Var. up to 34"},
{"tag" : "9F0D","name" : "Issuer Action Code - Default","description" : "Specifies the issuer’s conditions that cause a transaction to be rejected if it might have been approved online, but the terminal is unable to process the transaction online","source" : "ICC","format" : "b","template" : "70' or '77","length" : "5"},
{"tag" : "9F0E","name" : "Issuer Action Code - Denial","description" : "Specifies the issuer’s conditions that cause the denial of a transaction without attempt to go online","source" : "ICC","format" : "b","template" : "70' or '77","length" : "5"},
{"tag" : "9F0F","name" : "Issuer Action Code - Online","description" : "Specifies the issuer’s conditions that cause a transaction to be transmitted online","source" : "ICC","format" : "b","template" : "70' or '77","length" : "5"},
{"tag" : "9F10","name" : "Issuer Application Data","description" : "Contains proprietary application data for transmission to the issuer in an online transaction.\nNote: For CCD-compliant applications, Annex C, section C7 defines the specific coding of the Issuer Application Data (IAD). To avoid potential conflicts with CCD-compliant applications, it is strongly recommended that the IAD data element in an application that is not CCD-compliant should not use the coding for a CCD-compliant application","source" : "ICC","format" : "b","template" : "77' or '80","length" : "var. up to 32"},
{"tag" : "91","name" : "Issuer Authentication Data","description" : "Data sent to the ICC for online issuer authentication","source" : "Issuer","format" : "b","template" : "—","length" : "16-Aug"},
{"tag" : "9F11","name" : "Issuer Code Table Index","description" : "Indicates the code table according to ISO/IEC 8859 for displaying the Application Preferred Name","source" : "ICC","format" : "n2","template" : "A5","length" : "1"},
{"tag" : "5F28","name" : "Issuer Country Code","description" : "Indicates the country of the issuer according to ISO 3166","source" : "ICC","format" : "n3","template" : "70' or '77","length" : "2"},
{"tag" : "5F55","name" : "Issuer Country Code (alpha2 format)","description" : "Indicates the country of the issuer as defined in ISO 3166 (using a 2 character alphabetic code)","source" : "ICC","format" : "a2","template" : "BF0C' or '73","length" : "2"},
{"tag" : "5F56","name" : "Issuer Country Code (alpha3 format)","description" : "Indicates the country of the issuer as defined in ISO 3166 (using a 3 character alphabetic code)","source" : "ICC","format" : "a3","template" : "BF0C' or '73","length" : "3"},
{"tag" : "42","name" : "Issuer Identification Number (IIN)","description" : "The number that identifies the major industry and the card issuer and that forms the first part of the Primary Account Number (PAN)","source" : "ICC","format" : "n6","template" : "BF0C' or '73","length" : "3"},
{"tag" : "90","name" : "Issuer Public Key Certificate","description" : "Issuer public key certified by a certification authority","source" : "ICC","format" : "b","template" : "70' or '77","length" : "NCA"},
{"tag" : "9F32","name" : "Issuer Public Key Exponent","description" : "Issuer public key exponent used for the verification of the Signed Static Application Data and the ICC Public Key Certificate","source" : "ICC","format" : "b","template" : "70' or '77","length" : "1 to 3"},
{"tag" : "92","name" : "Issuer Public Key Remainder","description" : "Remaining digits of the Issuer Public Key Modulus","source" : "ICC","format" : "b","template" : "70' or '77","length" : "NI − NCA + 36"},
{"tag" : "86","name" : "Issuer Script Command","description" : "Contains a command for transmission to the ICC","source" : "Issuer","format" : "b","template" : "71' or '72","length" : "var. up to 261"},
{"tag" : "9F18","name" : "Issuer Script Identifier","description" : "Identification of the Issuer Script","source" : "Issuer","format" : "b","template" : "71' or '72","length" : "4"},
{"tag" : "—","name" : "Issuer Script Results","description" : "Indicates the result of the terminal script processing","source" : "Terminal","format" : "b","template" : "—","length" : "var."},
{"tag" : "71","name" : "Issuer Script Template 1","description" : "Contains proprietary issuer data for transmission to the ICC before the second GENERATE AC command","source" : "Issuer","format" : "b","template" : "—","length" : "var."},
{"tag" : "72","name" : "Issuer Script Template 2","description" : "Contains proprietary issuer data for transmission to the ICC after the second GENERATE AC command","source" : "Issuer","format" : "b","template" : "—","length" : "var."},
{"tag" : "5F50","name" : "Issuer URL","description" : "The URL provides the location of the Issuer’s Library Server on the Internet.","source" : "ICC","format" : "ans","template" : "BF0C' or '73","length" : "var."},
{"tag" : "5F2D","name" : "Language Preference","description" : "1-4 languages stored in order of preference, each represented by 2 alphabetical characters according to ISO 639\nNote: EMVCo strongly recommends that cards be personalised with data element '5F2D' coded in lowercase, but that terminals accept the data element whether it is coded in upper or lower case.","source" : "ICC","format" : "an 2","template" : "A5","length" : "8-Feb"},
{"tag" : "9F13","name" : "Last Online Application Transaction Counter (ATC) Register","description" : "ATC value of the last transaction that went online","source" : "ICC","format" : "b","template" : "—","length" : "2"},
{"tag" : "9F4D","name" : "Log Entry","description" : "Provides the SFI of the Transaction Log file and its number of records","source" : "ICC","format" : "b","template" : "BF0C' or '73","length" : "2"},
{"tag" : "9F4F","name" : "Log Format","description" : "List (in tag and length format) of data objects representing the logged data elements that are passed to the terminal when a transaction log record is read","source" : "ICC","format" : "b","template" : "—","length" : "var."},
{"tag" : "9F14","name" : "Lower Consecutive Offline Limit","description" : "Issuer-specified preference for the maximum number of consecutive offline transactions for this ICC application allowed in a terminal with online capability","source" : "ICC","format" : "b","template" : "70' or '77","length" : "1"},
{"tag" : "—","name" : "Maximum Target Percentage to be used for Biased Random Selection","description" : "Value used in terminal risk management for random transaction selection","source" : "Terminal","format" : "—","template" : "—","length" : "—"},
{"tag" : "9F15","name" : "Merchant Category Code","description" : "Classifies the type of business being done by the merchant, represented according to ISO 8583:1993 for Card Acceptor Business Code","source" : "Terminal","format" : "n4","template" : "—","length" : "2"},
{"tag" : "9F16","name" : "Merchant Identifier","description" : "When concatenated with the Acquirer Identifier, uniquely identifies a given merchant","source" : "Terminal","format" : "ans 15","template" : "—","length" : "15"},
{"tag" : "9F4E","name" : "Merchant Name and Location","description" : "Indicates the name and location of the merchant","source" : "Terminal","format" : "ans","template" : "—","length" : "var."},
{"tag" : "—","name" : "Message Type","description" : "Indicates whether the batch data capture record is a financial record or advice","source" : "Terminal","format" : "n2","template" : "—","length" : "1"},
{"tag" : "—","name" : "Personal Identification Number (PIN) Pad Secret Key","description" : "Secret key of a symmetric algorithm used by the PIN pad to encipher the PIN and by the card reader to decipher the PIN if the PIN pad and card reader are not integrated","source" : "Terminal","format" : "—","template" : "—","length" : "—"},
{"tag" : "9F17","name" : "Personal Identification Number (PIN) Try Counter","description" : "Number of PIN tries remaining","source" : "ICC","format" : "b","template" : "—","length" : "1"},
{"tag" : "9F39","name" : "Point-of-Service (POS) Entry Mode","description" : "Indicates the method by which the PAN was entered, according to the first two digits of the ISO 8583:1987 POS Entry Mode","source" : "Terminal","format" : "n2","template" : "—","length" : "1"},
{"tag" : "9F38","name" : "Processing Options Data Object List (PDOL)","description" : "Contains a list of terminal resident data objects (tags and lengths) needed by the ICC in processing the GET PROCESSING OPTIONS command","source" : "ICC","format" : "b","template" : "A5","length" : "var."},
{"tag" : "—","name" : "Proprietary Authentication Data","description" : "Contains issuer data for transmission to the card in the Issuer Authentication Data of an online transaction.","source" : "Issuer","format" : "b","template" : "—","length" : "var. up to 8"},
{"tag" : "70","name" : "READ RECORD Response Message Template","description" : "Contains the contents of the record read. (Mandatory for SFIs 1-10. Response messages for SFIs 11-30 are outside the scope of EMV, but may use template '70')","source" : "ICC","format" : "var.","template" : "—","length" : "var. up to 252"},
{"tag" : "80","name" : "Response Message Template Format 1","description" : "Contains the data objects (without tags and lengths) returned by the ICC in response to a command","source" : "ICC","format" : "var.","template" : "—","length" : "var."},
{"tag" : "77","name" : "Response Message Template Format 2","description" : "Contains the data objects (with tags and lengths) returned by the ICC in response to a command","source" : "ICC","format" : "var.","template" : "—","length" : "var."},
{"tag" : "5F30","name" : "Service Code","description" : "Service code as defined in ISO/IEC 7813 for track 1 and track 2","source" : "ICC","format" : "n3","template" : "70' or '77","length" : "2"},
{"tag" : "88","name" : "Short File Identifier (SFI)","description" : "Identifies the AEF referenced in commands related to a given ADF or DDF. It is a binary data object having a value in the range 1 to 30 and with the three high order bits set to zero.","source" : "ICC","format" : "b","template" : "A5","length" : "1"},
{"tag" : "9F4B","name" : "Signed Dynamic Application Data","description" : "Digital signature on critical application parameters for DDA or CDA","source" : "ICC","format" : "b","template" : "77' or '80","length" : "NIC"},
{"tag" : "93","name" : "Signed Static Application Data","description" : "Digital signature on critical application parameters for SDA","source" : "ICC","format" : "b","template" : "70' or '77","length" : "NI"},
{"tag" : "9F4A","name" : "Static Data Authentication Tag List","description" : "List of tags of primitive data objects defined in this specification whose value fields are to be included in the Signed Static or Dynamic Application Data","source" : "ICC","format" : "—","template" : "70' or '77","length" : "var."},
{"tag" : "—","name" : "Target Percentage to be Used for Random Selection","description" : "Value used in terminal risk management for random transaction selection","source" : "Terminal","format" : "—","template" : "—","length" : "—"},
{"tag" : "—","name" : "Terminal Action Code - Default","description" : "Specifies the acquirer’s conditions that cause a transaction to be rejected if it might have been approved online, but the terminal is unable to process the transaction online","source" : "Terminal","format" : "b","template" : "—","length" : "5"},
{"tag" : "—","name" : "Terminal Action Code - Denial","description" : "Specifies the acquirer’s conditions that cause the denial of a transaction without attempt to go online","source" : "Terminal","format" : "b","template" : "—","length" : "5"},
{"tag" : "—","name" : "Terminal Action Code - Online","description" : "Specifies the acquirer’s conditions that cause a transaction to be transmitted online","source" : "Terminal","format" : "b","template" : "—","length" : "5"},
{"tag" : "9F33","name" : "Terminal Capabilities","description" : "Indicates the card data input, CVM, and security capabilities of the terminal","source" : "Terminal","format" : "b","template" : "—","length" : "3"},
{"tag" : "9F1A","name" : "Terminal Country Code","description" : "Indicates the country of the terminal, represented according to ISO 3166","source" : "Terminal","format" : "n3","template" : "—","length" : "2"},
{"tag" : "9F1B","name" : "Terminal Floor Limit","description" : "Indicates the floor limit in the terminal in conjunction with the AID","source" : "Terminal","format" : "b","template" : "—","length" : "4"},
{"tag" : "9F1C","name" : "Terminal Identification","description" : "Designates the unique location of a terminal at a merchant","source" : "Terminal","format" : "an 8","template" : "—","length" : "8"},
{"tag" : "9F1D","name" : "Terminal Risk Management Data","description" : "Application-specific value used by the card for risk management purposes","source" : "Terminal","format" : "b","template" : "—","length" : "8-Jan"},
{"tag" : "9F35","name" : "Terminal Type","description" : "Indicates the environment of the terminal, its communications capability, and its operational control","source" : "Terminal","format" : "n2","template" : "—","length" : "1"},
{"tag" : "95","name" : "Terminal Verification Results","description" : "Status of the different functions as seen from the terminal","source" : "Terminal","format" : "b","template" : "—","length" : "5"},
{"tag" : "—","name" : "Threshold Value for Biased Random Selection","description" : "Value used in terminal risk management for random transaction selection","source" : "Terminal","format" : "—","template" : "—","length" : "—"},
{"tag" : "9F1F","name" : "Track 1 Discretionary Data","description" : "Discretionary part of track 1 according to ISO/IEC 7813","source" : "ICC","format" : "ans","template" : "70' or '77","length" : "var."},
{"tag" : "9F20","name" : "Track 2 Discretionary Data","description" : "Discretionary part of track 2 according to ISO/IEC 7813","source" : "ICC","format" : "cn","template" : "70' or '77","length" : "var."},
{"tag" : "57","name" : "Track 2 Equivalent Data","description" : "Contains the data elements of track 2 according to ISO/IEC 7813, excluding start sentinel, end sentinel, and Longitudinal Redundancy Check (LRC), as follows: Primary Account Number\n Field Separator (Hex 'D')\n Expiration Date (YYMM)\n Service Code\n Discretionary Data (defined by individual payment systems)\n Pad with one Hex 'F' if needed to ensure whole bytes","source" : "ICC","format" : "b\n n, var. up to 19\n b n4 n3 n, var.\nb","template" : "70' or '77","length" : "var. up to 19"},
{"tag" : "—","name" : "Transaction Amount","description" : "Clearing amount of the transaction, including tips and other adjustments","source" : "Terminal","format" : "n 12","template" : "—","length" : "6"},
{"tag" : "97","name" : "Transaction Certificate Data Object List (TDOL)","description" : "List of data objects (tag and length) to be used by the terminal in generating the TC Hash Value","source" : "ICC","format" : "b","template" : "70' or '77","length" : "var. up to 252"},
{"tag" : "98","name" : "Transaction Certificate (TC) Hash Value","description" : "Result of a hash function specified in Book 2, Annex B3.1","source" : "Terminal","format" : "b","template" : "—","length" : "20"},
{"tag" : "5F2A","name" : "Transaction Currency Code","description" : "Indicates the currency code of the transaction according to ISO 4217","source" : "Terminal","format" : "n3","template" : "—","length" : "2"},
{"tag" : "5F36","name" : "Transaction Currency Exponent","description" : "Indicates the implied position of the decimal point from the right of the transaction amount represented according to ISO 4217","source" : "Terminal","format" : "n1","template" : "—","length" : "1"},
{"tag" : "9A","name" : "Transaction Date","description" : "Local date that the transaction was authorised","source" : "Terminal","format" : "n6 YYMMDD","template" : "—","length" : "3"},
{"tag" : "99","name" : "Transaction Personal Identification Number (PIN) Data","description" : "Data entered by the cardholder for the purpose of the PIN verification","source" : "Terminal","format" : "b","template" : "—","length" : "var."},
{"tag" : "9F3C","name" : "Transaction Reference Currency Code","description" : "Code defining the common currency used by the terminal in case the Transaction Currency Code is different from the Application Currency Code","source" : "Terminal","format" : "n3","template" : "—","length" : "2"},
{"tag" : "—","name" : "Transaction Reference Currency Conversion","description" : "Factor used in the conversion from the Transaction Currency Code to the Transaction Reference Currency Code","source" : "Terminal","format" : "n8","template" : "—","length" : "4"},
{"tag" : "9F3D","name" : "Transaction Reference Currency Exponent","description" : "Indicates the implied position of the decimal point from the right of the transaction amount, with the Transaction Reference Currency Code represented according to ISO 4217","source" : "Terminal","format" : "n1","template" : "—","length" : "1"},
{"tag" : "9F41","name" : "Transaction Sequence Counter","description" : "Counter maintained by the terminal that is incremented by one for each transaction","source" : "Terminal","format" : "n 4-8","template" : "—","length" : "4-Feb"},
{"tag" : "9B","name" : "Transaction Status Information","description" : "Indicates the functions performed in a transaction","source" : "Terminal","format" : "b","template" : "—","length" : "2"},
{"tag" : "9F21","name" : "Transaction Time","description" : "Local time that the transaction was authorised","source" : "Terminal","format" : "n6 HHMMSS","template" : "—","length" : "3"},
{"tag" : "9C","name" : "Transaction Type","description" : "Indicates the type of financial transaction, represented by the first two digits of the ISO 8583:1987 Processing Code. The actual values to be used for the Transaction Type data element are defined by the relevant payment system","source" : "Terminal","format" : "n2","template" : "—","length" : "1"},
{"tag" : "9F37","name" : "Unpredictable Number","description" : "Value to provide variability and uniqueness to the generation of a cryptogram","source" : "Terminal","format" : "b","template" : "—","length" : "4"},
{"tag" : "9F23","name" : "Upper Consecutive Offline Limit","description" : "Issuer-specified preference for the maximum number of consecutive offline transactions for this ICC application allowed in a terminal without online capability","source" : "ICC","format" : "b","template" : "70' or '77","length" : "1"}
    ]   
    //new method using the table
    var results = []
    var resultIndex = 0

    for (var i = 0; i < test.length; i++)
    {
        var toTest = test[i].tag
        //console.log('Testing: ' + toTest);
        /*if(exact){
            if(toTest == tag){
                console.log('Found exact match: ' + toTest);
                results[resultIndex] = {}
                results[resultIndex].tag = test[i].tag
                results[resultIndex].name = test[i].name 
                results[resultIndex].description = test[i].description 
                return results
            }
        }
        else */if(toTest.match(regex)){
            //partial match found
            //console.log('adding to result list: ' + test[i].description);
            results[resultIndex] = {}
            results[resultIndex].tag = test[i].tag
            results[resultIndex].name = test[i].name
            results[resultIndex].description = test[i].description 
            resultIndex++
        }
    }

    return results
}
