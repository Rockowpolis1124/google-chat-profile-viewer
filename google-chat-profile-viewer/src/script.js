/*
 * 関数
 */

// 新しいメッセージの受信、または古いログの読み込みによって
// このコールバック関数が呼び出される。
// mutationsにはチャットDOM要素たちの親となる要素が含まれているため、
// この要素の子要素の子孫からチャットの名前の横にある投稿時刻のDOM要素を探し出し、
// その要素の後ろにスキルタグを追加する。
function callbackForInsertSkillTags(mutations) {

	for (let child of mutations[0].target.children) {
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

/*
 * メイン処理
 */

// TODO
// 村民スプレッドシートの情報を取得する
// const sheet = getSpreadSheet()...

// 監視ターゲットの取得
const parentOfAllChatDOM = document.querySelector("div.jGyvbd.GVSFtd")

// オブザーバーの作成
// @doc https://developer.mozilla.org/ja/docs/Web/API/MutationObserver
const observer = new MutationObserver(callbackForInsertSkillTags)

// 監視の開始
observer.observe(parentOfAllChatDOM, {
	childList: true
})

// FIXME
// 最初にページを開いたときにタグを追加できず、メッセージを送信したり、会話ログ読み込みボタンを押したりして
// はじめてタグを挿入するような仕組みになってしまっている。
// これを初回読み込み時にもちゃんとタグを出すように修正したい。

