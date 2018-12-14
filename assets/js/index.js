Plotly.d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/3d-scatter.csv', function (err, rows) {
    function unpack(rows, key) {
        return rows.map(function (row) {
            return row[key];
        });
    }

    let trace1 = {
        x: unpack(rows, 'x1'),
        y: unpack(rows, 'y1'),
        z: unpack(rows, 'z1'),
        mode: 'markers',
        marker: {
            size: 12,
            line: {
                color: 'rgba(217, 217, 217, 0.14)',
                width: 0.5
            },
            opacity: 0.8
        },
        type: 'scatter3d'
    };

    let trace2 = {
        x: unpack(rows, 'x2'),
        y: unpack(rows, 'y2'),
        z: unpack(rows, 'z2'),
        mode: 'markers',
        marker: {
            color: 'rgb(127, 127, 127)',
            size: 12,
            symbol: 'circle',
            line: {
                color: 'rgb(204, 204, 204)',
                width: 1
            },
            opacity: 0.8
        },
        type: 'scatter3d'
    };

    let data = [trace1, trace2];
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
                // showbackground: false,
                zeroline: false,
                ticks: false,
                showgrid: true,
                // showspikes: false,
                // showticklabels: false,
                // showtickprefix: false,
                showexponent: false
            },
            yaxis: {
                // showbackground: false,
                zeroline: false,
                ticks: false,
                showgrid: true,
                showspikes: false,
                showticklabels: false,
                showtickprefix: false,
                showexponent: false
            },
            zaxis: {
                // showbackground: false,
                zeroline: false,
                ticks: false,
                showgrid: true,
                // showspikes: false,
                // showticklabels: false,
                // showtickprefix: false,
                showexponent: false
            }
        }
    };
    Plotly.newPlot('music_cluster', data, layout);
});