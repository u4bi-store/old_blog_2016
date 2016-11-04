app.factory('GitPageService', GitPageService);

function GitPageService($http, $q){
    return {
        'flag'  : flag,
        'key' : key,
        'json' : json,
        'readHint' : readHint
    }

    function flag(bool){
        return !bool;
    }

    function key(){
        var keyArray = {
            shell : ['u4bi','u4bi@localhost'],
            cmd   : ['> ',' / $ '],
            style : { yellow : '#FFFF00', green  : '#47804d', blue   : '#709ECC'}
        };
        return keyArray; 
    }

    function json(path){
        var q =$q.defer();
        $http.get(path).success(function(data){
            q.resolve(data);
        }).error(function(err){
            q.reject(err);
        });
        return q.promise;
    }

    function readHint(day){
        return '현재 '+day+'장을 보고 계십니다.';
    }
}