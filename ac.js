
var utils = require('./utils');

//Takes a key and Data Object List values in input, returns an Application Cryptogram
exports.generateAC = function(key, atc, iv, dolValues){
    //verifies if key is 3DES double size
    if(key.length == 32){
        
    }
}

//Verifies if the cryptogram provided in input is valid
exports.verifyAC = function(cryptogram, key, atc, iv, dolValues){

}

//Diversifies a 3DES key
exports.TDESKeyDerivation = function(masterKey, derivationData){

}