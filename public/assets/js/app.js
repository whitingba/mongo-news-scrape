$(document).ready(function () {
    //VARIABLES
    var $articleContainer = $(".article-container");
    var articles = [];

    //EVENT LISTENERS
    // $(document).on('click', '.scraper', scrapeArticles);
    // $(document).on('click', '', clearArticles);
    // $(document).on('click', '', saveArticle);


    grabArticles();

    //populate with articles that are saved in database
    function initializeRows() {
        $articleContainer.empty();
        var rowsToAdd = [];
        for (var i = 0; i < articles.length; i++) {
            rowsToAdd.push(createNewRow(articles[i]));
            console.log(articles);
        }
        $articleContainer.append(rowsToAdd);
    }

    //function to grab the articles from mongodb
    function grabArticles() {
        $.get('/articles', function (data) {
            articles = data;
            console.log(articles);
            initializeRows();
        });
    }

    //dynamically create rows for the articles 
    function createNewRow(article) {
        var $newInputRow = $(
            [
                `<tr>`,
                `<td> ${article.title} </td>`,
                `<td><a class="btn btn-success btn-lg link" href="${article.link}" role="button">Link</a></td>`,
                `<tr>`
            ].join("")
        );
        $newInputRow.data("article", article);

        return $newInputRow;
    }


    //function to create the container the article will go into along with a button to save the article


    //function to save the article when 'save article' button is clicked
    //this will include the PUT method


    //function to scrape articles when the scrape button is clicked
    // const scrapeArticles = () => {
    //     $.get('/scrape').then(function (data) {

    //     });
    // }

    //function to hangle the 'clear articles' button






})