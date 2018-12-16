const CSVPATH = 'assets/csv/';

linePlot = () => {
    const TEXT = {
        danceability: {
            up: 'Danceability describes how suitable a track is for dancing based on a combination of musical elements\n' +
                'including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is the least\n' +
                'danceable and 1.0 is most danceable. This value determines the ease with which a person could dance to a\n' +
                'song over\n' +
                'the course of the whole song.',
            down: 'The overall behavior (line in black) of <b>danceability shows an increasing trend over the last years.</b>\n' +
                'We can\n' +
                'see a positive slope, representing this increment of songs danceability which coincides with the increasing\n' +
                'preference for genres such as pop, rock, international and country (described previously).\n' +
                '\n' +
                '<br/>\n' +
                'As depicted on the plots, the weather has an influence on music production. <b>Colder seasons</b> (winter\n' +
                'over\n' +
                'summer)\n' +
                'seem to be a better time to release <b>more danceable songs</b>. Dancing is a good way to keep your body\n' +
                'warm!',
        },
        valence: {
            up: 'Valence describes the musical positiveness conveyed by a song. High valence sound more positive (e.g.\n' +
                'happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).',
            down: ' Valence has had an <b>increasing behavior until 2010</b> and to our surprise <b>the following years it has\n' +
                'decreased</b>, which has more or less the contrary behavior than danceability and similar to energy.\n' +
                'Valence and\n' +
                'danceability are moderately correlated. About the season variation, in most cases and especially in the\n' +
                'last 8 years valence is higher during winter seasons compared to the summer season, which leads us to\n' +
                'conclude\n' +
                'that music preferences/production vary according to weather variations. This makes a lot of sense, artists\n' +
                'may produce <b>“happier” music</b>(higher valence) during <b>winter</b> seasons.'
        },
        energy: {
            up: 'Energy represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast,\n' +
                '        loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale.\n' +
                '        Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset\n' +
                '        rate, and general entropy.',
            down: 'Since 2014, song <b>energy has decreased</b> which coincides with the increasing preference for more less\n' +
                '        "intense" genres\n' +
                '        such as pop, instrumental and country during those years. In most of the years, it seems that songs\n' +
                '        released\n' +
                '        during summer have higher energy than songs released during colder seasons, very logical as people will\n' +
                '        also have higher energy to sing, party and rock more <b>"energetical"</b> songs during hot <b>summers</b>.\n'
        }
    };

    // Set the dimensions of the canvas / graph
    var margin = {top: 30, right: 20, bottom: 30, left: 50},
        width = 450 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

    // Parse the date / time
    var parseDate = d3.timeParse("%Y");

    // Set the ranges
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    // Define the axes
    let xAxis = d3.axisBottom()
        .scale(x)
        .ticks(10)
        .tickFormat(formatTime);

    //Define Y axis
    let yAxis = d3.axisRight()
        .scale(y)
        .ticks(5);

    // Define the line
    let totalline = d3.line()
        .x(function (d) {
            return x(d.date);
        })
        .y(function (d) {
            return y(d.total);
        });

    // Define the line
    let summerline = d3.line()
        .x(function (d) {
            return x(d.date);
        })
        .y(function (d) {
            return y(d.summer);
        });

    // Define the line
    let winterline = d3.line()
        .x(function (d) {
            return x(d.date);
        })
        .y(function (d) {
            return y(d.winter);
        });

    // Define the line
    let springline = d3.line()
        .x(function (d) {
            return x(d.date);
        })
        .y(function (d) {
            return y(d.spring);
        });

    // Define the line
    let autumnline = d3.line()
        .x(function (d) {
            return x(d.date);
        })
        .y(function (d) {
            return y(d.autumn);
        });

    let upText, downText, generalTitle, leftTitle, rightTitle;

    document.addEventListener("DOMContentLoaded", function () {
        upText = document.getElementById('line_up_text');
        downText = document.getElementById('line_down_text');
        generalTitle = document.getElementById('general_title');
        leftTitle = document.getElementById('left_title');
        rightTitle = document.getElementById('right_title');

        document.getElementById('valenceBtn').addEventListener('click', () => {
            updateData('valence1', "#seasons_features_one");
            updateData('valence2', "#seasons_features_two");
            changeTexts('valence');
        });

        document.getElementById('danceabilityBtn').addEventListener('click', () => {
            updateData('danceability1', "#seasons_features_one");
            updateData('danceability2', "#seasons_features_two");
            changeTexts('danceability');
        });

        document.getElementById('energyBtn').addEventListener('click', () => {
            updateData('energy1', "#seasons_features_one");
            updateData('energy2', "#seasons_features_two");
            changeTexts('energy');
        });

        initializeFeaturesGraph("#seasons_features_one", 'danceability');
        initializeFeaturesGraph("#seasons_features_two", 'danceability');
        initializeLegend('#legend');
        changeTexts('danceability');
    });

    let changeTexts = (option) => {
        let texts = TEXT[option];

        upText.innerHTML = texts['up'];
        downText.innerHTML = texts['down'];
        generalTitle.innerHTML = '<b>' +  option.capitalize() +'</b>';
        leftTitle.innerHTML = option.capitalize() + ' seasons 2000 - 2010';
        leftTitle.innerHTML = option.capitalize() + ' seasons 2010 - 2018';
    };

    let initializeLegend = (selector) => {
        let legend = d3.select(selector)
            .append("svg")
            .attr("width", 100)
            .attr("height", 310);

        var ordinal = d3.scaleOrdinal()
            .domain(["Total", "Summer", "Winter", "Spring", "Autumn"])
            .range(["black", "red", "darkblue", 'lightgreen', 'coral']);

        legend.append("g")
            .attr("class", "legendOrdinal")
            .attr("transform", "translate(10, 20)");

        var legendOrdinal = d3.legendColor()
            .shape("path", d3.symbol().type(d3.symbolCircle).size(100)())
            .shapePadding(10)
            //use cellFilter to hide the "e" cell
            .cellFilter(function (d) {
                return d.label !== "e"
            })
            .scale(ordinal);

        legend.select(".legendOrdinal")
            .call(legendOrdinal);
    };

    let initializeFeaturesGraph = (selector, file) => {
        // Adds the svg canvas
        var svg = d3.select(selector)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // Get the data
        d3.csv(CSVPATH + file + '.csv', function (error, data) {
            data.forEach(function (d) {
                d.date = parseDate(d.date);
                d.total = +d.total;
            });

            // Scale the range of the data
            x.domain(d3.extent(data, function (d) {
                return d.date;
            }));
            y.domain([d3.min(data, (d) => {
                return Math.min(d.total, d.summer, d.winter, d.spring, d.autumn);
            }), d3.max(data, (d) => {
                return Math.max(d.total, d.summer, d.winter, d.spring, d.autumn);
            })]);

            // add the X gridlines
            svg.append("g")
                .attr("class", "grid")
                .attr("transform", "translate(0," + height + ")")
                .call(make_x_gridlines()
                    .tickSize(-height)
                    .tickFormat(""));

            // add the Y gridlines
            svg.append("g")
                .attr("class", "grid")
                .call(make_y_gridlines()
                    .tickSize(-width)
                    .tickFormat(""));

            // Add the valueline path.
            svg.append("path")
                .attr("class", "line total")
                .style("stroke", "black")
                .style("stroke-width", "5px")
                .attr("d", totalline(data));

            // Add the valueline2 path.
            svg.append("path")
                .data([data])
                .attr("class", "line summer")
                .style("stroke", "red")
                .attr("d", summerline(data));

            // Add the valueline3 path.
            svg.append("path")
                .data([data])
                .attr("class", "line winter")
                .style("stroke", "darkblue")
                .attr("d", winterline(data));

            svg.append("path")
                .data([data])
                .attr("class", "line spring")
                .style("stroke", "lightgreen")
                .attr("d", springline(data));

            svg.append("path")
                .data([data])
                .attr("class", "line autumn")
                .style("stroke", "coral")
                .attr("d", autumnline(data));

            // Add the X Axis
            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            // Add the Y Axis
            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis);

        });
    };

    // ** Update data section (Called from the onclick)
    function updateData(file, selector) {
        // Get the data again
        d3.csv(CSVPATH + file + ".csv", function (error, data) {
            data.forEach(function (d) {
                d.date = parseDate(d.date);
                d.total = +d.total;
            });

            // Scale the range of the data again
            x.domain(d3.extent(data, function (d) {
                return d.date;
            }));
            y.domain([d3.min(data, (d) => {
                return Math.min(d.total, d.summer, d.winter, d.spring, d.autumn);
            }), d3.max(data, (d) => {
                return Math.max(d.total, d.summer, d.winter, d.spring, d.autumn);
            })]);

            // Select the section we want to apply our changes to
            var svg = d3.select(selector).transition();

            // Make the changes
            svg.select(".total")   // change the line
                .duration(750)
                .attr("d", totalline(data));

            svg.select(".summer")   // change the line
                .duration(750)
                .attr("d", summerline(data));

            svg.select(".winter")   // change the line
                .duration(750)
                .attr("d", winterline(data));

            svg.select(".spring")   // change the line
                .duration(750)
                .attr("d", springline(data));

            svg.select(".autumn")   // change the line
                .duration(750)
                .attr("d", autumnline(data));


            svg.select(".x.axis") // change the x axis
                .duration(750)
                .call(xAxis);
            svg.select(".y.axis") // change the y axis
                .duration(750)
                .call(yAxis);
        });
    }

    // gridlines in x axis function
    function make_x_gridlines() {
        return d3.axisBottom(x)
            .ticks(5)
    }

    // gridlines in y axis function
    function make_y_gridlines() {
        return d3.axisLeft(y)
            .ticks(5)
    }
};

linePlot();


