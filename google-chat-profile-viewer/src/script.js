/*
 * 関数
 */

// 新しいメッセージの受信、または古いログの読み込みによって
// このコールバック関数が呼び出される。
// mutationsにはチャットDOM要素たちの親となる要素が含まれているため、
// この要素の子要素の子孫からチャットの名前の横にある投稿時刻のDOM要素を探し出し、
// その要素の後ろにスキルタグを追加する。
function callbackForInsertSkillTags(parentOfAllChatDOM) {

	for (let child of parentOfAllChatDOM.children) {
		// mutationsの直下にはチャットDOMだけでなく他の要素も交じっている
		// またチャットDOMの子孫に既にスキルタグを追加している場合もあるため、そのような場合はスキルタグを追加しない。

		if (child.className === 'nF6pT AnmYv' && child.getElementsByClassName('google-chat-profile-viewer').length === 0) {

			child.getElementsByClassName('dAxhmf' /* チャットの名前の横にある投稿時刻のDOM要素が持つクラス */)[0]
				.insertAdjacentHTML('afterend',
					'<div class="google-chat-profile-viewer">' +
						'<a class="ml-10" href="#!">#tag1</a>' + /* TODO ここにはスプレッドシートから取ってきたスキルを入れ込む。その文字列の改行は消しておく。 */
						'<a class="ml-10" href="#!">#tag2</a>' +
						'<a class="ml-10" href="#!">#tag3</a>' +
					'</div>')
		}
	}
}

// 初回に一度だけ実行し、画面読み込み後チャットログにスキルタグを挿入する。
function init(parentOfAllChatDOM) {
	const a = [parentOfAllChatDOM]
	callbackForInsertSkillTags(parentOfAllChatDOM)
}

// チャットログを監視し、新しいチャットログが表示されたらスキルタグを挿入する。
function main(parentOfAllChatDOM) {

	// TODO
	// 村民スプレッドシートの情報を取得する
	// const sheet = getSpreadSheet()...

	// オブザーバーの作成
	// @doc https://developer.mozilla.org/ja/docs/Web/API/MutationObserver
	const observer = new MutationObserver(
		function(mutations) {
			callbackForInsertSkillTags(mutations[0].target)	
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

init(parentOfAllChatDOM)
main(parentOfAllChatDOM)