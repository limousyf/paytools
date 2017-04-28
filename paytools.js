
var cvrUtils = require('./cvr');
var adaUtils = require('./ada');
var cidUtils = require('./cid');
var arcUtils = require('./arc');
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

var ApiBuilder = require('claudia-api-builder'),
	api = new ApiBuilder();

module.exports = api;

//TODO remove for production
api.get('/test', function (request) {
	return request.queryString.name + ' is ok';
});

api.get('/ada', function (request) {
    var ada = request.queryString.ada

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
});

api.get('/aid', function (request) {
    var aid = request.queryString.aid
	var exact = request.queryString.exact

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
});

api.get('/aip', function (request) {
    var aip = request.queryString.aip

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
});

api.get('/arc', function (request) {
    var arc = request.queryString.arc

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
});

api.get('/auc', function (request) {
    var auc = request.queryString.auc

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
});

api.get('/avs', function (request) {
    var avs = request.queryString.avs
	var scheme = request.queryString.scheme

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
});

api.get('/bin', function (request) {
	return processIIN(request)
});

api.get('/cid', function (request) {
    var cid = request.queryString.cid

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
});

api.get('/ctq', function (request) {
    var ctq = request.queryString.ctq

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
});

api.get('/cvm', function (request) {
    var cvm = request.queryString.cvm

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
});

api.get('/cvr', function (request) {
    var cvr = request.queryString.cvr

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
});

api.get('/dol', function (request) {
    var dol = request.queryString.dol

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
});

api.get('/iin', function (request) {
    return processIIN(request)
});

function processIIN(request) {
    var iin = request.queryString.iin
	var exact = request.queryString.exact

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

api.get('/tag', function (request) {
    var tag = request.queryString.tag
	var exact = request.queryString.exact

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
});

api.get('/termcap', function (request) {
    var termcap = request.queryString.termcap

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
});

api.get('/termtype', function (request) {
    var termtype = request.queryString.termtype

	var message = "NN"
    var formatResult = utils.formatChecker(termtype,0,1,1,message)

    if(formatResult.formatOk){
        var interpretedTermType = termTypeUtils.decodeTermType(termtype)
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
});

api.get('/tsi', function (request) {
    var tsi = request.queryString.tsi

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
		//return new api.ApiResponse(formatResult.errorMessage, {'Content-Type': 'application/json'}, 500);
		throw(formatResult.errorMessage)
	}
});

api.get('/ttq', function (request) {
    var ttq = request.queryString.ttq

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
});

api.get('/tvr', function (request) {
    var tvr = request.queryString.tvr

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
});