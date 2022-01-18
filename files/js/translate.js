let beforeText;
let selFlag;

const runAPI = (n) => {
  if(n === 0) {
    selFlag = 0;
  } else {
    selFlag = 1;
  }
  DeepLAPI();
  GoogleAPI();
}

const DeepLAPI = () => {
  if(selFlag === 0) {
    beforeText = document.getElementById('deepText').value;
  } else {
    document.getElementById("deepText").value = beforeText;
  }
    const req = new XMLHttpRequest();
    req.open('POST', 'http://localhost:3000/deep', true);
    req.setRequestHeader('content-type', 'application/json');
    req.onload = function(e) {
        if (req.readyState === 4) {
            if (req.status === 200) {
                if(req.response !== '') {
                  const afterText = req.response;
                  document.getElementById("deepResult").value = afterText;
                  console.log(beforeText);
                  console.log(req.response);
                } else {
                  console.log('error');
                }
            } else {
              console.error(req.statusText);
            }
        }
    }
    const sendJSON = JSON.stringify({'text': beforeText});
    req.send(sendJSON);
}

const GoogleAPI = () => {
  if(selFlag === 1) {
    beforeText = document.getElementById('googleText').value;
  } else {
    document.getElementById("googleText").value = beforeText;
  }
    const req = new XMLHttpRequest();
    req.open('POST', 'http://localhost:3000/google', true);
    req.setRequestHeader('content-type', 'application/json');
    req.onload = function(e) {
        if (req.readyState === 4) {
            if (req.status === 200) {
                if(req.response !== '') {
                  const afterText = req.response;
                  document.getElementById("googleResult").value = afterText;
                  console.log(beforeText);
                  console.log(req.response);
                } else {
                  console.log('error');
                }
            } else {
              console.error(req.statusText);
            }
        }
    }
    const sendJSON = JSON.stringify({'text': beforeText});
    req.send(sendJSON);
}
