const DATA_PATH = 'assets/csv/tsne.csv';
const CLUSTERS = 8;
const RANGE = [-6, 6];
const COLORS = ['black', 'red', 'darkblue', 'green', 'coral',
    'brown', 'gray', 'orange'];


document.addEventListener("DOMContentLoaded", function () {
    initializeCluster();
});

let initializeCluster = () => {
    Plotly.d3.csv(DATA_PATH, (err, rows) => {
        let dict = [];

        for (let i = 0; i < CLUSTERS; i++) {
            dict[i] = rows.filter((d) => {
                return parseInt(d.cluster) === i;
            });
        }

        let unpack = (rows, key) => {
            return rows.map(function (row) {
                return row[key];
            });
        };

        let getRandomColor = () => {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        };

        let getTooltipText = (points) => {
            return points.map((point) => {
                let artist_text = 'Artist : ' + point.artist_name;
                let track_text = 'Title : ' + point.track_title;
                let album_text = 'Album : ' + point.album_title;
                let album_year_text = 'Year : ' + point.year;
                let genre_text = 'Genre : ' + point.genre_parent;
                return  '<b>' + artist_text + '<br>' + track_text + '<br>' + album_text +
                    '<br>' + album_year_text + '<br>' + genre_text + '</b>';
            });
        };


        let data = dict.map((cluster, index) => {
            let cluster_num = index + 1;
            return {
                x: unpack(cluster, 'x'),
                y: unpack(cluster, 'y'),
                z: unpack(cluster, 'z'),
                mode: 'markers',
                marker: {
                    size: 2,
                    color: COLORS[index],
                    line: {
                        color: COLORS[index],
                        width: 0.1
                    },
                    opacity: 0.9
                },
                type: 'scatter3d',
                name: 'Cluster ' + cluster_num,
                text: getTooltipText(cluster),
                hoverinfo: "text+name",
                hoverlabel: {
                    // bgcolor: COLORS[index],
                    bgcolor: 'white',
                    bordercolor: 'black',
                    // bordercolor: COLORS[index],
                    font: {
                        color: COLORS[index],
                        // color: 'white',
                        size: '15px'
                    }
                }
            };
        });

        let layout = {
            title: 'Music cluster',
            paper_bgcolor: 'transparent',
            legend: {
                xanchor: 12,
                borderwidth: 2,
                font: {
                    size: '15px',
                    color: 'black'
                },
                x: 1,
                y: 0.5,
            },
            margin: {
                l: 0,
                r: 0,
                b: 0,
                t: 0,
                pad: 4
            },
            autosize: true,
            scene: {
                xaxis: {
                    range: RANGE,
                    showbackground: false,
                    zeroline: false,
                    ticks: false,
                    showgrid: false,
                    showspikes: false,
                    showticklabels: false,
                    showtickprefix: false,
                    showexponent: false
                },
                yaxis: {
                    range: RANGE,
                    showbackground: false,
                    zeroline: false,
                    ticks: false,
                    showgrid: false,
                    showspikes: false,
                    showticklabels: false,
                    showtickprefix: false,
                    showexponent: false
                },
                zaxis: {
                    range: RANGE,
                    showbackground: false,
                    zeroline: false,
                    ticks: false,
                    showgrid: false,
                    showspikes: false,
                    showticklabels: false,
                    showtickprefix: false,
                    showexponent: false
                }
            }
        };
        console.log(data);
        Plotly.newPlot('music_cluster', data, layout, {
            modeBarButtons: [['toImage'], ['zoom3d'], ['pan3d'], ['resetCameraDefault3d'], ['hoverClosest3d']],
            displaylogo: false,
            watermark: false,
            responsive: true,
        });
    }
    );
};

