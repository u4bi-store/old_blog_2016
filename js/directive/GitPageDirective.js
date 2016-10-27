function layout(){
	return{
		templateUrl: function(element, attrs) {
			return 'views/'+attrs.type+'.html';
		}
	}
}
function template(){
	return{
		templateUrl: function(element, attrs) {
			return 'views/template/'+attrs.type+'.html';
		}
	}
}
app.directive('layout',layout);
app.directive('template',template);