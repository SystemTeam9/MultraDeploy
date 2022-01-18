let textFieldNum = 1;       // 現在の翻訳欄の数
const container = document.getElementById("addTextField");      // 翻訳欄の親要素
let engText = "";       // 翻訳語の英語テキスト
let jpText = "";        // 再翻訳語の日本語テキスト
let rewriteFlag = 0;        // 英語表示時は0, 日本語表示時は1

window.onload = () => {
    createId();
}

// 翻訳欄の追加
const addButtonHandle = () => {
    if(textFieldNum == 15) {
        alert("これ以上増やせません");
        return;
    }
    const newTextField = container.lastElementChild.cloneNode(true);        // 最後の子要素を複製
    container.appendChild(newTextField);        // 複製した要素の追加
    textFieldNum++;
    createId();
    document.getElementById("T" + (textFieldNum-1)).value = "";       // 複製後の翻訳欄のテキストを削除
    document.getElementById("aT" + (textFieldNum-1)).value = "";       // 複製後の翻訳欄のテキストを削除
}

// 翻訳欄の削除
const deleteButtonHandle = (buttonElements) => {
    console.log("textFieldNum: "+ textFieldNum);
    if(textFieldNum == 1) {
        alert("これ以上削除できません");
        return;
    }
    textFieldNum--;
    container.removeChild(container.children[buttonElements.id]);       // 押されたボタンのidを配列番号として要素を削除
    createId();
}

// 翻訳の実行
const DeepLAPI = (yaziElements) => {
    const req = new XMLHttpRequest();
    const beforeText = document.getElementById("T" + yaziElements.id).value;
    req.open('POST', 'http://localhost:3000/deep', true);
    req.setRequestHeader('content-type', 'application/json');
    req.onload = function(e) {
        if (req.readyState === 4) {
            if (req.status === 200) {
                if(req.response !== '') {
                engText = req.response;
                document.getElementById("aT" + yaziElements.id).value = engText;
                DeepLJP(engText, "aT" + yaziElements.id);
                console.log("翻訳元" + beforeText);
                console.log("翻訳" + engText);
                } else {
                console.log('error');
                }
            console.error(req.statusText);
            }
        }
    }
    const sendJSON = JSON.stringify({'text': beforeText});
    req.send(sendJSON);
  }

// 再翻訳の実行
const DeepLJP = (text, id) => {
    const req = new XMLHttpRequest();
    const sourceText = text;
    req.open('POST', 'http://localhost:3000/deep_jp', true);
    req.setRequestHeader('content-type', 'application/json');
    req.onload = function(e) {
        if (req.readyState === 4) {
            if (req.status === 200) {
                if(req.response !== '') {
                jpText = req.response;
                console.log("再翻訳: " + jpText);
                console.log("-----------------------------------------");
                } else {
                console.log('error');
                }
            console.error(req.statusText);
            }
        }
    }
    const sendJSON = JSON.stringify({'text': sourceText});
    req.send(sendJSON);
}

// 英語と日本語の切り替え
const rewriteLang = (textAreaEle) => {
    if(rewriteFlag === 0) {
        document.getElementById(textAreaEle.id).value = jpText;
        rewriteFlag = 1;
    } else {
        document.getElementById(textAreaEle.id).value = engText;
        rewriteFlag = 0;
    }
}

  // クローンするノードのエレメントに対してにidを設定
const createId = () => {
    const classButton = document.getElementsByClassName("trash");
    const classTextField = document.getElementsByClassName("textlines");
    const classTextField1 = document.getElementsByClassName("textlines1");
    const classYazi = document.getElementsByClassName("yazi");
    for(let i=0; i < textFieldNum; i++) {
        classButton[i].setAttribute("id", i);       // ボタンにidを後から付与する
        classTextField[i].setAttribute("id", "T"+i);        // 左テキストエリアにidを後から付与する
        classTextField1[i].setAttribute("id", "aT"+i);      // 左テキストエリアにidを後から付与する
        classYazi[i].setAttribute("id", i);      // 翻訳ボタンにidを付与する
    }
}

const movePage = () => {
    location.href = "./translate.html"
  }
