this.encode = function (inputText) {

    async function digestMessage(message) {
        const msgUint8 = new TextEncoder().encode(message);                           // кодировка (utf-8)
        const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);           // хешировать сообщение
        const hashArray = Array.from(new Uint8Array(hashBuffer));                     // преобразовать в байтовый массив
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // преобразовать байты в шестнадцатеричную строку
        return hashHex;
    }

    (async function () {
        textOut.value = await digestMessage(inputText);
    })();

    return this;
};



//Вызов функции
document.querySelector('#encodeButton').addEventListener('click', () => {
    encode(inputText.value);
});


//Чтение из файла
function readFileEncode(input) {
    let file = input.files[0];

    let reader = new FileReader();

    reader.readAsText(file);

    reader.onload = function () {
        inputText.value = reader.result;
    };

    reader.onerror = function () {
        inputText.value = reader.error;
    };
}

