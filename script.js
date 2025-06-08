document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const copyBtn = document.getElementById('copy-btn');
    const passwordOutput = document.getElementById('password-output');

    const charsets = {
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        numbers: '0123456789',
        symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
    };

    generateBtn.addEventListener('click', () => {
        const length = parseInt(document.getElementById('length-select').value);
        const includeUppercase = document.querySelector('input[name="uppercase"]:checked').value === 'yes';
        const includeNumbers = document.querySelector('input[name="numbers"]:checked').value === 'yes';
        const includeSymbols = document.querySelector('input[name="symbols"]:checked').value === 'yes';
        
        let characterPool = charsets.lowercase;
        let guaranteedChars = [];
        
        let passwordArray = Array.from({ length }, () => charsets.lowercase[Math.floor(Math.random() * charsets.lowercase.length)]);
        
        if (includeUppercase) {
            characterPool += charsets.uppercase;
            guaranteedChars.push(charsets.uppercase[Math.floor(Math.random() * charsets.uppercase.length)]);
        }
        if (includeNumbers) {
            characterPool += charsets.numbers;
            guaranteedChars.push(charsets.numbers[Math.floor(Math.random() * charsets.numbers.length)]);
        }
        if (includeSymbols) {
            characterPool += charsets.symbols;
            guaranteedChars.push(charsets.symbols[Math.floor(Math.random() * charsets.symbols.length)]);
        }

        for (let i = 0; i < guaranteedChars.length; i++) {
            passwordArray[i] = guaranteedChars[i];
        }

        for (let i = guaranteedChars.length; i < length; i++) {
            passwordArray[i] = characterPool[Math.floor(Math.random() * characterPool.length)];
        }

        passwordArray.sort(() => Math.random() - 0.5);

        passwordOutput.value = passwordArray.join('');

        copyBtn.innerText = 'Copy';
        copyBtn.style.backgroundColor = '';
        copyBtn.style.color = '';
        copyBtn.style.borderColor = '';
    });

    copyBtn.addEventListener('click', () => {
        const password = passwordOutput.value;
        if (password) {
            navigator.clipboard.writeText(password).then(() => {
                copyBtn.innerText = '✔';
                copyBtn.style.backgroundColor = 'var(--taupe)';
                copyBtn.style.color = 'var(--darkest)';
                copyBtn.style.borderColor = 'var(--taupe)';
            }).catch(err => {
                console.error('Copy failed: ', err);
                alert("Copy failed!");
            });
        }
    });
});
