$(function() {
    $(".devour").on("click", function(event) {
        var id = $(this).data("id");
        var devour = $(this).data("devour");

        var devourState = {
            devoured: devour
        };

        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: devourState
        }).then(
            function() {
                console.log("Changed devour to", devour);
                location.reload();
            }
        );

    });

    $(".create-form").on("submit", function(event) {
        event.preventDefault();

        var newBurger = {
            burger_name: $("#ca").val().trim(),
            devoured: false
        };

        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function() {
                console.log("created new burger");
                location.reload();
            }
        );
    });
});