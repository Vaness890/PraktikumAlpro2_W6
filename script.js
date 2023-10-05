document.addEventListener("DOMContentLoaded", function () {
    const urlInput = document.getElementById("urlInput");
    const fetchButton = document.getElementById("fetchButton");
    const dataContainer = document.getElementById("dataContainer");

    fetchButton.addEventListener("click", function () {
        const url = "https://testingalpro.alwaysdata.net/api/getcoffee.php"
        // Membuat objek XMLHttpRequest
        const xhr = new XMLHttpRequest();

        // Menentukan jenis permintaan dan URL yang akan diambil
        xhr.open("GET", url, true);

        // Menangani respons saat permintaan selesai
        xhr.onload = function () {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);

                // Membuat tabel HTML dari data yang diterima
                const table = document.createElement("table");
                const thead = document.createElement("thead");
                const tbody = document.createElement("tbody");

                // Membuat header tabel
                const headerRow = document.createElement("tr");
                for (const key in data[0]) {
                    const th = document.createElement("th");
                    th.textContent = key;
                    headerRow.appendChild(th);
                }
                thead.appendChild(headerRow);
                table.appendChild(thead);

                // Memasukkan data ke dalam tabel
                data.forEach(function (item) {
                    const row = document.createElement("tr");
                    for (const key in item) {
                        const cell = document.createElement("td");
                        cell.textContent = item[key];
                        row.appendChild(cell);
                    }
                    tbody.appendChild(row);
                });
                table.appendChild(tbody);

                // Menampilkan tabel di bawah tombol
                dataContainer.innerHTML = "";
                dataContainer.appendChild(table);
            } else {
                console.error("Terjadi kesalahan saat mengambil data.");
                dataContainer.innerHTML = "Terjadi kesalahan saat mengambil data.";
            }
        };

        // Menangani kesalahan saat permintaan
        xhr.onerror = function () {
            console.error("Terjadi kesalahan saat mengirim permintaan.");
            dataContainer.innerHTML = "Terjadi kesalahan saat mengirim permintaan.";
        };

        // Mengirim permintaan
        xhr.send();
    });
});
