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
            
            // Convert to JSON first to verify all rows are being read
            const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
            console.log('Excel data rows:', jsonData.length, jsonData);
            
            // Create HTML table manually to ensure all rows are included
            let htmlTable = '<table>';
            
            // Add each row to the table
            jsonData.forEach((row, rowIndex) => {
                htmlTable += '<tr>';
                row.forEach((cell) => {
                    // Use th for header row, td for data rows
                    const cellTag = rowIndex === 0 ? 'th' : 'td';
                    htmlTable += `<${cellTag}>${cell}</${cellTag}>`;
                });
                htmlTable += '</tr>';
            });
            
            htmlTable += '</table>';
            
            // Display in the container
            document.getElementById('excel-data').innerHTML = htmlTable;
        } catch (error) {
            console.error('Error loading Excel file:', error);
            document.getElementById('excel-data').innerHTML = '<p>Error loading Excel data. Please ensure the file exists and is accessible.</p>';
        }
    }
    
    // Load Excel data
    loadExcelData();
});