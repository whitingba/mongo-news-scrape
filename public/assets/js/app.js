$(document).ready(function () {
    //VARIABLES
    var $articleContainer = $(".article-container");

    var articles = [];

    //EVENT LISTENERS
    //$(document).on('click', '.scraper', scrapeArticles);
    $('.clear').on('click', clearArticles);
    $(document).on('click', '#save-article', saveArticle);
    $(document).on('click', '#unsave-article', unSaveArticle);

    //Since I was able to get handlebars to function I have removed the following functions as they are no longer necessary
    // grabArticles();

    // //populate with articles that are saved in database
    // function initializeRows() {
    //     $articleContainer.empty();
    //     var rowsToAdd = [];
    //     for (var i = 0; i < articles.length; i++) {
    //         rowsToAdd.push(createNewRow(articles[i]));
    //         console.log(articles);
    //     }
    //     $articleContainer.append(rowsToAdd);
    // }

    // //function to grab the articles from mongodb
    // function grabArticles() {
    //     $.get('/articles', function (data) {
    //         articles = data;
    //         console.log(articles);
    //         initializeRows();
    //     });
    // }

    //dynamically create rows for the articles 
    // function createNewRow(article) {
    //     var $newInputRow = $(
    //         [

    //             `<tr class='articleRow'>`,
    //             `<td> ${article.title} </td>`,
    //             `<td><a class="btn btn-success links" href="https://www.sciencedaily.com${article.link}" target="_blank" role="button">Article Link</a></td>`,
    //             `<td><a class="btn btn-success links save" href="#" target="_blank" role="button">Save Article</a></td>`,
    //             `<tr>`

    //         ].join("")
    //     );
    //     $newInputRow.data("article", article);

    //     return $newInputRow;
    // }

    //function to hadgle the 'clear articles' button
    function clearArticles() {
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: '/clear',
            success: function (response) {
                // $articleContainer.empty();
            }
        })
    }

    //function to scrape articles when the 'scrape button' is clicked
    // function scrapeArticles() {
    //     $.get('/scrape').then(function (data) {
    //         grabArticles();
    //     })
    // }


    //function to capture the saved articles to the Save collection
    function saveArticle(event) {
        event.preventDefault();
        var articleSaveId = $(this).children().val();
        //console.log('article to save is:' + JSON.stringify(articleSave));
        // var articleToRemove = $(this).parent().parent();
        // articleToRemove.remove();
        //console.log('articleToRemove: ' + articleToRemove);

        articleSaveId.issaved = true;
        $.ajax({
            method: "PUT",
            url: "/update/" + articleSaveId,
            data: articleSaveId
        }).then(function (data) {

            location.reload();

        })
    }

    function unSaveArticle(event) {
        event.preventDefault();
        var articleUnSaveId = $(this).children().val();


        articleUnSaveId.issaved = false;
        $.ajax({
            method: "PUT",
            url: "/unsave/" + articleUnSaveId,
            data: articleUnSaveId
        }).then(function (data) {
            //

            location.reload();

        })
    }








})