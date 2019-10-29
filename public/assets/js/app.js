$(document).ready(function () {
    //VARIABLES
    var $articleContainer = $(".article-container");
    var $savedContainer = $(".saved-article-container");
    var articles = [];

    //EVENT LISTENERS
    $(document).on('click', '.scraper', scrapeArticles);
    $('.clear').on('click', clearArticles);
    //$(document).on('click', '.btn.save', saveArticle);


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

                `<tr class='articleRow'>`,
                `<td> ${article.title} </td>`,
                `<td><a class="btn btn-success links" href="https://www.sciencedaily.com${article.link}" target="_blank" role="button">Article Link</a></td>`,
                `<td><a class="btn btn-success links save" href="#" target="_blank" role="button">Save Article</a></td>`,
                `<tr>`

            ].join("")
        );
        $newInputRow.data("article", article);

        return $newInputRow;
    }

    //function to hadgle the 'clear articles' button
    function clearArticles() {
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: '/clear',
            success: function (response) {
                $articleContainer.empty();
            }
        })
    }

    //function to scrape articles when the 'scrape button' is clicked
    function scrapeArticles() {
        $.get('/scrape').then(function (data) {
            grabArticles();
        })
    }


    //function to capture the saved articles to the Save collection


    //function to render the saved articles to the Saved Articles screen






})