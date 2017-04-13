
var utils = require('./utils');

/**
 * Description: Decodes an Application Default Action (ADA - Visa proprietary tag 9F52). 
 * The ADA contains issuer-specific indicators for the card action for exception conditions
 * Input: 4-bytes parameter representing the ADA value, entered as hexadecimal
 * Output: Decoded value for the 4 bytes of the ADA. The output is represented as a list of key-pair 
 * for each relevant bits (bits set to 1b) for Bytes 1-3.
 * For Byte 4, bits 7-6 are decoded based on their preset values (these are not managed as a bit field). 
 * The output will have only one entry for bits 7-6; this entry will always be present in the results.
 * Other bits from Byte 4 are managed as bit fields and are processed identically to the content of Bytes 1-3
 */
exports.decodeADA = function(value){
    
    var interpretedADA= {};
    interpretedADA.byte1 = []
    interpretedADA.byte2 = []
    interpretedADA.byte3 = []
    interpretedADA.byte4 = []

    if(value){
      //B1 processing
      var adaB1 = value.substr(0,2);
      var adaB1bin = utils.Hex2Bin(adaB1);
      
      for(i=0;i<adaB1bin.length;i++){
          var b = 8-i
          if(adaB1bin[i] == 1){    
              interpretedADA.byte1.push(utils.createBitValue(b,adaValuesAt(1,i)))
          }
      }
      
      //B2 processing
      var adaB2 = value.substr(2,2);
      var adaB2bin = utils.Hex2Bin(adaB2);
      
      for(i=0;i<adaB2bin.length;i++){
          var b = 8-i
          if(adaB2bin[i] == 1){    
              interpretedADA.byte2.push(utils.createBitValue(b,adaValuesAt(2,i)))
          }
      }
      
      //B3 processing
      var adaB3 = value.substr(4,2);
      var adaB3bin = utils.Hex2Bin(adaB3);
      
      for(i=0;i<adaB3bin.length;i++){
          var b = 8-i
          if(adaB3bin[i] == 1){    
              interpretedADA.byte3.push(utils.createBitValue(b,adaValuesAt(3,i)))
          }
      }
      
      //B4 processing
      var adaB4 = value.substr(6,2);
      var adaB4bin = utils.Hex2Bin(adaB4);
      
      //B4b8 processing
      var adaB4b8 = adaB4bin.substr(0,1)
      //console.log("adaB4b8: " + adaB4b8)
      if (adaB4b8 == 1){        
        interpretedADA.byte4.push(utils.createBitValue(8,adaValuesAt(4,8,1)))
      }
      
      //B4b7-6 processing
      var adaB4b7b6 = adaB4bin.substr(1,2)
      //console.log("adaB4b7b6: " + adaB4b7b6)
      interpretedADA.byte4.push(utils.createBitValue(7,adaValuesAt(4,7,adaB4b7b6)))
      
      //B4b5 processing
      var adaB4b5 = adaB4bin.substr(3,1)
      //console.log("adaB4b5: " + adaB4b5)
      if (adaB4b5 == 1){
        interpretedADA += "Byte 4 - bit 5: " + adaValuesAt(4,5,1) + '\n'
        interpretedADA.byte4.push(utils.createBitValue(5,adaValuesAt(4,5,1)))
      }
      
      //B4 right nibble processing
      var adaB4bRightNibblebin = adaB4bin.substr(4,4)
      //console.log("adaB4bRightNibblebin: " + adaB4bRightNibblebin)
      
      for(i=0;i<adaB4bRightNibblebin.length;i++){
          var b = 4-i
          if(adaB4bRightNibblebin[i] == 1){    
              interpretedADA.byte4.push(utils.createBitValue(b,adaValuesAt(4,4,i)))
          }
      }      
      
    }
  
  return interpretedADA
  
}

function adaValuesAt(byte, position, value){

      var adaResultsB1 = [
        "Not used for VCPS",
        "Not used for VCPS",
        "Not used for VCPS",
        "Not used for VCPS",
        "Not used for VCPS",
        "Not used for VCPS",
        "Not used for VCPS",
        "Not used for VCPS"
    ]
      
    var adaResultsB2 = [
        "Not used for VCPS",
        "Not used for VCPS",
        "Not used for VCPS",
        "Not used for VCPS",
        "Not used for VCPS",
        "Not used for VCPS",
        "Do not reset CTTA during Issuer Authentication processing.",
        "Do not reset VLP Available Funds during Issuer Authentication processing."
    ]
    
    var adaResultsB3 = [
        "Do not include offline approval requested transactions in the transaction log",
        "Do not include online approval requested transactions in the transaction log",
        "Include offline declined transactions in the transaction log",
        "Reset VLP Available Funds to VLP Funds Limit when Offline PIN successfully verified",
        "Not used for VCPS",
        "Issuer Script MAC Chaining supported",
        "Issuer Script Command Counter is cyclic",
        "CTCI also counts non-matching country code transactions"
    ]
    
    var adaResultsB4b8 = {
      '1' : 'Use Default Update Counters in ADA if CSU is generated by a proxy'
    }

    var adaB4b7b6 = {
        '00' : 'Do not update velocity-checking counters',
        '01' : 'Set velocity-checking counters to Upper Limits',
        '10' : 'Reset velocity-checking counters to zero',
        '11' : 'Not used for VCPS'
    }

    var adaResultsB4b5 = {
      '1' : 'Padding method \'80\' supported'
    }

    var adaResultsB4RightNibble = [
      'RFU',
      'RFU',
      'RFU',
      'RFU'
    ]

  if(byte){
    if(byte == 1){
      //B1
      return adaResultsB1[position]
    }
    else if(byte == 2){
      //B2
      return adaResultsB2[position]      
    }
    else if(byte == 3){
      //B3
      return adaResultsB3[position]      
    }
    else if(byte == 4){
        if(position == 8){
          //B4 bit 8 - bitfield
          return adaResultsB4b8[value]
        }
      else if((position == 7) || (position == 6)){
        //byte 4 bit 7-6 - values
        return adaB4b7b6[value]
      }
      else if(position == 5){
        //byte 4 bit 5 - bitfield
          return adaResultsB4b5[value]
      }
      else if((position <= 4) && (position >= 1)){
        return adaResultsB4RightNibble[value]
      } 
    }
  }

}
