export function useGenerateUniqueID(length = 12, hasNumber = true, hasSpecialCharacter = false) {
    let id = '';
    let characters = 'abcdefghijklmnopqrstuvwxyz';
    if (hasNumber)
        characters += '0123456789';
    if (hasSpecialCharacter)
        characters += '-/?$%#@!^&*()_+';
    for (let i = 0; i < length; i++) {
        id += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return id;
}
//# sourceMappingURL=useGenerateUniqueID.js.map