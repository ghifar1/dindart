var CryptoJS = require("crypto-js");

class Cryptor {
	hash(text) {
		return CryptoJS.SHA256(text);
	}

	attempt(hash, plain) {
		const plainHash = CryptoJS.SHA256(plain).toString();
        console.log('plainhash = ' + plainHash)
        console.log('hash = ' + hash )
		if (plainHash == hash) {
			return true;
		}

		return false;
	}
}

module.exports = new Cryptor();
