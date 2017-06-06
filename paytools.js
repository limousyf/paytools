
var cvrUtils = require('./cvr');
var adaUtils = require('./ada');
var capUtils = require('./cap');
var cidUtils = require('./cid');
var arcUtils = require('./arc');
var csuUtils = require('./csu');
var ctqUtils = require('./ctq');
var ttqUtils = require('./ttq');
var dolUtils = require('./dol');
var aidUtils = require('./aid');
var emvTagUtils = require('./emvtags');
var utils = require('./utils');
var cvmUtils = require('./cvm');
var termCapUtils = require('./terminalCapabilities');
var termTypeUtils = require('./termType');
var aipUtils = require('./aip');
var aucUtils = require('./auc');
var tvrUtils = require('./tvr');
var tsiUtils = require('./tsi');
var avsUtils = require('./avs');
var iinUtils = require('./iin');
var luhnUtils = require('./luhn');
var currencyUtils = require('./currency');
var countryUtils = require('./country');

var ApiBuilder = require('claudia-api-builder'),
	api = new ApiBuilder();

module.exports = api;

const API_VERSION = "v1"

//TODO remove for production

api.get('/' + API_VERSION + '/test/{test_value}', function (request) {
	'use strict';
	return request.pathParams.ada_value + ' is ok';
});

api.get('/' + API_VERSION + '/test', function (request) {
	return request.queryString.name + ' is ok';
});

api.get('/' + API_VERSION + '/ada/{ada_value}', function (request) {
	'use strict';
	return processADA(request.pathParams.ada_value)
});

api.get('/' + API_VERSION + '/ada', function (request) {
    var ada = request.queryString.ada
	return processADA(ada)
});

function processADA(ada){
	var message = "B1B2B3B4"
    var formatResult = utils.formatChecker(ada,1,4,4,message)

    if(formatResult.formatOk){
        var interpretedADA = adaUtils.decodeADA(ada)
        if(interpretedADA){
			return new api.ApiResponse(interpretedADA, {'Content-Type': 'application/json'}, 200);
        }
		else{
			throw("Internal error")
		}          
    }
	else{
		throw(formatResult.errorMessage)
	}
};

api.get('/' + API_VERSION + '/aid/{aid_value}', function (request) {
	'use strict';
	return processAID(request.pathParams.aid_value,true)
});

api.get('/' + API_VERSION + '/aid', function (request) {
    var aid = request.queryString.aid
	var exact = request.queryString.exact
	return processAID(aid,exact)
});

function processAID(aid,exact){
	var message = "aid value in hexadecimal"
    var formatResult = utils.formatChecker(aid,1,0,0,message)

    if(formatResult.formatOk){
        var interpretedAID = aidUtils.aidValues(aid,exact)
        if(interpretedAID){
			return new api.ApiResponse(interpretedAID, {'Content-Type': 'application/json'}, 200);
        }
		else{
			throw("Internal error")
		}          
    }
	else{
		throw(formatResult.errorMessage)
	}
};

api.get('/' + API_VERSION + '/aip/{aip_value}', function (request) {
	'use strict';
	return processAIP(request.pathParams.aip_value)
});

api.get('/' + API_VERSION + '/aip', function (request) {
    var aip = request.queryString.aip
	return processAIP(aip)
});

function processAIP(aip){
	var message = "B1B2"
    var formatResult = utils.formatChecker(aip,1,2,2,message)

    if(formatResult.formatOk){
        var interpretedAIP = aipUtils.decodeAIP(aip)
        if(interpretedAIP != ""){
			return new api.ApiResponse(interpretedAIP, {'Content-Type': 'application/json'}, 200);
        }
		else{
			throw("Internal error")
		}     
    }
	else{
		throw(formatResult.errorMessage)
	}
};

api.get('/' + API_VERSION + '/arc/{arc_value}', function (request) {
	'use strict';
	return processARC(request.pathParams.arc_value)
});

api.get('/' + API_VERSION + '/arc', function (request) {
    var arc = request.queryString.arc
	return processARC(arc)
});

function processARC(arc){
	var message = "XX"
    var formatResult = utils.formatChecker(arc,0,1,1,message)

    if(formatResult.formatOk){
        var interpretedARC = arcUtils.decodeARC(arc)
        if(interpretedARC != ""){
			return new api.ApiResponse(interpretedARC, {'Content-Type': 'application/json'}, 200);
        }
		else{
			throw("Internal error")
		}          
    }
	else{
		throw(formatResult.errorMessage)
	}
};

api.get('/' + API_VERSION + '/auc/{auc_value}', function (request) {
	'use strict';
	return processAUC(request.pathParams.auc_value)
});

api.get('/' + API_VERSION + '/auc', function (request) {
    var auc = request.queryString.auc
	return processAUC(auc)
});

function processAUC(auc){
	var message = "B1B2"
    var formatResult = utils.formatChecker(auc,1,2,2,message)

    if(formatResult.formatOk){
        var interpretedAUC = aucUtils.decodeAUC(auc)
        if(interpretedAUC){
			return new api.ApiResponse(interpretedAUC, {'Content-Type': 'application/json'}, 200);
        }
		else{
			throw("Internal error")
		}     
    }
	else{
		throw(formatResult.errorMessage)
	}
};

api.get('/' + API_VERSION + '/avs/{scheme_value}/{avs_value}', function (request) {
	'use strict';
	return processAVS(request.pathParams.avs_value,request.pathParams.sheme_value)
});

api.get('/' + API_VERSION + '/avs', function (request) {
    var avs = request.queryString.avs
	var scheme = request.queryString.scheme
	return processAVS(avs,scheme)
});

function processAVS(avs,scheme){
	var message = "X"
    var formatResult = utils.formatChecker(avs,0,.5,.5,message)

    if(formatResult.formatOk){
        var interpretedAVS= avsUtils.decodeAVS(avs, scheme)
        if(interpretedAVS != ""){
			return new api.ApiResponse(interpretedAVS, {'Content-Type': 'application/json'}, 200);
        }
		else{
			throw("Internal error")
		}          
    }
	else{
		throw(formatResult.errorMessage)
	}
};

api.get('/' + API_VERSION + '/bin/{bin_value}', function (request) {
	'use strict';
	return processIIN(request.pathParams.bin_value,true)
});

api.get('/' + API_VERSION + '/bin', function (request) {
    var bin = request.queryString.bin
	var exact = request.queryString.exact
	return processIIN(bin,exact)
});

api.get('/' + API_VERSION + '/cap/{cap_value}', function (request) {
	'use strict';
	return processCAP(request.pathParams.cap_value)
});

api.get('/' + API_VERSION + '/cap', function (request) {
    var cap = request.queryString.cap
	return processCAP(cap)
});

function processCAP(cap){
	var message = "B1B2B3B4"
    var formatResult = utils.formatChecker(cap,1,4,4,message)

    if(formatResult.formatOk){
        var interpretedCAP = capUtils.decodeCAP(cap)
        if(interpretedCAP){
			return new api.ApiResponse(interpretedCAP, {'Content-Type': 'application/json'}, 200);
        }
		else{
			throw("Internal error")
		}     
    }
	else{
		return new api.ApiResponse(utils.formatError(formatResult.errorMessage,cap), 
		{'Content-Type': 'application/json'}, 400);
	}
};

api.get('/' + API_VERSION + '/cid', function (request) {
    var cid = request.queryString.cid
	return processCID(cid)
});

function processCID(cid){
	var message = "B1"
    var formatResult = utils.formatChecker(cid,1,1,1,message)

    if(formatResult.formatOk){
        var interpretedCID = cidUtils.decodeCID(cid)
        if(interpretedCID){
			return new api.ApiResponse(interpretedCID, {'Content-Type': 'application/json'}, 200);
        }
		else{
			throw("Internal error")
		}     
    }
	else{
		throw(formatResult.errorMessage)
	}
};

api.get('/' + API_VERSION + '/country/{num_value}', function (request) {
	'use strict';
	return processCountry(request.pathParams.num_value,true)
});

api.get('/' + API_VERSION + '/country', function (request) {
    var num = request.queryString.num
	return processCountry(num)
});

function processCountry(num){
	var message = "country code value in decimal"
    var formatResult = utils.formatChecker(num,0,.5,1.5,message)

    if(formatResult.formatOk){
        var interpretedCountry = countryUtils.countryCodeValues(num)
        if(interpretedCountry){
			return new api.ApiResponse(interpretedCountry, {'Content-Type': 'application/json'}, 200);
        }
		else{
			return new api.ApiResponse(utils.formatError("Country code not found",num), 
		{'Content-Type': 'application/json'}, 400);
		}          
    }
	else{
		return new api.ApiResponse(utils.formatError(formatResult.errorMessage,num), 
		{'Content-Type': 'application/json'}, 400);
	}
};

api.get('/' + API_VERSION + '/csu/{csu_value}', function (request) {
	'use strict';
	return processCSU(request.pathParams.csu_value)
});

api.get('/' + API_VERSION + '/csu', function (request) {
    var csu = request.queryString.csu
	return processCSU(csu)
});

function processCSU(csu){
	var message = "B1B2B3B4"
    var formatResult = utils.formatChecker(csu,1,4,4,message)

    if(formatResult.formatOk){
        var interpretedCSU = csuUtils.decodeCSU(csu)
        if(interpretedCSU){
			return new api.ApiResponse(interpretedCSU, {'Content-Type': 'application/json'}, 200);
        }
		else{
			throw("Internal error")
		}          
    }
	else{
		return new api.ApiResponse(utils.formatError(formatResult.errorMessage,csu), 
		{'Content-Type': 'application/json'}, 400);
	}
};

api.get('/' + API_VERSION + '/ctq/{ctq_value}', function (request) {
	'use strict';
	return processCTQ(request.pathParams.ctq_value)
});

api.get('/' + API_VERSION + '/ctq', function (request) {
    var ctq = request.queryString.ctq
	return processCTQ(ctq)
});

function processCTQ(ctq){
	var message = "B1B2"
    var formatResult = utils.formatChecker(ctq,1,2,2,message)

    if(formatResult.formatOk){
        var interpretedCTQ = ctqUtils.decodeCTQ(ctq)
        if(interpretedCTQ){
			return new api.ApiResponse(interpretedCTQ, {'Content-Type': 'application/json'}, 200);
        }
		else{
			throw("Internal error")
		}     
    }
	else{
		throw(formatResult.errorMessage)
	}
};

api.get('/' + API_VERSION + '/currency/{num_value}', function (request) {
	'use strict';
	return processCurrency(request.pathParams.num_value,true)
});

api.get('/' + API_VERSION + '/currency', function (request) {
    var num = request.queryString.num
	return processCurrency(num)
});

function processCurrency(num){
	var message = "num value in decimal"
    var formatResult = utils.formatChecker(num,0,0,1.5,message)

    if(formatResult.formatOk){
        var interpretedCurrency = currencyUtils.currencyCodeValues(num)
        if(interpretedCurrency){
			return new api.ApiResponse(interpretedCurrency, {'Content-Type': 'application/json'}, 200);
        }
		else{
			return new api.ApiResponse(utils.formatError("Currency code not found",num), 
		{'Content-Type': 'application/json'}, 400);
		}          
    }
	else{
		return new api.ApiResponse(utils.formatError(formatResult.errorMessage,num), 
		{'Content-Type': 'application/json'}, 400);
	}
};

api.get('/' + API_VERSION + '/cvm/{cvm_value}', function (request) {
	'use strict';
	return processCVM(request.pathParams.cvm_value)
});

api.get('/' + API_VERSION + '/cvm', function (request) {
    var cvm = request.queryString.cvm
	return processCVM(cvm)
});

function processCVM(cvm){
	var message = "B1B2B3"
    var formatResult = utils.formatChecker(cvm,1,3,3,message)

    if(formatResult.formatOk){
        var interpretedCVM = cvmUtils.decodeCVMResults(cvm)
        if(interpretedCVM){
			return new api.ApiResponse(interpretedCVM, {'Content-Type': 'application/json'}, 200);
        }
		else{
			throw("Internal error")
		}     
    }
	else{
		throw(formatResult.errorMessage)
	}
};

api.get('/' + API_VERSION + '/cvr/{cvr_value}', function (request) {
	'use strict';
	return processCVR(request.pathParams.cvr_value)
});

api.get('/' + API_VERSION + '/cvr', function (request) {
    var cvr = request.queryString.cvr
	return processCVR(cvr)
});

function processCVR(cvr){
	var message = "B1B2B3B4 or B1B2B3B4B5"
    var formatResult = utils.formatChecker(cvr,1,4,5,message)

    if(formatResult.formatOk){
        var interpretedCVR = cvrUtils.decodeCVR(cvr)
        if(interpretedCVR){
			return new api.ApiResponse(interpretedCVR, {'Content-Type': 'application/json'}, 200);
        }
		else{
			throw("Internal error")
		}     
    }
	else{
		throw(formatResult.errorMessage)
	}
};

api.get('/' + API_VERSION + '/dol/{dol_value}', function (request) {
	'use strict';
	return processDOL(request.pathParams.dol_value)
});

api.get('/' + API_VERSION + '/dol', function (request) {
    var dol = request.queryString.dol
	return processDOL(dol)
});

function processDOL(dol){
	var message = "dol value in hexadecimal"
    var formatResult = utils.formatChecker(dol,1,0,0,message)

    if(formatResult.formatOk){
        var interpretedDOL = dolUtils.decodeDOL(dol)
        if(interpretedDOL){
			return new api.ApiResponse(interpretedDOL, {'Content-Type': 'application/json'}, 200);
        }
		else{
			throw("Internal error")
		}          
    }
	else{
		throw(formatResult.errorMessage)
	}
};

api.get('/' + API_VERSION + '/iin/{iin_value}', function (request) {
	'use strict';
	return processIIN(request.pathParams.iin_value,true)
});

api.get('/' + API_VERSION + '/iin', function (request) {
    var iin = request.queryString.iin
	var exact = request.queryString.exact
	return processIIN(iin,exact)
});

function processIIN(iin,exact) {

	var message = "iin value between 3 and 8 digits"
	//check size between 3 and 8
    var formatResult = utils.formatChecker(iin,0,1.5,4,message)

	if(formatResult.formatOk){
			if(!utils.isDec(iin)){
				throw("The value provided is not decimal")
			}
			var interpretedIIN = iinUtils.iinValues(iin,exact)
			if(interpretedIIN){
				return new api.ApiResponse(interpretedIIN, {'Content-Type': 'application/json'}, 200);
			}
			else{
				throw("Internal error")
			}          
		}
		else{
			throw(formatResult.errorMessage)
		}
}

api.get('/' + API_VERSION + '/luhncheck', function (request) {
    var num_value = request.queryString.numvalue
	var checkDigit = request.queryString.checkdigit
	return checkLuhn(num_value,checkDigit)
});

api.get('/' + API_VERSION + '/luhncompute/{num_value}', function (request) {
	'use strict';
	return computeLuhn(request.pathParams.num_value)
});

api.get('/' + API_VERSION + '/luhncompute', function (request) {
    var num_value = request.queryString.numvalue
	return computeLuhn(num_value)
});

api.get('/' + API_VERSION + '/mod10check', function (request) {
    var num_value = request.queryString.numvalue
	var checkDigit = request.queryString.checkdigit
	return checkLuhn(num_value,checkDigit)
});

api.get('/' + API_VERSION + '/mod10compute/{num_value}', function (request) {
	'use strict';
	return computeLuhn(request.pathParams.num_value)
});

api.get('/' + API_VERSION + '/mod10compute', function (request) {
    var num_value = request.queryString.numvalue
	return computeLuhn(num_value)
});

function checkLuhn(numValue,checkDigit) {

	var message = "a numeric value of at least 1 digit"
    var formatResult = utils.formatChecker(numValue,0,0.5,100,message)

	if(formatResult.formatOk){
			if(!utils.isDec(numValue)){
				throw("The value provided is not in decimal format")
			}
			if (checkDigit && (!utils.isDec(checkDigit))){
				throw("The check digit provided is not in decimal format")
			}
			var result = luhnUtils.checkLuhnDigit(numValue,checkDigit)
			var expectedCheckDigit = luhnUtils.computeLuhnDigit(numValue)
			var returnValue = {
				"value" : numValue,
				"checkDigit" : checkDigit,
				"expectedCheckDigit" : expectedCheckDigit,
				"result" : false
			}
			if(result){
				returnValue = {
					"result" : true
				}
			}
			return new api.ApiResponse(returnValue, {'Content-Type': 'application/json'}, 200);        
		}
		else{
			return new api.ApiResponse(utils.formatError(formatResult.errorMessage,numValue), 
		{'Content-Type': 'application/json'}, 400);
		}
}

function computeLuhn(numValue) {

	var message = "Numeric value should be at least 1 digit"
    var formatResult = utils.formatChecker(numValue,0,0.5,100,message)

	if(formatResult.formatOk){
			if(!utils.isDec(numValue)){
				throw("The value provided is not in decimal format")
			}
			var result = luhnUtils.computeLuhnDigit(numValue)
			var returnValue = {
				"value" : numValue,
				"checkDigit" : result
			}
			return new api.ApiResponse(returnValue, {'Content-Type': 'application/json'}, 200);       
	}
	else{
		return new api.ApiResponse(utils.formatError(formatResult.errorMessage,numValue), 
		{'Content-Type': 'application/json'}, 400);
	}
}

api.get('/' + API_VERSION + '/tag/{tag_value}', function (request) {
	'use strict';
	return processTag(request.pathParams.tag_value,true)
});

api.get('/' + API_VERSION + '/tag', function (request) {
    var tag = request.queryString.tag
	var exact = request.queryString.exact
	return processTag(tag,exact)
});

function processTag(tag,exact){
	var message = "tag value in hexadecimal"
    var formatResult = utils.formatChecker(tag,1,0,0,message)

    if(formatResult.formatOk){
        var interpretedTag = emvTagUtils.tagValues(tag,exact)
        if(interpretedTag){
			return new api.ApiResponse(interpretedTag, {'Content-Type': 'application/json'}, 200);
        }
		else{
			throw("Internal error")
		}          
    }
	else{
		throw(formatResult.errorMessage)
	}
};

api.get('/' + API_VERSION + '/termcap/{termcap_value}', function (request) {
	'use strict';
	return processTermCap(request.pathParams.termcap_value)
});

api.get('/' + API_VERSION + '/termcap', function (request) {
    var termcap = request.queryString.termcap
	return processTermCap(termcap)
});

function processTermCap(termcap){
	var message = "B1B2B3"
    var formatResult = utils.formatChecker(termcap,1,3,3,message)

    if(formatResult.formatOk){
        var interpretedTermCap = termCapUtils.decodeTermCap(termcap)
        if(interpretedTermCap){
			return new api.ApiResponse(interpretedTermCap, {'Content-Type': 'application/json'}, 200);
        }
		else{
			throw("Internal error")
		}     
    }
	else{
		throw(formatResult.errorMessage)
	}
};

api.get('/' + API_VERSION + '/termtype/{termtype_value}', function (request) {
	'use strict';
	return processTermType(request.pathParams.termtype_value)
});

api.get('/' + API_VERSION + '/termtype', function (request) {
    var termType = request.queryString.termtype
	return processTermType(termType)
});

function processTermType(termType){
	var message = "NN"
    var formatResult = utils.formatChecker(termType,0,1,1,message)

    if(formatResult.formatOk){
        var interpretedTermType = termTypeUtils.decodeTermType(termType)
        if(interpretedTermType != ""){
			return new api.ApiResponse(interpretedTermType, {'Content-Type': 'application/json'}, 200);
        }
		else{
			throw("Internal error")
		}          
    }
	else{
		throw(formatResult.errorMessage)
	}
};

api.get('/' + API_VERSION + '/tsi/{tsi_value}', function (request) {
	'use strict';
	return processTSI(request.pathParams.tsi_value)
});

api.get('/' + API_VERSION + '/tsi', function (request) {
    var tsi = request.queryString.tsi
	return processTSI(tsi)
});

function processTSI(tsi){
	var message = "B1 or B1B2"
    var formatResult = utils.formatChecker(tsi,1,1,2,message)

    if(formatResult.formatOk){
        var interpretedTSI = tsiUtils.decodeTSI(tsi)
        if(interpretedTSI){
			return new api.ApiResponse(interpretedTSI, {'Content-Type': 'application/json'}, 200);
        }      
		else{
			throw("Internal error")
		}    
    }
	else{
		return new api.ApiResponse(formatResult, {'Content-Type': 'application/json'}, 400);
		//throw(formatResult.errorMessage)

	}
};

api.get('/' + API_VERSION + '/ttq/{ttq_value}', function (request) {
	'use strict';
	return processTTQ(request.pathParams.ttq_value)
});

api.get('/' + API_VERSION + '/ttq', function (request) {
    var ttq = request.queryString.ttq
	return processTTQ(ttq)
});

function processTTQ(ttq) {
	var message = "B1B2B3 B1B2B3B4"
    var formatResult = utils.formatChecker(ttq,1,3,4,message)

    if(formatResult.formatOk){
        var interpretedTTQ = ttqUtils.decodeTTQ(ttq)
        if(interpretedTTQ){
			return new api.ApiResponse(interpretedTTQ, {'Content-Type': 'application/json'}, 200);
        }
		else{
			throw("Internal error")
		}          
    }
	else{
		throw(formatResult.errorMessage)
	}
};

api.get('/' + API_VERSION + '/tvr/{tvr_value}', function (request) {
	'use strict';
	return processTVR(request.pathParams.tvr_value)
});

api.get('/' + API_VERSION + '/tvr', function (request) {
    var tvr = request.queryString.tvr
	return processTVR(tvr)
});

function processTVR(tvr){
	var message = "B1B2B3B4B5"
    var formatResult = utils.formatChecker(tvr,1,5,5,message)

    if(formatResult.formatOk){
        var interpretedTVR = tvrUtils.decodeTVR(tvr)
        if(interpretedTVR){
			return new api.ApiResponse(interpretedTVR, {'Content-Type': 'application/json'}, 200);
        }
		else{
			throw("Internal error")
		}          
    }
	else{
		throw(formatResult.errorMessage)
	}
};