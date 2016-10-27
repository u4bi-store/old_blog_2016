app.controller('GitPageController', GitPageController);

function GitPageController($scope, GitPageService) {
	
	init();
	function init(){
		keyModeManager(0);
		$scope.flag = false;
		$scope.join = false;
		$scope.already = '';
 
		$scope.action = function(cmd){
			var num;
			if(cmd == $scope.already) return $scope.cmd ='';
			if(!$scope.join){
				if(cmd == 'shell') num=0;
			}else{
				if(cmd == 'cd') num=1;
				if(cmd == 'exit') num=2;
				if(cmd == 'day') num=3;
			}
			cmdManager(num, cmd);
			$scope.cmd ='';
		};
	}
//----------------------- manager --------------------------
	function cmdManager(num, cmd){
		removeAlreadyCMD($scope.already);
		$scope.already = cmd;
		switch(num){
			case 0: shell(); break;
			case 1: main(); break;
			case 2: exit(); break;
			case 3: day(); break;
			default :break;
		}
	}
	function removeAlreadyCMD(cmd){
		if(cmd == 'shell' || cmd == 'cd'){
			$scope.viewNotice = false;
			$scope.notice = null;
		}
		if(cmd == 'day'){
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
		$scope.notice = parser('/config/notice.json');
	}
	function day(){
		$scope.viewDairy = true;
		$scope.day = parser('/day/day1.json');
	}

//----------------------- stock --------------------------

	function parser(path){
		var q = GitPageService.json(path);
		q.then(function(data){
			return data;
		});
	}

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