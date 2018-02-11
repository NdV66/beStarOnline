const localStorageController = (() => {
    const autoSaveKey = "beStarAutoSave";
    const textKey = "beStarText";
    const shouldTextBeLoaded = "beStarShouldTextBeLoaded";

    const saveText = (textToSave) =>  localStorage.setItem(textKey, textToSave);
    const removeText = () => localStorage.removeItem(textKey);
    const getAutoSave = () => JSON.parse(localStorage.getItem(autoSaveKey));
    const setAutoSave = (option) => localStorage.setItem(autoSaveKey, option);

    function getText() {
        const text = localStorage.getItem(textKey);
        return text ? text : '';
    }

    return {
        saveText,
        removeText,
        getText,
        getAutoSave,
        setAutoSave
    };
})();

export default localStorageController;