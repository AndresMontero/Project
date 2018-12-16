const ALBUMSDISTSRC = 'assets/images/graphs/distribution_of_albums_per_year_2000-2018.png';
const TRACKDISTSRC = 'assets/images/graphs/distribution_of_tracks_per_year_2000-2018.png';

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('albumsDistBtn').addEventListener('click', () => {
        var oldImg = $("#fadeContainer img");

        let img = new Image();
        img.src = ALBUMSDISTSRC;
        let newImg = $(img).hide();
        $("#fadeContainer").append(img);

        oldImg.stop(true).fadeOut(500, function () {
            $(this).remove();
        });
        newImg.fadeIn(500);
        return false;
        //document.getElementById('myImage').src = ALBUMSDISTSRC;
    });

    document.getElementById('tracksDistBtn').addEventListener('click', () => {
        document.getElementById('myImage').src = TRACKDISTSRC;
    });
});


