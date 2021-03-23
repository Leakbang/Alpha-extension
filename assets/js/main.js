document.getElementById("Textbox").addEventListener("input", AutoSave);
document.getElementById("font-size-selector").addEventListener("input", SaveFontSize);
document.getElementById("open-menu").addEventListener("click", OpenSettings);
document.getElementById("close-menu").addEventListener("click", QuitSettings);
document.getElementById("load").addEventListener("click", Load);
document.getElementById("save").addEventListener("click", Save);
document.getElementById("AutoSaveEnabled").addEventListener("click", SaveAutoSaveState);
document.getElementById("DarkModeEnabled").addEventListener("click", ToggleDarkMode);
document.getElementById("version-text").addEventListener("click", OpenAuthorWebsite);

document.getElementById("search").addEventListener("click", SearchQuery);
document.getElementById("search-form").addEventListener("submit", SearchQuery);

document.getElementById("search-menu").addEventListener("click", OpenSearchMenu);
document.getElementById("notes-menu").addEventListener("click", OpenNotesMenu);

window.addEventListener("load", WindowLoaded)

function SearchQuery(event) {
    event.preventDefault();
    var SQuery = "https://duckduckgo.com/?q=" + document.getElementById("search-box").value
    window.location.href = SQuery
}

function OpenAuthorWebsite () {
    window.location.href = "https://github.com/Leakbang/Alpha-extension"
}

function ToggleDarkMode () {
    document.body.classList.toggle("inversion")
    document.getElementById("dark-background").classList.toggle("display-inversion")
    
    var IsDarkModeEnabled = document.getElementById("DarkModeEnabled").checked
    localStorage.setItem("DarkMode", IsDarkModeEnabled)
}

function OpenSearchMenu () {
    document.getElementById("heading").innerHTML = "Search"
    document.getElementById("search-box").value = ""

    document.getElementById("main-notes-container").style.display = "none"
    document.getElementById("main-search-container").style.display = "block"

    localStorage.setItem("LastWindow", "Search")
}

function OpenNotesMenu () {
    document.getElementById("heading").innerHTML = "Notes"

    document.getElementById("main-notes-container").style.display = "block"
    document.getElementById("main-search-container").style.display = "none"

    localStorage.setItem("LastWindow", "Notes")
}

function WindowLoaded() {
    Load();
    QuitSettings();
    InitializeSettings();
    InitializeWindows();
}

function InitializeWindows() {
    if (localStorage.getItem("LastWindow") === null) {
        localStorage.setItem("LastWindow", "Notes")
    } 
    if (localStorage.getItem("LastWindow") == "Notes") {
        OpenNotesMenu();
    }
    else {
        OpenSearchMenu()
    }
}

function SaveFontSize() {
    localStorage.setItem("FontSize", document.getElementById("font-size-selector").value)
    document.getElementById("Textbox").style.fontSize = localStorage.getItem("FontSize")
}

function SaveAutoSaveState() {
    var IsAutoSaveEnabled = document.getElementById("AutoSaveEnabled").checked
    localStorage.setItem("AutoSave", IsAutoSaveEnabled)
}

function InitializeSettings() {
    var childElements = document.getElementById("settings-div").children;
    for (i = 0; i < childElements.length; i++) {
        childElements[i].classList.add("settings-items");
    }
    var FontSize = document.getElementById("font-size-selector").value
    localStorage.setItem("FontSize", FontSize)
    document.getElementById("font-size-selector").value = localStorage.getItem("FontSize")
    document.getElementById("Textbox").style.fontSize = localStorage.getItem("FontSize")

    if (localStorage.getItem("AutoSave") === null) {
        localStorage.setItem("AutoSave", "true");
    }
    document.getElementById("AutoSaveEnabled").checked = localStorage.getItem("AutoSave") == "true";
    if (localStorage.getItem("DarkMode") === null) {
        localStorage.setItem("DarkMode", "false");
    }
    document.getElementById("DarkModeEnabled").checked = localStorage.getItem("DarkMode") == "true";
    
    if (localStorage.getItem("DarkMode") == "true") {
        ToggleDarkMode();
    }

    document.getElementById("version-text").innerHTML = document.getElementById("version-text").innerHTML + browser.runtime.getManifest().version
}


function QuitSettings() {
    document.getElementById("close-menu").style = "display: none;";
    document.getElementById("load").style = "display: block;";
    document.getElementById("save").style = "display: block;";
    document.getElementById("open-menu").style = "display: block;";

    var TextBoxItems = document.getElementsByClassName("textbox-items");
    var i;
    for (i = 0; i < TextBoxItems.length; i++) {
        TextBoxItems[i].style.display = "block";
    }
    var TextBoxItems = document.getElementsByClassName("settings-items");
    var i;
    for (i = 0; i < TextBoxItems.length; i++) {
        TextBoxItems[i].style.display = "none";
    }

}

function OpenSettings() {
    document.getElementById("close-menu").style = "display: block;";
    document.getElementById("load").style = "display: none;";
    document.getElementById("save").style = "display: none;";
    document.getElementById("open-menu").style = "display: none;";

    var TextBoxItems = document.getElementsByClassName("textbox-items");
    var i;
    for (i = 0; i < TextBoxItems.length; i++) {
        TextBoxItems[i].style.display = "none";
    }
    var TextBoxItems = document.getElementsByClassName("settings-items");
    var i;
    for (i = 0; i < TextBoxItems.length; i++) {
        TextBoxItems[i].style.display = "block";
    }
}

function AutoSave() {
    if (document.getElementById('AutoSaveEnabled').checked) {
        Save();
    } else {
        return;
    }
}

function Save() {
    var changedtext = document.getElementById("Textbox").value;
    localStorage.setItem("StoredText", changedtext)
}

function Load() {
    document.getElementById("Textbox").value = localStorage.getItem("StoredText")
}