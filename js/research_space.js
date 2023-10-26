document.addEventListener('DOMContentLoaded', function () {
    // Define the name of the Excel file
    var excelFileName = 'data.xlsx';

    // Load the Excel file
    var xhr = new XMLHttpRequest();
    xhr.open('GET', excelFileName, true);
    xhr.responseType = 'arraybuffer';

    xhr.onload = function () {
        var data = new Uint8Array(xhr.response);
        var workbook = XLSX.read(data, { type: 'array' });

        // Get the container element
        var container = document.querySelector('.container');

        // Loop through each sheet (year)
        workbook.SheetNames.forEach(function (year) {
            var yearData = XLSX.utils.sheet_to_json(workbook.Sheets[year]);

            // Create a section for the year
            var yearSection = document.createElement('div');
            // yearSection.classList.add('row', 'mb-4');
            yearSection.classlist.add('card-columns');

            // Create a heading for the year
            var yearHeading = document.createElement('h2');
            yearHeading.textContent = year;
            yearSection.appendChild(yearHeading);

            // Create a row for the cards
            //var cardRow = document.createElement('div');
            //cardRow.classList.add('row');

            // Loop through the data for that year and create cards
            yearData.forEach(function (entry) {
                var card = document.createElement('div');
                //card.classList.add('col-md-4', 'mb-3');

                card.innerHTML = `
                    <div class="card">
                        ${entry.image ? `<img src="images/blog/${entry.image}" class="card-img-top" alt="${entry.title}">` : ''}
                        <div class="card-body">
                            <h5 class="card-title">${entry.title}</h5>
                            <p class="card-text">${entry.body}</p>
                        </div>
                    </div>
                `;

                //cardRow.appendChild(card);
            });

            yearSection.appendChild(card);
            container.appendChild(yearSection);
        });
    };

    xhr.send();
});
