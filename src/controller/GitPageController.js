app.controller('GitPageController', GitPageController);

function GitPageController($scope, GitPageService, GitPageManager) {

    init();
    
    function init(){

        key(0);

        $scope.flag = false;
        $scope.join = false;
        $scope.already = '';
        
        $scope.action = function(send){
            
            if(send === $scope.already) return $scope.send ='';

            if(!$scope.join){
                if(send === 'shell') cmd(send, 0);
            }else{
                if(send === 'cd') cmd(send, 1);
                if(send === 'exit') cmd(send, 2);
                if(send.substr(0, 4) === 'day '){
                    var num = send.substr(4, send.length);
                    cmd(send, 3, num);
                }
            }

            $scope.send ='';
        };
        $scope.sendClick = function(){
            document.getElementById("terminal-send").focus();
        };
    }

   function cmd(send,type, num){
        remove($scope.already);
        $scope.already = send;
        switch(type){
            case 0: shell(); break;
            case 1: main(); break;
            case 2: exit(); break;
            case 3: day(num); break;
            default :break;
        }
    }

    function remove(already){
        if(already === 'shell' || already === 'cd'){
            $scope.viewNotice = false;
            $scope.notice = null;
        }
        if(already.substr(0, 4) === 'day '){
            $scope.viewDairy = false;
            $scope.day  = null;
            $scope.readHint =null;
        }
    }

    function shell(){
        key(1);
        $scope.join = true;
        notice();
    }
    function main(){
        notice();
    }
    function exit(){
        key(0);
        $scope.join = false;
    }
    function notice(){
        $scope.viewNotice = true;
        GitPageService.json('config/notice.json').then(function(data){
            $scope.notice =data;
        });
        command(1);
    }
    function day(num){
        $scope.viewDairy = true;
        $scope.readDay = num;
        $scope.readHint = GitPageService.readHint(num);
        GitPageService.json('day/day'+num+'.json').then(function(data){
            $scope.day =data;
            command(2);
        }, function(reason) {
            cmd('exit', 2);
        });
    }

    function command(type){
        GitPageService.json('config/hint.json').then(function(data){
            $scope.hint =data.main[type];
        });
    }
    
    function key(type){
        var key = GitPageService.key();
        $scope.shell = key.shell[type];
        $scope.cmd = key.cmd[type];
        switch(type){
            case 0:{
                $scope.bg_shell = {'color': key.style.yellow};
                $scope.bg_cmd = {'color': key.style.yellow};
                command(0);
                break;
            }
            case 1:{
                $scope.bg_shell = {'color': key.style.green};
                $scope.bg_cmd = {'color': key.style.green};
                break;			
            }
            default: break;
        }
    }

}