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

            // Create a section for the content of respective year
            var yearSection = document.createElement('div');
            yearSection.classList.add('container');
            yearSection.setAttribute('id', year);


            // Create a heading for the year
            var yearHeading = document.createElement('h2');
            yearHeading.textContent = year;
            yearHeading.classList.add('text-center'); // Add this line to center align the year heading

            // add font awesome icons
            var topbutton = document.createElement('i');
            topbutton.setAttribute('class', 'btn btn-light fas fa-arrow-alt-circle-up');
            topbutton.setAttribute('href', '#jumbo');
            yearSection.appendChild(topbutton);

            // add icon after year Heading
            yearHeading.appendChild(topbutton);
            // add year heading to section
            yearSection.appendChild(yearHeading);


            // Create a container for the cards
            var cardContainer = document.createElement('div');
            cardContainer.classList.add('card-columns');

            // Loop through the data for that year and create cards
            yearData.forEach(function (entry) {
                var card = document.createElement('div');
                //card.classList.add('col-md-4', 'mb-3');
                card.classList.add('card');

                card.innerHTML = `
                        ${entry.image ? `<img src="images/blog/${entry.image}" class="card-img-top" alt="${entry.title}">` : ''}
                        <div class="card-body">
                            <h5 class="card-title">${entry.title}</h5>
                            <p class="card-text">${entry.body}</p>
                        </div>
                `;

                //cardRow.appendChild(card);
                cardContainer.appendChild(card);

            });

            //yearSection.appendChild(card
            yearSection.appendChild(cardContainer);
            container.appendChild(yearSection);
        });
    };

    xhr.send();
});
