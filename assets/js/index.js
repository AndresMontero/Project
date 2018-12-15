const DATA_PATH = 'assets/csv/test.csv';
const CLUSTERS = 8;

document.addEventListener("DOMContentLoaded", function () {
    initializeCluster();
});

let initializeCluster = () => {
    Plotly.d3.csv(DATA_PATH, (err, rows) => {
        let dict = [];

        for (let i = 0; i < CLUSTERS; i++) {
            let data = rows.filter((d) => {
                return d.cluster === i.toString();
            });

            dict[i] = data;
        }

        function unpack(rows, key) {
            return rows.map(function (row) {
                return row[key];
            });
        }

        function getRandomColor() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }


        let data = dict.map((cluster) => {
            return {
                x: unpack(cluster, 'x'),
                y: unpack(cluster, 'y'),
                z: unpack(cluster, 'z'),
                artist_name: unpack(cluster, 'artist_name'),
                mode: 'markers',
                marker: {
                    size: 12,
                    line: {
                        color: getRandomColor(),
                        width: 0.5
                    },
                    opacity: 0.8
                },
                type: 'scatter3d'
            };
        });

    let layout = {
        title: 'Music cluster',
        paper_bgcolor: 'rgb(5,65,65)',
        legend: {
            xanchor: 12,
            borderwidth: 2,
            font: {
                family: 'sans-serif',
                size: 12,
                color: 'rgb(215,215,215)'
            }
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
    Plotly.newPlot('music_cluster', data, layout);
}
)
;
}
;

