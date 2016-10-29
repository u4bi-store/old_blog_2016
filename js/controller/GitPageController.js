app.controller('GitPageController', GitPageController);

function GitPageController($scope, GitPageService) {
	
	init();

	function init(){
		keyModeManager(0);
		$scope.flag = false;
		$scope.join = false;
		$scope.already = '';
		$scope.action = function(send){
			if(send == $scope.already) return $scope.send ='';
			if(!$scope.join){
				if(send == 'shell') cmdManager(send, 0);
			}else{
				if(send == 'cd') cmdManager(send, 1);
				if(send == 'exit') cmdManager(send, 2);
				if(send.substr(0, 4) == 'day '){
					var num = send.substr(4, send.length);
					cmdManager(send, 3, num);
				}
			}
			$scope.send ='';
		};
	}
//----------------------- manager --------------------------
	function cmdManager(send,type, num){
		removeAlreadyCMD($scope.already);
		$scope.already = send;
		switch(type){
			case 0: shell(); break;
			case 1: main(); break;
			case 2: exit(); break;
			case 3: day(num); break;
			default :break;
		}
	}
	function removeAlreadyCMD(already){
		if(already == 'shell' || already == 'cd'){
			$scope.viewNotice = false;
			$scope.notice = null;
		}
		if(already.substr(0, 4) == 'day '){
			$scope.viewDairy = false;
			$scope.day  = null;
		}
	}

//----------------------- CMD --------------------------
	function shell(){
		keyModeManager(1);
		$scope.join = true;
		notice();
	}
	function main(){
		notice();
	}
	function exit(){
		keyModeManager(0);
		$scope.join = false;
	}
	function notice(){
		$scope.viewNotice = true;
		GitPageService.json('/config/notice.json').then(function(data){
			$scope.notice =data;
		});
	}
	function day(num){
		$scope.viewDairy = true;
		$scope.readDay = parseInt(num);
		GitPageService.json('/day/day'+num+'.json').then(function(data){
			$scope.day =data;
		}, function(reason) {
			cmdManager('exit', 2);
		});
	}

//----------------------- stock --------------------------

	function keyModeManager(type){
		var key = GitPageService.key();
		$scope.shell = key.shell[type];
		$scope.cmd = key.cmd[type];
		switch(type){
			case 0:{
				$scope.bg_shell = {'color': key.style.yellow};
				$scope.bg_cmd = {'color': key.style.yellow};
				break;
			}
			case 1:{
				$scope.bg_shell = {'color': key.style.green};
				$scope.bg_cmd = {'color': key.style.blue};
				break;			
			}
			default: break;
		}
	}

}