(function () {

	/*
	 * クラス
	 */

	// 名前をスキルをセットで持たせるためのデータクラス
	class SkillTagData {
		constructor(userName, skillTag1, skillTag2, skillTag3, linkToSkillTag1, linkToSkillTag2, linkToSkillTag3) {
			this.userName = userName
			this.skillTag1 = skillTag1
			this.skillTag2 = skillTag2
			this.skillTag3 = skillTag3
			this.linkToSkillTag1 = linkToSkillTag1
			this.linkToSkillTag2 = linkToSkillTag2
			this.linkToSkillTag3 = linkToSkillTag3
		}
	}

	/*
	 * 関数
	 */

	// 新しいメッセージの受信、または古いログの読み込みによって
	// このコールバック関数が呼び出される。
	// チャットの名前の横にある投稿時刻のDOM要素を探し出し、
	// その要素の後ろにスキルタグを追加する。
	function callbackForInsertSkillTags(chatLogs, skillTagDataList) {

		for (let e of chatLogs) {
			// 読み込みボタンなどが混在しているので、チャットログだけになるようにフィルタ
			// また2回スキルタグを追加してしまわないように回避
			if (e.className === 'nF6pT AnmYv' && e.getElementsByClassName('div.google-chat-profile-viewer').length === 0) {

				skillTagData = getOnesSkill(skillTagDataList, e.getElementsByClassName('njhDLd')[0].textContent /*チャットに表示される名前*/)

				if (skillTagData) {
					e.getElementsByClassName('NGoCob SAS2Ne' /* チャットの名前の横にある投稿時刻のクラス */)[0]
						.insertAdjacentHTML('afterend',
							'<div class="google-chat-profile-viewer my-d-flex mb-10px">' +
								'<div class="truncateIfTooLong"><a class="ml-5pc" href="' + skillTagData.linkToSkillTag1 + '">#' + skillTagData.skillTag1 + '</a></div>' +
								'<div class="truncateIfTooLong"><a class="ml-5pc" href="' + skillTagData.linkToSkillTag2 + '">#' + skillTagData.skillTag2 + '</a></div>' +
								'<div class="truncateIfTooLong"><a class="ml-5pc" href="' + skillTagData.linkToSkillTag3 + '">#' + skillTagData.skillTag3 + '</a></div>' +
							'</div>')
				}

			}
		}
	}

	// 村民スキルシートからスキル一覧を取得して返す
	// 通信あり
	// 今はモック
	function getSkillTagDataList() {
		const skillTagDataList = 
			[
				new SkillTagData(
					"Takaaki Murakami",
					"Angularを始めとしたフロントエンド技術",
					"Javaを用いたサーバーサイド",
					"ネコ",
					"#!",
					"#!",
					"#!"
					)
			]
		return skillTagDataList
	}

	// 村民スキルシートから取得した一覧データとチャットに表示されているユーザー名が合致したら、
	// その人のスキルを返す
	function getOnesSkill(skillTagDataList, username) {
		const skillTagData = skillTagDataList.filter(e => e.userName === username)
		return skillTagData[0]
	}

	// 初回に一度だけ実行し、画面読み込み後チャットログにスキルタグを挿入する。
	function init(parentOfAllChatDOM, skillTagDataList) {
		callbackForInsertSkillTags(parentOfAllChatDOM.children, skillTagDataList)
	}

	// チャットログを監視し、新しいチャットログが表示されたらスキルタグを挿入する。
	function subscribe(parentOfAllChatDOM, skillTagDataList) {
		// オブザーバーの作成
		// @doc https://developer.mozilla.org/ja/docs/Web/API/MutationObserver
		const observer = new MutationObserver(
			function(mutations) {
				callbackForInsertSkillTags(mutations[0].target.children, skillTagDataList)	
			})

		// 監視の開始
		observer.observe(parentOfAllChatDOM, {
			childList: true
		})
	}

	/*
	 * メイン処理
	 */

	// 監視ターゲット（チャットの親DOM）の取得
	const parentOfAllChatDOM = document.querySelector("div.jGyvbd.GVSFtd")
	// 村民スキルシートからスキルタグのデータ一覧を取得
	const skillTagDataList = getSkillTagDataList()

	init(parentOfAllChatDOM, skillTagDataList)
	subscribe(parentOfAllChatDOM, skillTagDataList)

}());