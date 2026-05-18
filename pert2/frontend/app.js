// URL dasar API backend
// Disimpan dalam variable agar mudah digunakan berulang
const API_URL = "http://localhost:3000/students";


// ======================================================
// Fungsi untuk menampilkan alert Bootstrap
// ======================================================
function showAlert(message, type) {

    // Ambil element alert-box dari HTML
    const alertBox = document.getElementById("alert-box");

    // Membuat isi alert menggunakan template string
    alertBox.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}

            <button 
                type="button" 
                class="btn-close" 
                data-bs-dismiss="alert">
            </button>
        </div>
    `;

    // Menghapus alert otomatis setelah 3 detik
    setTimeout(function () {
        alertBox.innerHTML = "";
    }, 3000);
}


// ======================================================
// Fungsi untuk mengambil semua data mahasiswa
// ======================================================
function loadStudents() {

    // fetch() digunakan untuk request HTTP
    fetch(API_URL)

        // Mengubah response menjadi JSON
        .then(function(response) {
            return response.json();
        })

        // Data hasil JSON diterima di sini
        .then(function(data) {

            // Ambil tbody tabel
            const tableBody = document.getElementById("student-table-body");

            // Kosongkan isi tabel sebelum render ulang
            tableBody.innerHTML = "";

            // Loop semua data mahasiswa
            data.forEach(function(student) {

                // Tambahkan baris baru ke tabel
                tableBody.innerHTML += `
                    <tr>
                        <td>${student.id}</td>
                        <td>${student.name}</td>
                        <td>${student.age}</td>
                        <td>${student.grade}</td>
                    </tr>
                `;
            });
        })

        // Jika terjadi error
        .catch(function(error) {

            console.error(error);

            showAlert(
                "Gagal mengambil data mahasiswa",
                "danger"
            );
        });
}


// ======================================================
// Fungsi untuk menambahkan mahasiswa baru
// ======================================================
function addStudent(event) {

    // Mencegah form reload halaman
    event.preventDefault();

    // Ambil value dari input
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const grade = document.getElementById("grade").value;

    // Membuat object data student
    const studentData = {
        name: name,
        age: Number(age),
        grade: grade
    };

    // Kirim data ke backend
    fetch(API_URL, {

        // Method POST digunakan untuk menambah data
        method: "POST",

        // Memberitahu backend bahwa data berbentuk JSON
        headers: {
            "Content-Type": "application/json"
        },

        // Mengubah object JavaScript menjadi JSON string
        body: JSON.stringify(studentData)
    })

    // Ambil response JSON
    .then(function(response) {
        return response.json();
    })

    // Jika berhasil
    .then(function(data) {

        // Tampilkan alert sukses
        showAlert(
            "Mahasiswa berhasil ditambahkan",
            "success"
        );

        // Reset form
        document.getElementById("student-form").reset();

        // Reload data tabel
        loadStudents();
    })

    // Jika gagal
    .catch(function(error) {

        console.error(error);

        showAlert(
            "Gagal menambahkan mahasiswa",
            "danger"
        );
    });
}


// ======================================================
// Event saat form disubmit
// ======================================================
document
    .getElementById("student-form")
    .addEventListener("submit", addStudent);


// ======================================================
// Jalankan loadStudents saat halaman pertama dibuka
// ======================================================
loadStudents();