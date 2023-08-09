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

function dots(passLength) {
    var result = "";
    for (var i = 0; i < passLength; i++) {
        result += "•"
    }
    return result;
}

function generate() {
    // Super Secret Password
    var SSP = document.getElementById("SSP").value;

    var Phrase = document.getElementById("Phrase").value;
    var passLength = 16;
    var generated = ""
    
    // Generate password
    generated = Create(RunHashes(SSP), RunHashes(Phrase), passLength);

    // make room on the form element for the password section
    form = document.getElementById("form");
    if (window.innerWidth > 1000) {
        form.setAttribute("style","height:680px");
    } else {
        form.setAttribute("style","height:1200px");
    }

    // set the generated password
    document.getElementById("password").innerHTML = dots(passLength);
    document.getElementById("actualPassword").value = generated;

    // Make the password section visible
    document.getElementById("passwordLabel").setAttribute("style","visibility:visible");
    document.getElementById("password").setAttribute("style","visibility:visible");
    document.getElementById("checkPass" ).setAttribute("style","visibility:visible");
    document.getElementById("passSpan").setAttribute("style","visibility:visible");
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

function copyPassword() {
    // Get the text field
    var copyText = document.getElementById("actualPassword");

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);

    var popup = document.getElementById("myPopup");
    popup.setAttribute("style","visibility:visible");;

    setTimeout(function() {
        popup.classList.toggle("hide");
    }, 10000);
    setTimeout(function() {
        navigator.clipboard.writeText("");
        popup.setAttribute("style","visibility:hidden");
    }, 11000);
}

function showPassword() {
    var password = document.getElementById("password");
    var check = document.getElementById("checkPass");
    var actualPass = document.getElementById("actualPassword");
    if (password.innerText[0] == "•") {
        password.innerHTML = actualPass.value;
        check.checked = true;

        var timeout = setTimeout(function() {
            password.innerHTML = dots(password.innerHTML.length);
            check.checked = false;
        }, 60000);
    } else {
        password.innerHTML = dots(password.innerHTML.length);
        check.checked = false;
    }
}

function drag (e) {
    var actualPass = document.getElementById("actualPassword");
    e.dataTransfer.setData('text', actualPass.value);
}