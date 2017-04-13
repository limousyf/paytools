
exports.decodeTermType = function(value){
    
    var termType = {
        '11' : { 'control' : 'Financial institution',
                 'environment' :  'Attended',
                 'capabilities' : 'Online only'},
        '12' : { 'control' : 'Financial institution',
                 'environment' :  'Attended',
                 'capabilities' : 'Offline with online capability'},
        '13' : { 'control' : 'Financial institution',
                 'environment' :  'Attended',
                 'capabilities' : 'Offline only'},
        '14' : { 'control' : 'Financial institution',
                 'environment' :  'Unattended',
                 'capabilities' : 'Online only'},
        '15' : { 'control' : 'Financial institution',
                 'environment' :  'Unattended',
                 'capabilities' : 'Offline with online capability'},
        '16' : { 'control' : 'Financial institution',
                 'environment' :  'Unattended',
                 'capabilities' : 'Offline only'},
        '21' : { 'control' : 'Merchant',
                 'environment' :  'Attended',
                 'capabilities' : 'Online only'},
        '22' : { 'control' : 'Merchant',
                 'environment' :  'Attended',
                 'capabilities' : 'Offline with online capability'},
        '23' : { 'control' : 'Merchant',
                 'environment' :  'Attended',
                 'capabilities' : 'Offline only'},
        '24' : { 'control' : 'Merchant',
                 'environment' :  'Unattended',
                 'capabilities' : 'Online only'},
        '25' : { 'control' : 'Merchant',
                 'environment' :  'Unattended',
                 'capabilities' : 'Offline with online capability'},
        '26' : { 'control' : 'Merchant',
                 'environment' :  'Unattended',
                 'capabilities' : 'Offline only'},
        '34' : { 'control' : 'Cardholder',
                 'environment' :  'Unattended',
                 'capabilities' : 'Online only'},
        '35' : { 'control' : 'Cardholder',
                 'environment' :  'Unattended',
                 'capabilities' : 'Offline with online capability'},
        '36' : { 'control' : 'Cardholder',
                 'environment' :  'Unattended',
                 'capabilities' : 'Offline only'},
    }    

    var interpretedTermType = { 'control' : 'Unknown',
                 'environment' :  'Unknown',
                 'capabilities' : 'Unknown'}
    if((value) && (termType[value])){
        interpretedTermType = termType[value]
    }
    return interpretedTermType
}
