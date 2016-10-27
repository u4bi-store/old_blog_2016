app.controller('GitPageController', GitPageController);

function GitPageController($scope, GitPageService) {
	
	init();
	function init(){
		keyModeManager(0);
		$scope.flag = false;
		$scope.join = false;
		$scope.already = '';
 
		$scope.action = function(keyType){
			var cmd = keyType;
			if(cmd == $scope.already) return $scope.keyType ='';
			if(!$scope.join){
				if(cmd == 'shell') cmdManager(0);
			}else{
				if(cmd == 'cd') cmdManager(1);
				if(cmd == 'exit') cmdManager(2);
				if(cmd == 'diary') cmdManager(3);
			} 
			$scope.keyType ='';
		};
	}
//----------------------- manager --------------------------
	function cmdManager(num){
		removeAlreadyCMD($scope.already);
		switch(num){
			case 0: shell(); break;
			case 1: main(); break;
			case 2: exit(); break;
			case 3: diary(); break;
			default :break;
		}
	}
	function removeAlreadyCMD(cmd){
		if(cmd == 'shell' || cmd == 'cd'){
			$scope.viewNotice = false;
			$scope.notice = null;
		}
		if(cmd == 'diary'){
			$scope.viewDairy = false;
			$scope.diary  = null;
		}
	}

//----------------------- CMD --------------------------
	function shell(){
		$scope.already = 'shell';
		keyModeManager(1);
		$scope.join = true;
		notice();
	}
	function main(){
		$scope.already = 'cd';
		notice();
	}
	function exit(){
		$scope.already = 'exit';
		keyModeManager(0);
		$scope.join = false;
	}
	function notice(){
		$scope.viewNotice = true;
		$scope.notice = GitPageService.notice();	
	}
	function diary(){
		$scope.already = 'diary';
		$scope.viewDairy = true;
		$scope.diary = GitPageService.diary();
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