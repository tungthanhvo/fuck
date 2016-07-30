function randomPass() {
    var self = this;
    //Fisher–Yates shuffle
    function shuffle(stringPass) {
            var parts = stringPass.split('');
            for (var i = parts.length; i > 0;) {
                var random = parseInt(Math.random() * i);
                var temp = parts[--i];
                parts[i] = parts[random];
                parts[random] = temp;
            }
            return parts.join('');
        }
        // Generate random password
    self.generatePass = function() {
        var specialChar = '!@#$%^&';
        var numChar = '1234567890';
        var capChar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var charSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&';
        var randomString = '';
        for (var i = 0; i < 5; i++) {
            var c = Math.floor(Math.random() * charSet.length);
            randomString += charSet.charAt(c);
        }
        randomString += specialChar.charAt(Math.random() * specialChar.length);
        randomString += numChar.charAt(Math.random() * numChar.length);
        randomString += capChar.charAt(Math.random() * capChar.length);
        return shuffle(randomString);
    }
}
module.exports = randomPass;