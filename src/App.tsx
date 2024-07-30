import { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { Color, Data, Layout } from "plotly.js";


function App() {
  const [data, setData] = useState<Data[] | null>(null);
  const layout: Partial<Layout> = {
    xaxis: {
      type: 'log',
      autorange: true
    },
    yaxis: {
      type: 'log',
      autorange: true
    },
    updatemenus: [{
      y: 0.8,
      yanchor: 'top',
      buttons: [{
        method: 'restyle',
        args: ['line.color', 'red'],
        label: 'red',
      }, {
        method: 'restyle',
        args: ['line.color', 'blue'],
        label: 'blue'
      }, {
        method: 'restyle',
        args: ['line.color', 'green'],
        label: 'green'
      }]
    }, {
      y: 1,
      yanchor: 'top',
      buttons: [{
        method: 'restyle',
        args: ['visible', [true, false, false, false]],
        label: 'Data set 0'
      }, {
        method: 'restyle',
        args: ['visible', [false, true, false, false]],
        label: 'Data set 1'
      }, {
        method: 'restyle',
        args: ['visible', [false, false, true, false]],
        label: 'Data set 2'
      }, {
        method: 'restyle',
        args: ['visible', [false, false, false, true]],
        label: 'Data set 3'
      }]
    }],
  };
  const [update, setUpdate] = useState<Color[]>([]);
  const [horizontalBarData, setHorizontalBarData] = useState<Data[]>([{
    type: 'bar',
    x: [20, 14, 10, 5, 3, -2, -5],
    y: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    orientation: 'h',
    // marker: { color: "green" }
  }]);

  useEffect(() => {
    setData([
      {
        x: [0, 0, 1, 2, 3, 4, 5, 6, 7, 8],
        // y: [8, 7, 6, 5, 4, 3, 2, 1, 0],
        y: [0, 1, 0, 3, 4, 5, 6, 7, 8, 9],
        type: 'scatter'
      },
      {
        x: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        y: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        type: 'scatter'
      }
    ]);
  }, []);

  function makeTrace() {
    const arr = [0, 1, 2, 3, 4];

    return arr.map(n => {
      return {
        y: [...Array(10)].map(() => Math.random()),
        line: {
          shape: 'spline',
          color: 'red'
        },
        visible: n === 0,
        name: 'Data set ' + n,

      };
    });
  }

  if (!data) {
    return null;
  }


  return (
    <>
      <h2>Stacked</h2>
      <Plot
        data={[
          {
            x: ['giraffes', 'orangutans', 'monkeys'],
            y: [20, 14, 23],
            name: 'SF Zoo',
            type: 'bar'
          },
          {
            x: ['giraffes', 'orangutans', 'monkeys'],
            y: [12, 18, 29],
            name: 'LA Zoo',
            type: 'bar'
          }
        ]}
        layout={{ barmode: "stack" }}
        config={{ scrollZoom: true, displaylogo: false }}
      />

      <h2>Horizontal bar chart</h2>
      <Plot
        data={horizontalBarData}
        layout={{ title: "", yaxis: { categoryorder: 'category descending' }, hoverlabel: { bgcolor: "red", font: { color: "black" } } }}
        config={{ scrollZoom: true, displaylogo: false }}
        onHover={data => {
          let pointNumber = 0;
          const colors: Color[] = [];

          for (let i = 0; i < data.points.length; i++) {
            pointNumber = data.points[i].pointNumber;
          }

          colors[pointNumber] = '#C54C82';
          setUpdate(colors);
          setHorizontalBarData((prev) => {
            prev[0].marker = { color: colors };
            return prev;
          });
        }}
      />



      <h2>Filter</h2>
      <Plot
        data={makeTrace()}
        layout={layout}
        config={{ scrollZoom: true, displaylogo: false }}
      />


      <h2>Log plot</h2>
      <Plot
        data={[
          // {
          //   x: [0, 1, 2, 3, 4, 5, 6, 7, 8],
          //   y: [8, 7, 6, 5, 4, 3, 2, 1, 0],
          //   type: 'scatter'
          // },
          // {
          //   x: [0, 1, 2, 3, 4, 5, 6, 7, 8],
          //   y: [8, 7, 5, 4, 3, 2, 1, 0],
          //   type: 'scatter'
          // },
          {
            x: [1, 2, 3, 4, 5, 6, 7, 8],
            y: [1, 2, 3, 4, 5, 6, 7, 8],
            type: 'scatter'
          },
          {
            x: [2, 4, 5, 6, 7, 8],
            y: [1, 3, 4, 5, 6, 7,],
            type: 'scatter'
          },
          {
            x: [1, 2, 3, 4, 5, 6],
            y: [3, 4, 5, 6, 7, 8],
            type: 'scatter'
          },
        ]}
        layout={{
          // xaxis: {
          //   type: 'log',
          //   autorange: true
          // },
          yaxis: {
            type: 'log',
            autorange: true
          }
        }}
        config={{ scrollZoom: true, displaylogo: false }}
      />
    </>
  );
}
export default App;