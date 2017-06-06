var utils = require('./utils');

var tripleDES = require("crypto-js/tripledes");

/**
 * padd a data block with 00 so it's organized in 8-bytes block
 */
function generateDataBlocks(data, padwith80){
    var paddedData = data;

    //padding with option '80'
    //used for CVN 18 and 22 in Visa, not used for CVN 10
    if(padwith80){
        paddedData += "80"
    }

    while((paddedData % 8) != 0){
        //padding right with '00' until reaching 8-bytes multiple
        paddedData += '00'
    }

    var blockList = []

    //populating the blocklist
    var blockNumber = paddedData.length /8
    for(var i=0;i<blockNumber;i++){
        blockList.push(paddedData.substr(i*8,8))
    }

    return blockList;
}

function generateKeyA(masterKey,PAN,PSN){
    return keyDerivation(masterKey,keyDerivationData(PAN,PSN))
}

function generateKeyB(masterKey,PAN,PSN){
    return keyDerivation(masterKey,keyDerivationData(invertPAN(PAN),PSN))
}

function keyDerivation(masterKey, derivationData){

}

function keyDerivationData(PAN,PSN){
    var psnValue = PSN;
    var derivationData;
    var panValue = PAN;
    //set default PSN value
    if(!PSN){
        psnValue = "00"
    }
    
    if((PAN.endsWith('F')) || (PAN.endsWith('f'))){
        //PAN is padded with F, remove padding letter
        rawPAN = rawPAN.substr(0,PAN.length-1)
    }

    //concatenating
    var concatenatedData = rawPAN + psnValue

    if(concatenatedData.length > 16){
        //length is longer than 16, removing leftside digits to keep 16 rightmost digits
        for(var i=0;1<16;i++){
            var position = concatenatedData.length - 1
            derivationData = concatenatedData[position] + derivationData
            position--
        }
    }
    else if(concatenatedData.length < 16){
        
        derivationData = concatenatedData
        
        //padding with 0
        var until = 16-concatenatedData.length
        for(var i=0;i<until;i++){
            derivationData += '0'
        }
    }
    else{
        //exactly 16
        derivationData = concatenatedData
    }
}

function sessionKeyDerivationData(UDKA, UDKB,ATC){
    //padding ATC with 6 bytes at 0
    var paddedATC = ATC + "000000000000"

//TODO: review
    //F1 data management


    //F2 data management
}

function invertPAN(PAN){
    var invertedPAN

    if(PAN){
        var PANBinary = utils.Dec2Bin(PAN)
        var invertedPANBinary
        for(var i=0;i<PANBinary.length;i++){
            if(PANBinary[i] == 0){
                invertedPANBinary[i] = 1
            }
            else{
                invertedPANBinary[i] = 0
            }
        }
        invertedPAN = utils.Bin2Dec(invertedPANBinary)
    }

    return invertedPAN
}