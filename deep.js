const request = require('request');

const deepl_api_url = 'https://api-free.deepl.com/v2/translate';
const your_api_key = '0763323c-65cf-ea75-be7b-27f292ab90f7:fx';
const source_text = ` I am a hero . `;

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

request.post(params, (error, response, result) => {
    console.log(result.translations[0].text);
});
