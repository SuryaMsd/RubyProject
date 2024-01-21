document.addEventListener('DOMContentLoaded', function () {
    // Fetch painters data from the server
    fetch('/painters')
        .then(response => response.json())
        .then(painters => displayPainters(painters))
        .catch(error => console.error('Error fetching painters', error));

    function displayPainters(painters) {
        const tbody = document.querySelector('tbody');

        painters.forEach(painter => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${painter.painters_uid}</td>
                <td>${painter.painter_name}</td>
                <td>${painter.mobile}</td>
                <td>${painter.dealer_name}</td>
                <td>${painter.place}</td>
                <td><button onclick="showPainterDetails(${painter.painters_uid})">View</button></td>
            `;
            tbody.appendChild(row);
        });
    }

    // Add event listener for search button
    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', function () {
        const searchInput = document.getElementById('searchInput').value.toLowerCase();
        filterRows(searchInput);
    });

    function filterRows(searchInput) {
        const tbody = document.querySelector('tbody');
        const rows = tbody.querySelectorAll('tr');

        rows.forEach(row => {
            const columns = row.querySelectorAll('td');
            let rowText = '';

            columns.forEach(column => {
                rowText += column.textContent.toLowerCase() + ' ';
            });

            if (rowText.includes(searchInput)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    function showPainterDetails(painterId) {
        // Fetch painter details from the server based on painterId
        fetch(`/painters/${painterId}`)
            .then(response => response.json())
            .then(painter => {
                const popup = document.getElementById('painter-details-popup');
                popup.innerHTML = `
                    <h3>${painter.painter_name}</h3>
                    <p>Unique Id: ${painter.painters_uid}</p>
                    <p>Mobile: ${painter.mobile}</p>
                    <p>Dealer: ${painter.dealer_name}</p>
                    <p>Place: ${painter.place}</p>
                `;
                popup.style.display = 'block';
            })
            .catch(error => console.error(`Error fetching painter details for ID ${painters_uid}`, error));
    }
});
