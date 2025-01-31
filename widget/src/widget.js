// Dynamically create widget button
(function () {
    let widgetBtn = document.createElement("button");
    widgetBtn.innerText = "Summarize AI";
    widgetBtn.id = "summarize-ai-widget-btn";
    widgetBtn.style = "position:fixed;bottom:20px;right:20px;padding:10px 15px;background:#007bff;color:white;border:none;border-radius:5px;cursor:pointer;z-index:1000;";
    document.body.appendChild(widgetBtn);

    // Click event to open modal
    widgetBtn.onclick = function () {
        let widgetModal = document.getElementById("summarize-ai-widget-modal");
        if (!widgetModal) {
            createWidgetModal();
        } else {
            widgetModal.style.display = "block";
        }
    };
})();

// Function to create the widget modal
function createWidgetModal() {
    let modal = document.createElement("div");
    modal.id = "summarize-ai-widget-modal";
    modal.style = "position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:white;padding:20px;width:300px;border-radius:5px;box-shadow:0 0 10px rgba(0,0,0,0.1);z-index:1000;";

    modal.innerHTML = `
        <h3>AI Summarizer</h3>
        <textarea id="summarize-text" placeholder="Enter text here" style="width:100%;height:80px;"></textarea>
        <input type="file" id="pdf-upload" accept=".pdf">
        <button id="summarize-btn" style="margin-top:10px;width:100%;">Summarize</button>
        <p id="summary-result"></p>
        <h4>Generate Questions</h4>
        <button id="generate-questions-btn" style="width:100%;">Generate</button>
        <ul id="question-list"></ul>
        <button onclick="document.getElementById('summarize-ai-widget-modal').style.display='none'">Close</button>
    `;

    document.body.appendChild(modal);

    // Event Listeners
    document.getElementById("summarize-btn").addEventListener("click", summarizeText);
    document.getElementById("generate-questions-btn").addEventListener("click", generateQuestions);
}

// Fetch summary
async function summarizeText() {
    const text = document.getElementById("summarize-text").value;
    const pdfFile = document.getElementById("pdf-upload").files[0];

    let formData = new FormData();
    formData.append("text", text);
    if (pdfFile) formData.append("pdfUrl", URL.createObjectURL(pdfFile));

    const response = await fetch("https://yourdomain.com/api/widget/summarize", {
        method: "POST",
        body: formData
    });

    const data = await response.json();
    document.getElementById("summary-result").innerText = data.summary || "No summary available.";
}

// Fetch generated questions
async function generateQuestions() {
    const text = document.getElementById("summarize-text").value;

    const response = await fetch("https://yourdomain.com/api/widget/generate-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
    });

    const data = await response.json();
    const questionList = document.getElementById("question-list");
    questionList.innerHTML = "";
    data.questions.forEach(q => {
        let li = document.createElement("li");
        li.innerText = q;
        questionList.appendChild(li);
    });
}
