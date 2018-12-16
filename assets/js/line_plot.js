const CSVPATH = 'assets/csv/';

linePlot = () => {
    const TEXT = {
        danceability: {
            up: 'Danceability describes how suitable a track is for dancing based on a combination ' +
                'of musical elements including tempo, rhythm stability, beat strength, and overall regularity.' +
                ' A value of 0.0 is least danceable and 1.0 is most danceable. This value determines the ease ' +
                'with which a person could dance to a song over the course of the whole song. ',
            down: 'The overall behaviour (line in black) of danceability shows an increasing trend over' +
                ' the last years. We can see a positive slope, representing this increment of songs danceability' +
                ' which coincides with the increasing preference for genres such as pop, rock, international' +
                ' and country (described previously). \n' +
                'As depicted on the plots, weather has an influence on music production. ' +
                'Colder seasons (winter over summer) seem to be a better time to release more danceable' +
                ' songs. Dancing is a good way to keep your body warm! '
        },
        valence: {
            up: 'Valence describes the musical positiveness conveyed by a song. High valence sound more ' +
                'positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative ' +
                '(e.g. sad, depressed, angry). ',
            down: 'Valence has had a increasing behaviour until 2010 and to our surprise the following years it has decreased,\n' +
                'which has more or less the contrary behaviour than danceability and similar to energy. Valence and danceability\n' +
                'are moderately correlated. About the season variation, in most cases and specially in the last 8 years valence\n' +
                'is higher during winter seasons compared to summer season, which leads us to conclude that music\n' +
                'preferences/production vary according to weather variations. This makes a lot of sense, artists may produce\n' +
                '“happier” music (higher valence) during winter seasons.'
        },
        energy: {
            up: 'Energy represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud,\n' +
                'and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual\n' +
                'features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and\n' +
                'general entropy.',
            down: 'Since 2014, song energy has decreased which coincides with the increasing preference for more calmed genres such\n' +
                'as pop, instrumental and country during those years. In most of years, it seems that songs released during\n' +
                'summer have higher energy than songs released during colder seasons, very logical as people will also have\n' +
                'higher energy to sing, party and rock more "energetical" songs during hot summers.'
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

    let upText, downText;

    document.addEventListener("DOMContentLoaded", function () {
        upText = document.getElementById('line_up_text');
        downText = document.getElementById('line_down_text');

        document.getElementById('valenceBtn').addEventListener('click', () => {
            updateData('valence', "#seasons_features_one");
            updateData('valence', "#seasons_features_two");
            changeTexts('valence');
        });

        document.getElementById('danceabilityBtn').addEventListener('click', () => {
            updateData('danceability', "#seasons_features_one");
            changeTexts('danceability');
        });

        document.getElementById('energyBtn').addEventListener('click', () => {
            updateData('energy', "#seasons_features_one");
            changeTexts('energy');
        });

        initializeFeaturesGraph("#seasons_features_one", true);
        initializeFeaturesGraph("#seasons_features_two");
        initializeLegend('#legend');
        changeTexts('danceability');
    });

    let changeTexts = (option) => {
        let texts = TEXT[option];

        upText.innerHTML = texts['up'];
        downText.innerHTML = texts['down'];
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

    let initializeFeaturesGraph = (selector) => {
        // Adds the svg canvas
        var svg = d3.select(selector)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // Get the data
        d3.csv(CSVPATH + 'danceability.csv', function (error, data) {
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


