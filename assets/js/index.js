const ALBUMSDISTSRC = 'assets/images/graphs/distribution_of_albums_per_year_2000-2018.png';
const TRACKDISTSRC = 'assets/images/graphs/distribution_of_tracks_per_year_2000-2018.png';

document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById('albumsDistBtn').addEventListener('click', function () {
        document.querySelectorAll('#distDiv button').forEach((button) => {
            button.classList.remove('active');
        });

        this.classList.add('active');

        var oldImg = $("#fadeContainer img");

        var img = new Image();
        img.src = ALBUMSDISTSRC;
        var newImg = $(img).hide();
        $("#fadeContainer").append(img);

        oldImg.stop(true).fadeOut(500, function () {
            $(this).remove();
        });
        newImg.fadeIn(500);
        return false;
    });

    document.getElementById('tracksDistBtn').addEventListener('click', function () {
        document.querySelectorAll('#distDiv button').forEach((button) => {
            button.classList.remove('active');
        });

        this.classList.add('active');

        var oldImg = $("#fadeContainer img");

        var img = new Image();
        img.src = TRACKDISTSRC;
        var newImg = $(img).hide();
        $("#fadeContainer").append(img);

        oldImg.stop(true).fadeOut(500, function () {
            $(this).remove();
        });
        newImg.fadeIn(500);
        return false;
    });

    $("#menu a[href^='#']").on('click', function (e) {
        // This sets the hash
        var target;
        target = this.hash;

        // Prevent default anchor click behavior
        e.preventDefault();

        // The grabs the height of my header
        var navOffset;
        navOffset = $('#header').height();

        // Animate The Scroll
        $('html, body').animate({
            scrollTop: $(this.hash).offset().top - navOffset - 23
        }, 600, function () {
            // Adds hash to end of URL
            return window.history.pushState(null, null, target);
        });
    });
});

function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("myOverlay").style.display = "block";
}

function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
}


