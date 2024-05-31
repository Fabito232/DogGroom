import { useState } from 'react';

const Finanzas = () => {
    const [fechaInicial, setFechaInicial] = useState('');
    const [fechaFinal, setFechaFinal] = useState('');

    const data = [
        { porcentaje: '45%', nombre: 'Vivian', monto: 31500 },
        { porcentaje: '35%', nombre: 'Kathy', monto: 24500 },
        { porcentaje: '20%', nombre: 'La Bandada', monto: 14000 },
        { porcentaje: 'Total', nombre: '', monto: 70000 },
    ];
    const data2 = [
        { descripcion: 'Total para aguinaldo', monto: 14000 },
        { descripcion: 'Aguinaldo para Vivian', monto: 7000 },
        { descripcion: 'Aguinaldo para Kathy', monto: 7000 },
        { descripcion: 'Total 20% para La Bandada', monto: 14000 },
    ];

    const handleSubmit = () => {
        console.log("Click", fechaInicial, fechaFinal)
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-primary bg-opacity-80 bg-perroFacturando bg-cover">
            <div className="md:container md:mx-auto p-5">
                <div className="container items-center bg-opacity-90 bg-white">
                    <h1 className="text-black text-3xl p-3 m-5 text-center">Resumen de finanzas por rango de fechas </h1>
                </div>
                <div className="container bg-amber-800 bg-opacity-95 items-center justify-center text-center">
                    <h1 className="text-white text-2xl p-3 text-left">Seleccionar rango de fechas: </h1>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-5">
                            <h2 className="text-white text-xl text-center">Fecha inicial</h2>
                            <input 
                                type="date" 
                                value={fechaInicial}
                                onChange={(e) => setFechaInicial(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                            />
                        </div>
                        <div className="text-center p-5">
                            <h2 className="text-white text-xl text-center">Fecha Final</h2>
                            <input 
                                type="date" 
                                value={fechaFinal}
                                onChange={(e) => setFechaFinal(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                            />
                        </div>
                    </div>
                    <button 
                        onClick={handleSubmit}
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg my-5">
                        Guardar Fechas
                    </button>
                </div>
                <div className="flex items-center justify-center p-5 m-5 overflow-x-auto">
                    <table className="border-collapse border border-slate-400 text-center w-full md:w-auto lg:w-3/4">
                        <thead>
                            <tr className="bg-lime-700">
                                <th className="border border-slate-300 p-2 pl-5 pr-5">%</th>
                                <th className="border border-slate-300 p-2 pl-5 pr-5">Nombre</th>
                                <th className="border border-slate-300 p-2 pl-5 pr-5">Monto</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                                    <td className="border border-slate-300 p-2">{item.porcentaje}</td>
                                    <td className="border border-slate-300 p-2">{item.nombre}</td>
                                    <td className="border border-slate-300 p-2">${item.monto}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="container items-center bg-opacity-90 bg-white">
                    <h1 className="text-black text-3xl p-3 m-5 text-center">Resumen de control anual de La Bandada </h1>
                </div>
                <div className="flex items-center justify-center p-5 m-5 overflow-x-auto">
                    <table className="border-collapse border border-slate-400 text-center bg-emerald-400 w-full md:w-auto lg:w-3/4">
                        <thead>
                            <tr className="bg-lime-700">
                                <th className="border border-slate-300 p-2 pl-5 pr-5">Descripcion</th>
                                <th className="border border-slate-300 p-2 pl-5 pr-5">Monto</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data2.map((item, index) => (
                                <tr key= {index} className="odd:bg-white even:bg-gray-100">
                                  <td className="border border-slate-300 p-2">{item.descripcion}o</td>
                                  <td className="border border-slate-300 p-2">${item.nombre}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Finanzas;
