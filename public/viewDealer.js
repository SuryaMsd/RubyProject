document.addEventListener('DOMContentLoaded', function () {
    // Fetch dealers data from the server
    fetch('/dealers')
        .then(response => response.json())
        .then(dealers => displayDealers(dealers))
        .catch(error => console.error('Error fetching dealers', error));

    function displayDealers(dealers) {
        const tbody = document.querySelector('tbody');

        dealers.forEach(dealer => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${dealer.dealers_uid}</td>
                <td>${dealer.dealer_name}</td>
                <td>${dealer.mobile}</td>
                <td>${dealer.place}</td>
                <td><button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#dealerDetailsModal" data-dealer-uid="${dealer.dealers_uid}">View</button></td>
            `;
            tbody.appendChild(row);
        });
    }
    // function showDealerDetails(dealerUID) {
    //     // Fetch dealer details from the server based on dealerId
    //     fetch(`/dealers/${dealerUID}`)
    //         .then(response => response.json())
    //         .then(dealer => {
    //             const modalBody = document.getElementById('dealerDetailsModalBody');
    //             modalBody.innerHTML = `
    //                 <h3>${dealer.dealer_name}</h3>
    //                 <p>ID: ${dealer.dealers_uid}</p>
    //                 <p>Mobile: ${dealer.mobile}</p>
    //                 <p>Place: ${dealer.place}</p>
    //             `;
    //         })
    //         .catch(error => console.error(`Error fetching dealer details for ID ${dealerUID}`, error));
    // }
    
    // Add an event listener for Bootstrap modal show event
    $('#dealerDetailsModal').on('show.bs.modal', function (event) {
        const button = $(event.relatedTarget); // Button that triggered the modal
        const dealerUid = button.data('dealer-uid'); // Extract info from data-* attributes

        // Fetch dealer details from the server based on dealerUid
        fetch(`/dealers/${dealerUid}`)
            .then(response => response.json())
            .then(dealer => {
                const modal = $(this);
                modal.find('.modal-title').text(`Details of ${dealer.dealer_name}`);
                modal.find('.modal-body').html(`
                    <p><strong>Dealer Name:</strong> ${dealer.dealer_name}</p>
                    <p><strong>Unique Id:</strong> ${dealer.dealers_uid}</p>
                    <p><strong>Mobile:</strong> ${dealer.mobile}</p>
                    <p><strong>Place:</strong> ${dealer.place}</p>
                `);
            })
            .catch(error => console.error(`Error fetching dealer details for UID ${dealerUid}`, error));
    });

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

    
});
