import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

const Pokemon = ({ attributes }) => {
    const options = {
        responsive: true,
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: false,
          },
        },
        scales: {
            r: {
                angleLines: {
                    display: true
                },
                suggestedMin: 0,
                suggestedMax: 100
            }
        }
    };

    const data = {
        labels: [
            attributes.stats[4].stat.name.toUpperCase(), 
            attributes.stats[1].stat.name.toUpperCase(),
            attributes.stats[2].stat.name.toUpperCase(),
            attributes.stats[3].stat.name.toUpperCase(),
            attributes.stats[0].stat.name.toUpperCase(),
            attributes.stats[5].stat.name.toUpperCase()
        ],
        datasets: [
            {
            data: [
                attributes.stats[4].base_stat,
                attributes.stats[1].base_stat,
                attributes.stats[2].base_stat,
                attributes.stats[3].base_stat,
                attributes.stats[0].base_stat,
                attributes.stats[5].base_stat
            ],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 2,
            },
        ],
    };

    return (
        <>
            <div className={`modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current modal-${attributes.types[0].type.name}`}>
                <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 rounded-t-md">
                    <button type="button"
                    className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                    data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body relative p-4">
                    <div className="flex justify-between align-middle">
                        <img className="" src={`${attributes.sprites.other["official-artwork"].front_default}`} alt=""/>
                        <div className="w-[50%]">
                            <div className="flex flex-col justify-center align-middle">
                                <h1 className="text-lightBlack text-center mr-2 mb-3">{attributes.name.toUpperCase()}</h1>
                                <div className="flex justify-center mb-3">
                                    {attributes.types.map(type => (
                                        <span className={`text-black font-medium mr-2 text-xs border border-solid px-3 py-1 tag-${type.type.name}`}>{type.type.name}</span>
                                    ))}
                                </div>
                            </div>
                            
                            <Radar data={data} options={options}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Pokemon