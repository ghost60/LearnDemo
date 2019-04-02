import { Chart, Geom, Axis, Tooltip } from "bizcharts";
import React from "react";

export default function PCharts(props){
    const cols = {
      sales: {
        tickInterval: 0.00001
      }
    };
    return (
      <div>
        <Chart
          height={324}
          data={props.data}
          scale={cols}
          forceFit
        >
          <Axis name="x" />
          <Axis name="y" />
          <Tooltip
            crosshairs={{
              type: "y"
            }}
          />
          <Geom
            type={props.type}
            position="x*y"
          />
        </Chart>
      </div>
    );
  }