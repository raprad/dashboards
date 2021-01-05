import * as React from 'react';
import cubejs from '@cubejs-client/core';
import { QueryRenderer } from '@cubejs-client/react';
import { Spin } from 'antd';
import { Chart, Axis, Tooltip, Geom, Coord, Legend } from 'bizcharts';
import { ChartProps } from '../types/Props';

const PieChart = ({query, pivotConfig, apiKey} : ChartProps) => {
  
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
  
  const pieRender = ({ resultSet }) => (
    <Chart height={"100%"} data={resultSet.chartPivot()} forceFit>
      <Coord type='theta' radius={0.75} />
      {resultSet.seriesNames().map(s => (<Axis name={s.key} />))}
      <Legend position='right' />
      <Tooltip />
      {resultSet.seriesNames().map(s => (<Geom type="interval" position={s.key} color="category" />))}
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
      resetResultSetOnChange={true}
      render={renderChart(
        pieRender, 
        query, 
        pivotConfig
      )}
    />
  );
};

export default PieChart;
