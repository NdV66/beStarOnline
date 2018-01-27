const localStorageController = (() => {
    const autoSaveKey = "beStarAutoSave";
    const textKey = "beStarText";
    const shouldTextBeLoaded = "beStarShouldTextBeLoaded";

    function setLoadText(option) {
        localStorage.setItem(shouldTextBeLoaded, option);
    }

    function getLoadText() {
        return JSON.parse(localStorage.getItem(shouldTextBeLoaded));
    }

    function saveText(textToSave){
        localStorage.setItem(textKey, textToSave);
    }

    function removeText() {
        localStorage.removeItem(textKey);
    }

    function getText() {
        let text = localStorage.getItem(textKey);
        return text ? text : '';
    }

    function getAutoSave() {
        return JSON.parse(localStorage.getItem(autoSaveKey));
    }

    function setAutoSave(option) {
        localStorage.setItem(autoSaveKey, option);
    }

    return {
        saveText,
        removeText,
        getText,
        getAutoSave,
        setAutoSave,
        setLoadText,
        getLoadText
    };
})();

export default localStorageController;