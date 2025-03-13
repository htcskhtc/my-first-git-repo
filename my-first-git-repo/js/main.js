document.addEventListener('DOMContentLoaded', function() {
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
            
            // Convert to HTML table
            const htmlTable = XLSX.utils.sheet_to_html(sheet);
            
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