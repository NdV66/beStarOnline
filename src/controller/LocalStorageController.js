const autoSaveKey = 'beStarAutoSave';
const textKey = 'beStarText';

const saveText = (textToSave) =>  localStorage.setItem(textKey, textToSave);
const removeText = () => localStorage.removeItem(textKey);
const getAutoSave = () => JSON.parse(localStorage.getItem(autoSaveKey));
const setAutoSave = (option) => localStorage.setItem(autoSaveKey, option);

const getText = () => {
    const text = localStorage.getItem(textKey);
    return text ? text : '';
};

const localStorageController = {
    saveText,
    removeText,
    getText,
    getAutoSave,
    setAutoSave
};

export default localStorageController;
