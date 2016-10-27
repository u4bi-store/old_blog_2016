app.factory('GitPageService', GitPageService);

function GitPageService(){
    return {
		'flag'  : flag,
		'notice': notice,
		'diary' : diary,
		'key' : key
    }

    function flag(bool){
		return !bool;
	}

	function notice(type){
		var noticeArray = [
			'안녕하세요. 이곳은 U4BI님의 깃헙 페이지입니다.',
			'주인장의 소소한 필기 끄적임이 담겨지는 작은 공간입니다. 개발자 코딩일기',
			'오늘도 많이 배우셨나요?',
			'사람은 하루에 한가지 이상을 꼭 배운다고 합니다. 당신이 오늘 아무것도 하지 않았다하거늘, 오늘도 무언가를 배웠음은 틀림 없을거에요.',
			'잘 생각해보세요! 오늘 하루 나는 무엇을 배웠나.',
			'저는 오늘 이런걸 배우고 이런걸 느꼈어요.',
			'',		
		];	
		return noticeArray;
	}
	
	function diary(){
		var diaryArray = {
			year : 2016,
			month : 10,
			day : 25,
			hour : 11,
			min :	41,
			title : '첫 깃헙 페이지 장식을 해보았다.',		
			content : '생각외로 뿌듯하고 아이디어도 좋은거같다. 깃헙은 정말 귀엽다. 그리고 고맙다. 마크다운 문법 아직 익숙하지 않지만 서서히 쓰다보면 늘겠지.',
			til : 	[
						['마크다운 입문... 일단 가볍게 흐름만!', 'https://github.com/u4bi/TIL/blob/b371940524c9cc4526fc6130e94f615e2003f042/Markdown/README.md'],
						['깃헙페이지 만드는법 신기신기', 'https://github.com/u4bi/TIL/blob/b1e217d4214f1cc664223377662b0c3baf30d722/Github/gitpage-setup.md']
					],
			nice : '이제 어느정도 개발자티난다',
			bad : '착잡하면서 진지해진 이 마음 불안한 마음은 없지만 후회할것을 알면서도 택한 이 선택이 올타는 안도감이 드는게 씁쓸하다',
			imp : 'TIL도 일일커밋도 열심히 해보자. 그리고 css 공부 느슨하게라도 시작.. css가 제일 어려운거같다 언젠가 이글을 다시 볼때 웃으며 읽었으면 좋겠다'
			
		}
		return diaryArray;
	}

	function key(){
		var keyArray = {
				shell : ['u4bi','u4bi@localhost'],
				cmd   : ['> ',' / $ '],
				style : { yellow : '#FFFF00', green  : '#00B312', blue   : '#709ECC'}
		};
		return keyArray; 
	}
}