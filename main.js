// Runs hash functions
// turns into base-64 at the end
function RunHashes(source) {
    var tmpSource = source;
    var tmpHash;
    var result;

    for (var i = 0; i < 1000; i++) {
        tmpHash = sha512(tmpSource);
        tmpSource = tmpHash;
    }
    result = btoa(tmpSource);

    return result;
}

// combines the two hashes and adds in symbols
function Create(SSPHash, PhraseHash, passLength) {
    // calculate the seed
    var seed = SSPHash + PhraseHash;

    var result = "";
    var rnd = new Math.seedrandom(seed);
    var special = "~!@#$%^&*()";
    var cap = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var low = "acbdefghijklmnopqrstuvwxyz";
    var num = "1234567890";

    // force a character of every type
    // generate a location for each type to go
    var specialNum = Math.floor(rnd() * 1000000) % passLength;
    var capNum = Math.floor(rnd() * 1000000) % passLength;
    while (capNum == specialNum) {
        capNum = Math.floor(rnd() * 1000000) % passLength;
    }
    var lowNum = Math.floor(rnd() * 1000000) % passLength;
    while (lowNum == specialNum || lowNum == capNum) {
        lowNum = Math.floor(rnd * 1000000) % passLength;
    }
    var numNum = Math.floor(rnd() * 1000000) % passLength;
    while (numNum == specialNum || numNum == capNum || numNum == lowNum) {
        numNum = Math.floor(rnd() * 1000000) % passLength;
    }

    // generate the password
    var random;

    for (var i = 0; i < passLength; i++) {
        random = Math.floor(rnd() * 1000000) % 172; // get a number from 0-171
        // insert the all 4 types at the right positions
        if (i == specialNum) {
            random = Math.floor(rnd() * 1000000) % 11;
            result += special[random];
            random = Math.floor(rnd() * 1000000) % 172;
        }
        else if (i == capNum) {
            random = Math.floor(rnd() * 1000000) % 26;
            result += cap[random];
            random = Math.floor(rnd() * 1000000) % 172;
        }
        else if (i == lowNum) {
            random = Math.floor(rnd() * 1000000) % 26;
            result += low[random];
            random = Math.floor(rnd() * 1000000) % 172;
        }
        else if (i == numNum) {
            random = Math.floor(rnd() * 1000000) % 10;
            result += num[random];
            random = Math.floor(rnd() * 1000000) % 172;
        }
        // even
        else if (i % 2 == 0) {
            result += SSPHash[random];
        }
        // odd
        else if (i % 2 == 1) {
            result += PhraseHash[random];
        }
    }
    return result;
}

function Generate() {
    // Super Secure Password
    var SSP = "asdf";

    var Phrase = "test";
    var generated = "";
    
    // Generate password
    generated = Create(RunHashes(SSP), RunHashes(Phrase), 16);
    console.log(generated);
    //GeneratedPassword.Text =  generated;
    //GeneratedPassword.IsVisible = true;
}

// For showing the SSP
function showSSP() {
    var ssp = document.getElementById("SSP");
    var check = document.getElementById("check");
    if (ssp.type === "password") {
        ssp.type = "text";
        check.checked = true;
    } else {
        ssp.type = "password";
        check.checked = false;
    }
}