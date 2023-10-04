// Test data, can be deleted in the future
const data = [
    {id:'1', title: "Title 1", author: "John", year: "2020", claim: "Claim 1", evidence: "Evidence 1" },
    {id:'2', title: "Title 2", author: "Jane", year: "2021", claim: "Claim 2", evidence: "Evidence 2" }
];

let bookmarks = JSON.parse(localStorage.getItem("bookmarkedSearches")) || [];

document.addEventListener("DOMContentLoaded", () => {
    populateTable(data);
    displayBookmarks(); 
});

function populateTable(data) {
    const tbody = document.getElementById("resultsTable").getElementsByTagName("tbody")[0];
    tbody.innerHTML = "";

    data.forEach(row => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="titleCol">${row.title}</td>
            <td class="authorCol">${row.author}</td>
            <td class="yearCol">${row.year}</td>
            <td class="claimCol">${row.claim}</td>
            <td class="evidenceCol">${row.evidence}</td>
            <td class="detailsCol"><button onclick="location.href='detail.html?id=${row.id}'">Edit</button></td>
        `;
        tbody.appendChild(tr);
    });
}

function filterSearch() {
    const searchTerm = document.getElementById("searchBox").value.toLowerCase();
    const filteredData = data.filter(row => {
        return row.title.toLowerCase().includes(searchTerm) ||
               row.author.toLowerCase().includes(searchTerm) ||
               row.year.toLowerCase().includes(searchTerm) ||
               row.claim.toLowerCase().includes(searchTerm) ||
               row.evidence.toLowerCase().includes(searchTerm);
    });
    populateTable(filteredData);
}

function toggleColumn(className) {
    const cols = document.getElementsByClassName(className);
    for (let i = 0; i < cols.length; i++) {
        if (cols[i].style.display === "none") {
            cols[i].style.display = "";
        } else {
            cols[i].style.display = "none";
        }
    }
}

// Bookmark functions
function displayBookmarks() {
    const bookmarkList = document.getElementById('bookmarkList');
    bookmarkList.innerHTML = ''; 

    bookmarks.forEach((searchTerm, index) => {
        const li = document.createElement('li');
        li.textContent = searchTerm;

        // Add a delete button for each bookmark
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function(event) {
            event.stopPropagation();  
            deleteBookmark(index);
        };

        li.onclick = function() {
            document.getElementById('searchBox').value = searchTerm;
            filterSearch();
        };

        li.appendChild(deleteButton);
        bookmarkList.appendChild(li);
    });
}

function bookmarkCurrentSearch() {
    const searchTerm = document.getElementById("searchBox").value;
    if (!searchTerm) return; 
    if (!bookmarks.includes(searchTerm)) {
        bookmarks.push(searchTerm);
        localStorage.setItem("bookmarkedSearches", JSON.stringify(bookmarks));
        displayBookmarks();
    }
}

function deleteBookmark(index) {
    bookmarks.splice(index, 1); 
    localStorage.setItem("bookmarkedSearches", JSON.stringify(bookmarks));
    displayBookmarks(); 
}

// Clear all bookmarks
function clearAllBookmarks() {
    bookmarks = [];
    localStorage.setItem("bookmarkedSearches", JSON.stringify(bookmarks));
    displayBookmarks();
}

function sortTable(n) {
    
}

