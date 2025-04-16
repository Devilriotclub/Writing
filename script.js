
function showTab(id) {
  document.querySelectorAll('.tab-content').forEach(t => t.style.display = 'none');
  document.getElementById(id).style.display = 'block';
}
function format(cmd) { document.execCommand(cmd, false, null); }
function changeFont(font) { document.execCommand("fontName", false, font); }
function changeFontSize(size) {
  document.execCommand("fontSize", false, "7");
  let fonts = document.getElementById("editor").getElementsByTagName("font");
  for (let el of fonts) {
    if (el.size == "7") el.removeAttribute("size"), el.style.fontSize = size + "px";
  }
}
function changeColor(color) { document.execCommand("foreColor", false, color); }
function highlightText(color) { document.execCommand("hiliteColor", false, color); }
function insertEmoji(emoji) {
  const sel = window.getSelection(), range = sel.getRangeAt(0);
  range.deleteContents(); range.insertNode(document.createTextNode(emoji));
}
function insertImage(e) {
  const file = e.target.files[0], reader = new FileReader();
  reader.onload = evt => {
    const img = document.createElement("img");
    img.src = evt.target.result; img.style.maxWidth = "100%";
    document.getElementById("editor").appendChild(img);
  };
  reader.readAsDataURL(file);
}
function insertLink(url) {
  const sel = window.getSelection();
  if (!sel.rangeCount) return;
  const range = sel.getRangeAt(0);
  const a = document.createElement("a");
  a.href = url; a.target = "_blank"; a.textContent = url;
  range.deleteContents(); range.insertNode(a);
}
function insertTodoList() {
  const ul = document.createElement("ul");
  for (let i = 0; i < 3; i++) {
    const li = document.createElement("li");
    const box = document.createElement("input");
    box.type = "checkbox";
    li.appendChild(box);
    li.appendChild(document.createTextNode(" Aufgabe " + (i + 1)));
    ul.appendChild(li);
  }
  document.getElementById("editor").appendChild(ul);
}
function countWords() {
  const txt = document.getElementById("editor").innerText.trim();
  const count = txt === "" ? 0 : txt.split(/\s+/).length;
  alert("📊 Wörter: " + count);
}
function countParagraphs() {
  const p = document.getElementById("editor").innerText.split(/\n+/).filter(Boolean).length;
  alert("📄 Absätze: " + p);
}
function estimateReadTime() {
  const txt = document.getElementById("editor").innerText.trim();
  const count = txt === "" ? 0 : txt.split(/\s+/).length;
  const minutes = Math.ceil(count / 200);
  alert("⏱️ Geschätzte Lesezeit: " + minutes + " Min.");
}
function toggleComments() {
  const panel = document.getElementById("commentsPanel");
  panel.style.display = panel.style.display === "none" ? "block" : "none";
}
function saveComment() {
  const input = document.getElementById("commentInput");
  if (input.value.trim() === "") return;
  const li = document.createElement("li");
  const txt = document.createTextNode(input.value);
  const del = document.createElement("button");
  del.textContent = "❌"; del.onclick = () => li.remove();
  li.appendChild(txt); li.appendChild(del);
  document.getElementById("commentList").appendChild(li);
  input.value = "";
}
function speakText() {
  const txt = document.getElementById("editor").innerText;
  const utterance = new SpeechSynthesisUtterance(txt);
  speechSynthesis.speak(utterance);
}
function searchInEditor(word) {
  const editor = document.getElementById("editor");
  const text = editor.innerText;
  if (word.trim() === "") {
    editor.innerHTML = text;
    return;
  }
  const regex = new RegExp(`(${word})`, "gi");
  const newText = text.replace(regex, '<mark>$1</mark>');
  editor.innerHTML = newText;
}
function printDocument() { window.print(); }
function saveAsPDF() { alert("💾 PDF-Funktion wird bald ergänzt."); }
function setLanguage(lang) { alert("🌐 Sprache gewechselt zu: " + lang); }


function toggleDarkMode() {
  document.body.classList.toggle("dark");
}


function shareDocument() {
  const text = document.getElementById("editor").innerText;
  if (navigator.share) {
    navigator.share({
      title: "Dark Writing Dokument",
      text: text.slice(0, 500),
      url: window.location.href
    }).then(() => console.log("✅ Geteilt!")).catch(console.error);
  } else {
    alert("Teilen wird auf diesem Gerät nicht unterstützt.");
  }
}

document.querySelectorAll("input[type='number']").forEach(input => {
  input.addEventListener("change", e => {
    const size = parseInt(e.target.value);
    if (!isNaN(size) && size >= 7 && size <= 92) {
      changeFontSize(size);
    }
  });
});


function insertHeader() {
  const header = document.createElement("div");
  const today = new Date().toLocaleDateString("de-DE");
  header.innerHTML = "<hr><strong>📄 Titel des Dokuments</strong><br>Autor: Ben<br>Datum: " + today + "<hr><br>";
  header.style.fontSize = "14px";
  const editor = document.getElementById("editor");
  editor.insertBefore(header, editor.firstChild);
}
