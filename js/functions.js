async function getData(category = "business", search = "", page = 1) {
    let parameters = new URLSearchParams({
        category: category,
        q: search,
        from: "2026-08-23",
        sortBy: "publishedAt",
        apiKey: "6529574434f447dab933b5d1d91ca10d",
        pageSize: 10,
        page: page
    });



    let response = await fetch(`https://newsapi.org/v2/top-headlines?${parameters.toString()}`);

    let myData = await response.json();

    console.log(myData);

    showData(myData, page);
} 

function showData (data, currentPage) {

    let numberOfPages = Math.ceil(data.totalResults / 10),
        news = data.articles,
        $dataContainer = $("#Data .row");

        $dataContainer.html("");

    if (news.length > 0) {
        for(let item of news) {
        $dataContainer.append(cardComponent(item));
        }

        $("nav .pagination").html(preparePagination (currentPage, numberOfPages));

    } else {

    }

}

function preparePagination (currentPage, totalPages) {
    let lis = `<li class="page-item ${(currentPage == 1)? 'disabled' : ''}"><a class="page-link" onclick="paginate(${(currentPage > 1)? (currentPage - 1): 1})">Previous</a></li>`;

    for(let i = 1; i <= totalPages; i++) {
        lis += `<li class="page-item ${currentPage == i ? 'active' : ''}"><a class="page-link" onclick="paginate(${i})">${i}</a></li>`;;
    }

    lis += `<li class="page-item ${(currentPage == totalPages)? 'disabled' : ''}"><a class="page-link" onclick="paginate(${(currentPage < totalPages)? (currentPage + 1): totalPages})">Next</a></li>`;

    return lis;
}




function cardComponent (item) {
    return `
        <div class="col-lg-4 col-12 col-sm-12 col-md-6 mb-3">
            <div class="card m-auto" style="width: 18rem;">
                <img src="${item.urlToImage ?? 'images/default.png'}" onerror="this.onerror=null; this.src = 'images/default.png';" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${item.title?.slice(0, 20)}</h5>
                    <p class="card-text">${item.description?.slice(0, 150)}</p>
                    <a href="${item.url}" target="_blank" class="btn btn-primary mt-auto">See More</a>
                </div>
            </div>
        </div>
    `; 
}

function paginate(pageNumber) {
    let category = $("#Category").val(),
        search = $("#Search").val();

    getData(category, search, pageNumber);
}