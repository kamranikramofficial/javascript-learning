// DOM elements
const rowsInput = document.getElementById('rows');
const columnsInput = document.getElementById('columns');
const headerCheckbox = document.getElementById('header');
const borderStyleSelect = document.getElementById('border-style');
const borderWidthInput = document.getElementById('border-width');
const cellPaddingInput = document.getElementById('cell-padding');
const headerBgInput = document.getElementById('header-bg');
const borderColorInput = document.getElementById('border-color');
const evenRowBgInput = document.getElementById('even-row-bg');
const oddRowBgInput = document.getElementById('odd-row-bg');
const textAlignSelect = document.getElementById('text-align');
const generateBtn = document.getElementById('generate-btn');
const resetBtn = document.getElementById('reset-btn');
const tablePreview = document.getElementById('table-preview');
const htmlCode = document.getElementById('html-code');
const cssCode = document.getElementById('css-code');
const copyHtmlBtn = document.getElementById('copy-html-btn');
const copyCssBtn = document.getElementById('copy-css-btn');

// Generate the table
function generateTable() {
    const rows = parseInt(rowsInput.value) || 3;
    const columns = parseInt(columnsInput.value) || 3;
    const includeHeader = headerCheckbox.checked;
    const borderStyle = borderStyleSelect.value;
    const borderWidth = borderWidthInput.value;
    const cellPadding = cellPaddingInput.value;
    const headerBg = headerBgInput.value;
    const borderColor = borderColorInput.value;
    const evenRowBg = evenRowBgInput.value;
    const oddRowBg = oddRowBgInput.value;
    const textAlign = textAlignSelect.value;

    // Generate unique table ID
    const tableId = 'generated-table-' + Date.now();

    // Generate HTML
    let tableHtml = `<table id="${tableId}" class="generated-table">\n`;
    
    // Add header row if checked
    if (includeHeader) {
        tableHtml += '  <thead>\n    <tr>\n';
        for (let j = 0; j < columns; j++) {
            tableHtml += `      <th>Header ${j + 1}</th>\n`;
        }
        tableHtml += '    </tr>\n  </thead>\n';
    }
    
    // Add table body
    tableHtml += '  <tbody>\n';
    for (let i = 0; i < rows; i++) {
        tableHtml += '    <tr>\n';
        for (let j = 0; j < columns; j++) {
            tableHtml += `      <td>Row ${i + 1}, Col ${j + 1}</td>\n`;
        }
        tableHtml += '    </tr>\n';
    }
    tableHtml += '  </tbody>\n</table>';
    
    // Generate CSS
    let tableCss = `/* Table Styles */\n#${tableId} {\n`;
    tableCss += `  width: 100%;\n`;
    tableCss += `  border-collapse: collapse;\n`;
    tableCss += `  margin: 25px 0;\n`;
    tableCss += `  font-size: 0.9em;\n`;
    tableCss += `  font-family: sans-serif;\n`;
    tableCss += `  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);\n`;
    tableCss += `}\n\n`;
    
    if (includeHeader) {
        tableCss += `#${tableId} thead tr {\n`;
        tableCss += `  background-color: ${headerBg};\n`;
        tableCss += `  color: #ffffff;\n`;
        tableCss += `  text-align: ${textAlign};\n`;
        tableCss += `}\n\n`;
        
        tableCss += `#${tableId} th {\n`;
        tableCss += `  padding: ${cellPadding}px;\n`;
        tableCss += `}\n\n`;
    }
    
    tableCss += `#${tableId} td {\n`;
    tableCss += `  padding: ${cellPadding}px;\n`;
    tableCss += `  text-align: ${textAlign};\n`;
    tableCss += `}\n\n`;
    
    if (borderStyle !== 'none') {
        tableCss += `#${tableId} th, #${tableId} td {\n`;
        tableCss += `  border: ${borderWidth}px ${borderStyle} ${borderColor};\n`;
        tableCss += `}\n\n`;
    }
    
    tableCss += `#${tableId} tbody tr {\n`;
    tableCss += `  border-bottom: ${borderWidth}px ${borderStyle} ${borderColor};\n`;
    tableCss += `}\n\n`;
    
    tableCss += `#${tableId} tbody tr:nth-of-type(even) {\n`;
    tableCss += `  background-color: ${evenRowBg};\n`;
    tableCss += `}\n\n`;
    
    tableCss += `#${tableId} tbody tr:nth-of-type(odd) {\n`;
    tableCss += `  background-color: ${oddRowBg};\n`;
    tableCss += `}\n\n`;
    
    tableCss += `#${tableId} tbody tr:last-of-type {\n`;
    tableCss += `  border-bottom: ${borderWidth * 2}px ${borderStyle} ${borderColor};\n`;
    tableCss += `}\n`;
    
    // Update the preview
    tablePreview.innerHTML = tableHtml;
    
    // Apply the CSS to the preview
    const styleEl = document.createElement('style');
    styleEl.textContent = tableCss;
    document.head.appendChild(styleEl);
    
    // Update code display
    htmlCode.textContent = tableHtml;
    cssCode.textContent = tableCss;
}

// Reset all form values to defaults
function resetForm() {
    rowsInput.value = 3;
    columnsInput.value = 3;
    headerCheckbox.checked = true;
    borderStyleSelect.value = 'solid';
    borderWidthInput.value = 1;
    cellPaddingInput.value = 8;
    headerBgInput.value = '#f2f2f2';
    borderColorInput.value = '#dddddd';
    evenRowBgInput.value = '#ffffff';
    oddRowBgInput.value = '#f9f9f9';
    textAlignSelect.value = 'left';
    
    // Clear preview and code
    tablePreview.innerHTML = '';
    htmlCode.textContent = '';
    cssCode.textContent = '';
}

// Copy text to clipboard
function copyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
}

// Event listeners
generateBtn.addEventListener('click', generateTable);
resetBtn.addEventListener('click', resetForm);

copyHtmlBtn.addEventListener('click', function() {
    copyToClipboard(htmlCode.textContent);
    this.textContent = 'Copied!';
    setTimeout(() => { this.textContent = 'Copy HTML'; }, 2000);
});

copyCssBtn.addEventListener('click', function() {
    copyToClipboard(cssCode.textContent);
    this.textContent = 'Copied!';
    setTimeout(() => { this.textContent = 'Copy CSS'; }, 2000);
});

// Generate table on load
generateTable();
