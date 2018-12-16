const ALBUMSDISTSRC = 'assets/images/graphs/distribution_of_albums_per_year_2000-2018.png';
const TRACKDISTSRC = 'assets/images/graphs/distribution_of_tracks_per_year_2000-2018.png';

document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById('albumsDistBtn').addEventListener('click',function() {
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
});


