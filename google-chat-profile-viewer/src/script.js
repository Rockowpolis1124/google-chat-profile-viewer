// TODO
// 村民スプレッドシートの情報を取得する
const sheet; // getSpreadSheet()...

// 名前の要素を取ってくる。
// TODO 
// GoogleChatは画面の初回ロード時にある程度のチャットログを画面に描画するようだが、
// すべてではなく、(99+)というようなログ読み込みボタンを押下しないと少し古いログが取れない仕様になっている。
// ただどうも通信を監視する限り、ログは通信で取得しているわけではないようである
// RxJSを使うなりしてチャットログが増えたかどうかを監視し、増えたらその要素にタグを追加する形を取りたいが
// どうやって作るのだかよくわからない😿
const nameTags = document.querySelectorAll("span.Z4BnXb > span.njhDLd")

// TODO スプレッドシートのスキル1 ~ 3までを名前の後に表示したい。
// リンク先はスプレッドシートのその内容が入っているセルとする。
for (let e of nameTags) {
	e.insertAdjacentHTML(
		'afterend',
		'<a class="ml-10" ref="#!">#tag1</a>' + 
		'<a class="ml-10" href="#!">#tag2</a>' +
		'<a class="ml-10" href="#!">#tag3</a>')
}