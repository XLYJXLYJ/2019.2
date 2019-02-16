/**
 * 解密
 * @param str
 */
function decrypt(str,skey,siv) {
    var key = CryptoJS.enc.Utf8.parse(skey);// 秘钥
    var iv =    CryptoJS.enc.Utf8.parse(siv);//向量iv
    var decrypted = CryptoJS.AES.decrypt(str,key,{iv:iv,padding:CryptoJS.pad.Pkcs7});
    return decrypted.toString(CryptoJS.enc.Utf8);
}