import * as React from 'react';
import cubejs from '@cubejs-client/core';
import { QueryRenderer } from '@cubejs-client/react';
import { Spin } from 'antd';
import { Chart, Axis, Tooltip, Geom, Coord, Legend } from 'bizcharts';
import { ChartProps } from '../types/Props';


const BarChart = ({query, pivotConfig, apiKey} : ChartProps) => {
    const stackedChartData = (resultSet) => {
        const data = resultSet.pivot().map(
          ({ xValues, yValuesArray }) =>
            yValuesArray.map(([yValues, m]) => ({
              x: resultSet.axisValuesString(xValues, ', '),
              color: resultSet.axisValuesString(yValues, ', '),
              measure: m && Number.parseFloat(m)
            }))
        ).reduce((a, b) => a.concat(b), []);
      
        return data;
      }
      
      const barRender = ({ resultSet }) => (
        <Chart scale={{ x: { tickCount: 8 } }} height={400} data={stackedChartData(resultSet)} forceFit>
          <Axis name="x" />
          <Axis name="measure" />
          <Tooltip />
          <Geom type="interval" position={`x*measure`} color="color" />
        </Chart>
      );
      
      const API_URL = "http://localhost:4000"; // change to your actual endpoint
      
      const cubejsApi = cubejs(
        apiKey,
        { apiUrl: API_URL + "/cubejs-api/v1" }
      );
      
      const renderChart = (Component, query, pivotConfig) => ({ resultSet, error }) => {
        return (
          (resultSet && (
            <Component
              resultSet={resultSet}
              pivotConfig={pivotConfig}
            />
          )) ||
          (error && error.toString()) || <Spin />
        );
      };

  return (
    <QueryRenderer
      query={query}
      cubejsApi={cubejsApi}
      resetResultSetOnChange={false}
      render={renderChart(
        barRender, 
        query, 
        pivotConfig
      )}
    />
  );
};

export default BarChart;
