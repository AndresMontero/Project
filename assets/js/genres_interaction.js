// Texts
const TEXTINTERACTION = {
    'genres': "You can explore the genre's popularity, by moving the cursor over the colored " +
        'areas. They represent the top 10 genres (based on song hotness) in the time interval 2013 ' +
        'to 2018. The genres are: Rock, Pop, International, Instrumental, Experimental, Easy Listening,' +
        ' Country and Blues. The time interval was considered for the last five years, due to the genre ' +
        'variability over time. For every year, each of the genres is represented by their hotness,' +
        ' which is obtained by the mean of all songs hotness released on the specified year.',
    'spoken': 'The genre Spoken has had a hotness peak in 2017 and a reduction in 2018 with ' +
        'artists Ella Flitzgerard, LCD Soundsystem, Godspeed you! Black Emperor, J.Cole, Khelani, ' +
        'Danny Gonzalez. A peak in 2016 is marked by J.Cole with its great hit Wet Dreamz. ' +
        'Another peak is seen in 2017, which is contributed by the other artists, being Kelhani ' +
        'the artist that contributes most in this year with the release of her album SweetSexySavage.',
    'soul_rnb': 'The genre Soul RnB has had an increased since 2014, with increasing hotness ' +
        'for the next years. The artists with higher hotness are: Marcy Playground in 2015, El Michels ' +
        'affair and Sting in 2016, The Who, Chelsea Wolfe, and Godspeed you! Black Emperor in 2017, ' +
        'Barry White, Scott Bradley, Anderson Paak and Mac Miller in 2018 with the release of ' +
        'his album Swimming.',
    'rock': 'Rock has had an increasing hotness since 2015, with artists such as Mephis Mey' +
        ' Fire Rock Kelela, Fall Out Boy, Linkin Park, Prodigy, The 1975, Moon, NiallHoran, ' +
        'The Growlers, Carrie Underwood. It shows an increasing behavior since 2015 with ' +
        'Linkin Park, Nial Horan and Walk the Moon being the main contributors in 2017.' +
        ' In 2018, the main contributors are The Prodigy and Kelela which also coincides ' +
        'with the release of her album Take Me Apart.',
    'pop': 'Pop has had an increasing hotness since 2015, and it is the one with ' +
        'the largest increase of hotness for the year 2018. The main artist contributing ' +
        'its popularity are: Eminem, Martin Garrix, David Guetta, Marshmello, ' +
        'Halsey, Monsta X, DJ Snake, OMI, Kiana Leda, Drake Bell. ' +
        'In 2017, we see that Harshey and Marshmello are the main contributors. For the year 2018,' +
        ' we can see that Eminem and David Guetta are the hottest artists and it coincides with ' +
        'the recently released album Kamikaze which is one of the best selling albums of 2018.',
    'international': 'The genre International has had an increasing hotness since 2014, with an important' +
        ' peak in 2016. Top 10 artists with higher hotness are DJ Snake, Cardi B, Kehlani, ' +
        'Las Aves, Bomba Estereo, Simane, La Sonora Dinamita, Ella Fitzgerald, Godspeed ' +
        'You! Black Emperor. One of the main contributors in 2016 is Las Aves and in 2017 ' +
        'the group Bomba Estereo with one their greatest hits Soy Yo and To My Love.',
    'instrumental': 'Instrumental genre has had an increasing hotness since 2015, ' +
        'with a peak in 2017, being the main contributors Linkin Park, The Prodigy, ' +
        'Radiohead, Tame Impala, Christina Aguilera, Petit Biscuit, 2Cellos, Kelela, ' +
        'The contortionist, Goodspeed You! Black Emperor',
    'experimental': 'Genre Experimental has had a high hotness in the years 2016 and 2018 ' +
        'with the top artists being Lila Om, The 1975, Fall Out Boy, Yellow Days, ' +
        'Radiohead, Christina Aguilera, Kacey Musgraves, Norah Jones, Tycho, Kelela.',
    'easy_listening': 'The genre Easy Listening has had an increasing hotness between years 2014 ' +
        'and 2016, and it decreased a bit in the next years. The main artists of this ' +
        'genre are Niall Horan, Tiziano Ferro, Norah Jones, Evanescence, Marcy Playground, ' +
        'Lady Antebellum, Godspeed You! Black Emperor, Tycho, Ella Fitzgerald, Chelsea Wolfe. ' +
        'The peak of the genre was in 2016 with one of the biggest contributors being Norah ' +
        'Jones with the release of her most recent album Day Breaks.',
    'country': 'The Country genre has had an increasing hotness during the last two years ' +
        '(2017 and 2018), with the peak registered in 2017. The main artists of this ' +
        'genre are: Little Big Town, Carrie Underwood, Sugarland, The Flaming Lips, Niall' +
        ' Horan, Blake Shelton, Los Tucanes de Tijuana, Lady Antebellum, Susanne Sundfor, ' +
        'Keith Urban. Main contributors in 2017 are Niall Horan and Blake Shelton. ' +
        'And the group showing an increasing hotness in 2017 and 2018 is Little Big ' +
        'Town which coincides with the release of their two albums Wanderlust and The Breaker.',
    'blues': 'Blues has had an increase in 2015 and during the last two years. ' +
        'The main artists contributing the genre hotness are: Yellow Days, John Legend, ' +
        'Ella Fitzgerald, Boz Scaggs, Armin van Buuren, Shwayze, Steve Wonder, Leon Bridges, ' +
        'Govt Mule, The Who. Yellow days is the group showing an increasing hotness in the last' +
        ' years due to their albums Is Everything Okay in the world, and Harmless Melodies.'
};

//Width and height
const w = 1000;
const h = 300;
const padding = 20;

//Tracks view state.  Possible values:
// 0 = default (areas types)
// 1 = areas (of one type)
// 2 = areas (singular)
let viewState = 0;

//Tracks most recently viewed/clicked 'type'.  Possible values:
//"Heavy_Machinery", "Single_Pumps" or undefined
let viewType;

let dataset, thisTypeDataset, xScale, yScale,
    xAxis, yAxis, area;  //Empty, for now

//For converting strings to Dates
let parseTime = d3.timeParse("%Y-%m");

//For converting Dates to strings
let formatTime = d3.timeFormat("%Y");

//Define key function, to be used when binding data
let key = function (d) {
    return d.key;
};

//Set up stack methods
let areaStack = d3.stack();
let typeStack = d3.stack();
let genreDiv, genreTitle;
let description;

const DATA = 'assets/csv/Book3.csv';

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

document.addEventListener("DOMContentLoaded", function () {
    genreDiv = document.getElementById('genres_hotness_text');
    genreTitle = document.getElementById('genres_title');
    initializeGenreGraph();
});

let updateGenreText = (key) => {
    let text = TEXTINTERACTION[key.toLowerCase()];

    // genreTitle.innerHTML = key.capitalize();
    genreDiv.innerHTML = '<h3>' + key.capitalize().replace('_', ' ') + '</h3>' + text;
};

let initializeGenreGraph = () => {
    //Load in data
    d3.request(DATA)
        .mimeType("text/csv")
        .get(function (response) {


            //
            // DATA PARSING
            //

            //Parse each row of the CSV into an array of string values
            var rows = d3.csvParseRows(response.responseText);
            console.log(rows);

            //Make dataset an empty array, so we can start adding values
            dataset = [];

            //Loop once for each row of the CSV, starting at row 3,
            //since rows 0-2 contain only area info, not area values.
            for (let i = 2; i < rows.length; i++) {

                //Create a new object
                dataset[i - 2] = {
                    date: parseTime(rows[i][0])  //Make a new Date object for each year + month
                };

                //Loop once for each area in this row (i.e., for this date)
                for (let j = 1; j < rows[i].length; j++) {

                    let sector = rows[0][j];
                    let mining_type = rows[1][j];
                    let mining_type_sector = rows[1][j] + " " + rows[0][j];  //
                    let area_val = rows[i][j];
                    //If area value exists…
                    if (area_val) {
                        area_val = parseInt(area_val);  //Convert from string to int
                    } else {  //Otherwise…
                        area_val = 0;  //Set to zero
                    }

                    //Append a new object with data for this row
                    dataset[i - 2][mining_type_sector] = {
                        "mining_type": mining_type,
                        "sector": sector,
                        "area_val": area_val
                        // "coords": coords
                    };

                }

            }

            //Log out the final state of dataset
            console.log(dataset);


            //
            //	TYPE DATA SERIES
            //

            //The goal here is to make a totally separate data set that
            //includes just monthly totals for each `type` (Heavy_Machinery, Suction_Pumps).

            //Make typeDataset an empty array, so we can start adding values
            typeDataset = [];

            //Loop once for each row of the CSV, starting at row 3,
            //since rows 0-2 contain only area info, not area values.
            for (var i = 2; i < rows.length; i++) {

                //Create a new object
                typeDataset[i - 2] = {
                    date: parseTime(rows[i][0]),  //Make a new Date object for each year
                    // "Heavy_Machinery": 0,
                    // "Suction_Pumps": 0
                    "Blues": 0,
                    "country": 0,
                    'Easy_Listening': 0,
                    'Experimental': 0,
                    'Instrumental': 0,
                    'International': 0,
                    'Pop': 0,
                    'Rock': 0,
                    'Soul_RnB': 0,
                    'Spoken': 0
                };

                //Loop once for each area in this row (i.e., for this date)
                for (var j = 1; j < rows[i].length; j++) {

                    var mining_type = rows[1][j];  //'Type' from 2 row in CSV
                    var area_val = rows[i][j];  //area value for this area

                    //If area value exists…
                    if (area_val) {
                        area_val = parseInt(area_val);  //Convert from string to int
                    } else {  //Otherwise…
                        area_val = 0;  //Set to zero
                    }

                    //Add area value to existing sum
                    typeDataset[i - 2][mining_type] += area_val;

                }

            }

            //Log out the final state of dataset
            console.log(typeDataset);


            //
            // STACKING
            //

            //Tell stack function where to find the keys
            var types = ["Blues", "country", 'Easy_Listening', 'Experimental', 'Instrumental', 'International', 'Pop', 'Rock', 'Soul_RnB', 'Spoken'];
            typeStack.keys(types);

            //Stack the data and log it out
            var typeSeries = typeStack(typeDataset);
            console.log(typeSeries);

            //
            // MAKE THE CHART
            //

            //Create scale functions
            xScale = d3.scaleTime()
                .domain([
                    d3.min(dataset, function (d) {
                        return d.date;
                    }),
                    d3.max(dataset, function (d) {
                        return d.date;
                    })
                ])
                .range([padding, w - padding * 3]);

            yScale = d3.scaleLinear()
                .domain([
                    0,
                    d3.max(typeDataset, function (d) {
                        var sum = 0;

                        //Loops once for each row, to calculate
                        //the total (sum) of sales of all areas
                        for (var i = 0; i < types.length; i++) {
                            sum += d[types[i]];
                        }

                        return sum;
                    })
                ])
                .range([h - padding, padding / 2])
                .nice();

            //Define axes
            xAxis = d3.axisBottom()
                .scale(xScale)
                .ticks(10)
                .tickFormat(formatTime);

            //Define Y axis
            yAxis = d3.axisRight()
                .scale(yScale)
                .ticks(5);

            //Define area generator
            area = d3.area()
                .x(function (d) {
                    return xScale(d.data.date);
                })
                .y0(function (d) {
                    return yScale(d[0]);
                })
                .y1(function (d) {
                    return yScale(d[1]);
                });

            //Create SVG element
            var svg = d3.select("#chartContainer")
                .append("svg")
                .attr("width", w)
                .attr("height", h);


            svg.append("g")
                .attr("id", "Areas_ha");

            //Create areas for TYPES
            svg.append("g")
                .attr("id", "types")
                .selectAll("path")
                .data(typeSeries, key)
                .enter()
                .append("path")
                .attr("class", "area")
                .attr("opacity", 1)
                .attr("d", area)
                .attr("fill", function (d) {
                    //Which type is this?
                    var thisType = d.key;

                    //New color var
                    var color;

                    switch (thisType) {
                        case "Blues":
                            color = "rgb(95,48,44)";
                            break;

                        case "country":
                            color = "rgb(69,51,88)";
                            break;
                        case "Easy_Listening":
                            console.log("easy listening");
                            color = "rgb(50,148,96)";
                            break;

                        case "Experimental":
                            color = "rgb(69,180,88)";
                            break;
                        case "Instrumental":
                            color = "rgb(180,48,44)";
                            break;

                        case "International":
                            color = "rgb(69,51,180)";
                            break;
                        case "Pop":
                            color = "rgb(95,180,44)";
                            break;

                        case "Rock":
                            color = "rgb(69,51,68)";
                            break;
                        case "Soul_RnB":
                            color = "rgb(80,51,88)";
                            break;
                        case "Spoken":
                            color = "rgb(69,80,88)";
                            break;
                    }

                    return color;
                })
                .on("click", function (d) {

                    //Update view state
                    viewState++;

                    //
                    // TYPES
                    //

                    //Which type was clicked?
                    let thisType = d.key;

                    // Update div text
                    updateGenreText(thisType);
                    description.text(thisType.capitalize().replace('_', ' '));

                    //Update this for later reference
                    viewType = thisType;

                    //Generate a new data set with all-zero values,
                    //except for this type's data
                    thisTypeDataset = [];

                    for (var i = 0; i < typeDataset.length; i++) {
                        thisTypeDataset[i] = {
                            date: typeDataset[i].date,
                            // Heavy_Machinery: 0,
                            // Suction_Pumps: 0,
                            Blues: 0,
                            country: 0,
                            Easy_Listening: 0,
                            Experimental: 0,
                            Instrumental: 0,
                            International: 0,
                            Pop: 0,
                            Rock: 0,
                            Soul_RnB: 0,
                            Spoken: 0,
                            [thisType]: typeDataset[i][thisType]  //Overwrites the appropriate zero value above
                        }
                    }

                    console.log(thisTypeDataset);

                    //Stack the data (even though there's now just one "layer") and log it out
                    var thisTypeSeries = typeStack(thisTypeDataset);
                    console.log(thisTypeSeries);

                    //Bind the new data set to paths, overwriting old bound data.
                    var paths = d3.selectAll("#types path")
                        .data(thisTypeSeries, key)
                        .classed("unclickable", true);

                    //Transition areas into new positions (i.e., thisType's area
                    //will go to a zero baseline; all others will flatten out).
                    //
                    //Store this transition in a new variable for later reference.
                    var areaTransitions = paths.transition()
                        .duration(1000)
                        .attr("d", area);

                    //Update scale
                    yScale.domain([
                        0,
                        d3.max(thisTypeDataset, function (d) {
                            var sum = 0;

                            //Calculate the total (sum) of sales of this type,
                            //ignoring the others (for now)
                            sum += d[thisType];

                            return sum;
                        })
                    ]);

                    //Append this transition to the one already in progress
                    //(from above).  Transition areas to newly updated scale.
                    areaTransitions.transition()
                        .delay(200)
                        .on("start", function () {

                            //Transition axis to new scale concurrently
                            d3.select("g.axis.y")
                                .transition()
                                .duration(1000)
                                .call(yAxis);

                        })
                        .duration(1000)
                        .attr("d", area)
                        .transition()
                        .on("start", function () {
                            //Make areas visible instantly, so
                            //they are revealed when this fades out
                            d3.selectAll("g#Areas_ha path")
                                .attr("opacity", 1);
                        })
                        .duration(1000)
                        .attr("opacity", 0)
                        .on("end", function (d, i) {
                            //Reveal back button
                            if (i === 0) {
                                toggleBackButton();
                            }
                        });

                    //Get all possible keys (make + model), but toss out 'date'
                    var keysAll = Object.keys(dataset[0]).slice(1);
                    console.log(keysAll);

                    //Loop once for each key, and save out just the ones of thisType (e.g. BEVs)
                    var keysOfThisType = [];
                    for (let i = 0; i < keysAll.length; i++) {
                        if (dataset[0][keysAll[i]].mining_type === thisType) {
                            keysOfThisType.push(keysAll[i]);
                        }
                    }
                    console.log(keysOfThisType);

                    //Give the new keys to the stack function
                    areaStack.keys(keysOfThisType)
                        .value(function value(d, key) {
                            return d[key].area_val;
                        });

                    //Stack the data and log it out
                    var areaSeries = areaStack(dataset);
                    console.log(areaSeries);

                    //Create areas for individual areas
                    svg.select("g#Areas_ha")
                        .selectAll("path")
                        .data(areaSeries, key)
                        .enter()
                        .append("path")
                        .attr("class", "area")
                        .attr("opacity", 0)
                        .attr("d", area)
                        .attr("fill", function (d, i) {

                            //Which area is this?
                            var thisKey = d.key;

                            //What 'type' is this area?
                            var thisType = d[0].data[thisKey].mining_type;
                            console.log(thisType);

                            //Used to find a cool color below
                            var spread = 0.45;
                            var startingPoint;

                            //Choose where in the color spectrum we start, based on type
                            // switch (thisType) {
                            // 	case "Heavy_Machinery":
                            // 		startingPoint = 0;
                            // 		break;

                            // 	case "Suction_Pumps":
                            // 		startingPoint = 0.35;
                            // 		break;
                            // }
                            switch (thisType) {
                                case "Blues":
                                    startingPoint = 0;
                                    break;

                                case "country":
                                    startingPoint = 0.05;

                                    break;
                                case "Easy_Listening":
                                    startingPoint = 0.1;

                                    break;

                                case "Experimental":
                                    startingPoint = 0.15;

                                    break;
                                case "Instrumental":
                                    startingPoint = 0.2;

                                    break;

                                case "International":
                                    startingPoint = 0.25;

                                    break;
                                case "Pop":
                                    startingPoint = 0.3;

                                    break;

                                case "Rock":
                                    startingPoint = 0.35;

                                    break;
                                case "Soul_RnB":
                                    startingPoint = 0.40;

                                    break;
                                case "Spoken":
                                    startingPoint = 0.45;

                                    break;
                            }

                            //How many areas?
                            var numAreas_ha = keysOfThisType.length;

                            //Get a value between 0.0 and 1.0
                            var normalized = startingPoint + ((i / numAreas_ha) * spread);

                            //Get that color on the spectrum
                            return d3.interpolateCool(normalized);
                        })
                        .on("click", function (d) {

                            //Update view state
                            viewState++;

                            //Hide the back button during this view transition
                            toggleBackButton();

                            //Which area was clicked?
                            var thisType = d.key;

                            // Update description
                            description.text(thisType.capitalize().replace('_', ' '));

                            //Fade out all other areas
                            d3.selectAll("g#Areas_ha path")
                                .classed("unclickable", true)  //Prevent future clicks
                                .filter(function (d) {  //Filter out 'this' one
                                    if (d.key !== thisType) {
                                        return true;
                                    }
                                })
                                .transition()
                                .duration(1000)
                                .attr("opacity", 0);

                            //Define area generator that will be used just this one time
                            var singleArea_ha_Area = d3.area()
                                .x(function (d) {
                                    return xScale(d.data.date);
                                })
                                .y0(function (d) {
                                    return yScale(0);
                                })  //Note zero baseline
                                .y1(function (d) {
                                    return yScale(d.data[thisType].area_val);
                                });
                            //Note y1 uses the raw 'sales' value for 'this' area,
                            //not the stacked data values (e.g., d[0] or d[1]).

                            //Use this new area generator to transition the area downward,
                            //to have a flat (zero) baseline.
                            var thisAreaTransition = d3.select(this)
                                .transition()
                                .delay(1000)
                                .duration(1000)
                                .attr("d", singleArea_ha_Area);

                            //Update y scale domain, based on the sales for this area only
                            yScale.domain([
                                0,
                                d3.max(dataset, function (d) {
                                    return d[thisType].area_val;
                                })
                            ]);

                            //Transitions the clicked area and y axis into place, to fit the new domain
                            thisAreaTransition
                                .transition()
                                .duration(1000)
                                .attr("d", singleArea_ha_Area)
                                .on("start", function () {
                                    //Transition axis to new scale concurrently
                                    d3.select("g.axis.y")
                                        .transition()
                                        .duration(1000)
                                        .call(yAxis);

                                })
                                .on("end", function () {
                                    //Restore clickability (is that a word?)
                                    d3.select(this).classed("unclickable", "false");

                                    //Reveal back button
                                    toggleBackButton();
                                });

                        })

                        .append("title")  //Make tooltip
                        .text(function (d) {
                            return d.key;
                        });

                })
                .append("title")  //Make tooltip
                .text(function (d) {
                    return d.key;
                });

            //Create axes
            svg.append("g")
                .attr("class", "axis x")
                .attr("transform", "translate(0," + (h - padding) + ")")
                .call(xAxis);

            svg.append("text")
                .attr("transform", "translate(" + (w / 2) + " ," +
                    (h) + ")")
                .style("text-anchor", "middle")
                .text("Date");

            svg.append("g")
                .attr("class", "axis y")
                .attr("transform", "translate(" + (w - padding * 3) + ",0)")
                .call(yAxis);

            svg.append("text")
                // this makes it easy to centre the text as the transform is applied to the anchor
                .attr("text-anchor", "middle")
                // text is drawn off the screen top left, move down and out and rotate
                .attr("transform", "translate(" + (w) + "," + (h / 2) + ")rotate(-90)")
                .text("Hotness");

            // Add title
            description = svg.append("text")
                .attr("x", (w / 4))
                .attr("y", (h / 4))
                .attr("text-anchor", "middle")
                .style("font-size", "16px");


            //Create back button
            var backButton = svg.append("g")
                .attr("id", "backButton")
                .attr("opacity", 0)				//Initially hidden
                .classed("unclickable", true)	//Initially not clickable
                .attr("transform", "translate(" + xScale.range()[0] + "," + yScale.range()[1] + ")");

            backButton.append("rect")
                .attr("x", 0)
                .attr("y", 0)
                .attr("rx", 5)
                .attr("rx", 5)
                .attr("width", 70)
                .attr("height", 30);

            backButton.append("text")
                .attr("x", 7)
                .attr("y", 20)
                .html("&larr; Back");

            //Define click behavior
            backButton.on("click", function () {

                //Hide the back button, as it was just clicked
                toggleBackButton();

                if (viewState === 1) {
                    //Go back to default view

                    // Update text to general
                    updateGenreText('genres');
                    description.text('');

                    //Update view state
                    viewState--;

                    //Re-bind type data and fade in types
                    var typeAreaTransitions = d3.selectAll("g#types path")
                        .data(typeSeries, key)
                        .transition()
                        .duration(250)
                        .attr("opacity", 1)
                        .on("end", function () {
                            //Remove all Areas_ha once this fades in;
                            //they will be recreated later as needed.
                            d3.selectAll("g#Areas_ha path").remove();
                        });

                    //Set y scale back to original domain
                    yScale.domain([
                        0,
                        d3.max(typeDataset, function (d) {
                            let sum = 0;

                            //Loops once for each row, to calculate
                            //the total (sum) of sales of all areas
                            for (let i = 0; i < types.length; i++) {
                                sum += d[types[i]];
                            }

                            return sum;
                        })
                    ]);

                    //Transition type areas and y scale back into place
                    typeAreaTransitions.transition()
                        .duration(1000)
                        .on("start", function () {

                            //Transition axis to new scale concurrently
                            d3.select("g.axis.y")
                                .transition()
                                .duration(1000)
                                .call(yAxis);

                        })
                        .attr("d", area)
                        .on("end", function () {
                            d3.select(this).classed("unclickable", false);
                        });

                } else if (viewState === 2) {
                    //Go back to areas view

                    //Update view state
                    viewState--;

                    //Restore the old y scale
                    yScale.domain([
                        0,
                        d3.max(thisTypeDataset, function (d) {
                            var sum = 0;

                            //Calculate the total (sum) of sales of this type
                            sum += d[viewType];

                            return sum;
                        })
                    ]);

                    //Transition the y axis and visible area back into place
                    d3.selectAll("g#Areas_ha path")
                        .transition()
                        .on("start", function (d, i) {
                            //Transition y axis to new scale concurrently
                            description.text(d.key.split(' ')[0]);
                            d3.select("g.axis.y")
                                .transition()
                                .duration(1000)
                                .call(yAxis);

                        })
                        .duration(1000)
                        .attr("d", area)  //Effectively changes only the selected area
                        .transition()
                        .duration(1000)
                        .attr("opacity", 1)  //Fade in all areas
                        .on("end", function (d, i) {
                            //Restore clickability
                            d3.select(this).classed("unclickable", false);

                            //Reveal back button
                            if (i === 0) {
                                toggleBackButton();
                            }

                        });

                }

            });

        });


    let toggleBackButton = function () {
        //Select the button
        var backButton = d3.select("#backButton");

        //Is the button hidden right now?
        var hidden = backButton.classed("unclickable");

        //Decide whether to reveal or hide it
        if (hidden) {
            //Reveal it
            //Set up dynamic button text
            var buttonText = "&larr; Back to ";
            // var buttonTextInfo = "&larr; Current View ";
            //Text varies by mode and type
            if (viewState === 1) {
                buttonText += "Genres";
            }
            // buttonTextInfo += "all types";
            // } else 
            if (viewState == 2) {
                buttonText += "Genres + Artist";
                // buttonTextInfo += "all " + viewType + " Areas_ha"
            }

            //Set text
            backButton.select("text").html(buttonText);
            // backButtonIz.select("text").html(buttonTextInfo);

            //Resize button depending on text width
            var rectWidth = Math.round(backButton.select("text").node().getBBox().width + 16);
            backButton.select("rect").attr("width", rectWidth);
            var rectWidth = Math.round(backButton.select("text").node().getBBox().width + 16);
            backButton.select("rect").attr("width", rectWidth);

            //Fade button in
            backButton.classed("unclickable", false)
                .transition()
                .duration(500)
                .attr("opacity", 1);

        } else {
            //Hide it
            backButton.classed("unclickable", true)
                .transition()
                .duration(200)
                .attr("opacity", 0);

        }
    };

};



