import { Line } from 'react-chartjs-2';

const Graph = ({ data }) => {
  const defaultData = {
    labels: [],
    datasets: [
      {
        label: 'Sample Data',
        data: [],
      },
    ],
  };

  return (
    <div className="bg-gray-800 p-4 rounded-md" style={{ height: '400px' }}>
      <Line data={data || defaultData} options={{ maintainAspectRatio: false }} />
    </div>
  );
};

export default Graph;
