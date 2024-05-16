import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function EOQChart({ demandas, costoAlInventario }) {
    const chartRef = useRef(null);

    useEffect(() => {
        const calcularCantidadOptima = (tasaDeDemanda, costoAlInventario) => {
            return Math.sqrt((2 * tasaDeDemanda * costoAlInventario) / costoAlInventario);
        };

        // Calcula la cantidad óptima de pedido (Q) para cada demanda
        const cantidadOptima = demandas.map(demanda => calcularCantidadOptima(demanda, costoAlInventario));

        // Configura el gráfico
        const ctx = chartRef.current.getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: demandas,
                datasets: [{
                    label: 'Cantidad Óptima de Pedido (Q)',
                    data: cantidadOptima,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            },
            options: {
                scales: {
                    x: {
                        type: 'linear',
                        position: 'bottom',
                        title: {
                            display: true,
                            text: 'Demanda'
                        }
                    },
                    y: {
                        min: 0,
                        title: {
                            display: true,
                            text: 'Cantidad Óptima de Pedido (Q)'
                        }
                    }
                }
            }
        });

        // Limpia el gráfico al desmontar el componente para evitar pérdidas de memoria
        return () => {
            myChart.destroy();
        };
    }, [demandas, costoAlInventario]);

    return <canvas ref={chartRef} />;
}

export default EOQChart;
