document.addEventListener('DOMContentLoaded', function() {
    // Add a test message to confirm JS is working
    document.getElementById('excel-data').innerHTML = '<p>JavaScript is loading. Attempting to read Excel file...</p>';
    
    // Function to fetch and process the Excel file
    async function loadExcelData() {
        try {
            // Fetch the Excel file
            const response = await fetch('Database.xlsx');
            const data = await response.arrayBuffer();
            
            // Parse the Excel file
            const workbook = XLSX.read(data, { type: 'array' });
            
            // Get the first sheet
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            
            // Get the range to check if all data is being read
            const range = XLSX.utils.decode_range(sheet['!ref']);
            console.log('Sheet range:', range);
            console.log('Number of rows:', range.e.r - range.s.r + 1);
            
            // Convert to JSON with detailed options
            const jsonData = XLSX.utils.sheet_to_json(sheet, { 
                header: 1,
                defval: '', // Use empty string for empty cells
                blankrows: false // Skip blank rows
            });
            console.log('Excel data rows:', jsonData.length, jsonData);
            
            // Create HTML table with clear row markers for debugging
            let htmlTable = '<table border="1">';
            
            // Add each row to the table
            jsonData.forEach((row, rowIndex) => {
                htmlTable += `<tr class="row-${rowIndex}">`;
                
                // If row is empty or has only empty cells, add a visible placeholder
                if (row.length === 0 || row.every(cell => cell === '')) {
                    htmlTable += '<td colspan="100">Empty row</td>';
                } else {
                    row.forEach((cell, cellIndex) => {
                        // Use th for header row, td for data rows
                        const cellTag = rowIndex === 0 ? 'th' : 'td';
                        const cellValue = cell === '' ? '(empty cell)' : cell;
                        htmlTable += `<${cellTag} data-col="${cellIndex}">${cellValue}</${cellTag}>`;
                    });
                }
                
                htmlTable += '</tr>';
            });
            
            htmlTable += '</table>';
            
            // Display in the container
            document.getElementById('excel-data').innerHTML = htmlTable;
            
            // Add a message showing how many rows were processed
            const rowCountMsg = `<p>Processed ${jsonData.length} rows from Excel file.</p>`;
            document.getElementById('excel-data').innerHTML += rowCountMsg;
            
        } catch (error) {
            console.error('Error loading Excel file:', error);
            document.getElementById('excel-data').innerHTML = `<p>Error loading Excel data: ${error.message}</p>`;
        }
    }
    
    // Load Excel data
    loadExcelData();
});