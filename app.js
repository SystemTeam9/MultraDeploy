const express = require('express');
const request = require('request');
const app = express();
let deepLTranslated_eng;
let deepLTranslated_jp;
let googleTranslated;

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./files'));

app.post('/deep', (req, res, next) => {
  const deepl_api_url = 'https://api-free.deepl.com/v2/translate';
  const your_api_key = '0763323c-65cf-ea75-be7b-27f292ab90f7:fx';
  const source_text = String(req.body.text).replace(/[\n\r]/g,"");

  const params = {
      url: deepl_api_url,
      method: 'POST',
      headers: {
          'content-type': 'application/x-www-form-urlencoded'
      },
      form: {
          auth_key: your_api_key,
          text: source_text,
          source_lang: 'EN',
          target_lang: 'JA'
      },
      json: true
  }
  request.post(params, (err, req, res) => {
    deepLTranslated_eng = res.translations[0].text;
  });

  res.setHeader('Content-Type', 'text/plain');
  res.send(deepLTranslated_eng);
});

app.post('/deep_jp', (req, res, next) => {
    const deepl_api_url = 'https://api-free.deepl.com/v2/translate';
    const your_api_key = '0763323c-65cf-ea75-be7b-27f292ab90f7:fx';
    const source_text = String(req.body.text).replace(/[\n\r]/g,"");

    const params = {
        url: deepl_api_url,
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        form: {
            auth_key: your_api_key,
            text: source_text,
            source_lang: 'JA',
            target_lang: 'EN'
        },
        json: true
    }

    request.post(params, (err, req, res) => {
          deepLTranslated_jp = res.translations[0].text;
    });

  res.setHeader('Content-Type', 'text/plain');
  res.send(deepLTranslated_jp);
});


app.post('/google', (req, res, next) => {
  const googleTrans_url = 'https://script.google.com/macros/s/AKfycbyqEF7YmNLF1-faYN7SxYnBZQOAGqQCP__4gfPaanrXhc7eVc4h364W8cUmzPLO8eN5wQ/exec';
  const source_text = String(req.body.text).replace(/[\n\r]/g,"");
  const params = {
      url: googleTrans_url + "?text=" + source_text + "&source=" + "en" + "&target=" + "ja",
      method: 'GET',
    };

    request.get(params, (err, req, res) => {
      googleTranslated = JSON.parse(res).text;
  });

  res.setHeader('Content-Type', 'text/plain');
  res.send(googleTranslated);
});


app.listen(3000, () => console.log('listening on port 3000'));
