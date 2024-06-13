import { useState, useEffect } from 'react';
import { resumenFinanzas, resumenControlAnual } from '../services/finanzasServices';
import Header from './Header';
import ListaGastos from './ListaGastos';
import { notificarExito, notificarError } from '../utilis/notificaciones';

const Finanzas = () => {
    const [fechaInicial, setFechaInicial] = useState('');
    const [fechaFinal, setFechaFinal] = useState('');
    const [finanzas, setFinanzas] = useState([{ porcentaje: '', nombre: '', monto: 0 }]);
    const [finanzasAnual, setFinanzasAnual] = useState([]);
    const [actualizarFinanzas, setActualizarFinanzas] = useState(false)

    const resumenCAnual = async() => {  
        try {
            const response = await resumenControlAnual()
            setFinanzasAnual(response.data)
            setActualizarFinanzas(false);
        } catch (error) {
            console.log(error)
        }
    }

    const resumenF = async() => {  
        try {
            console.log("Click", fechaInicial, fechaFinal)
            const fechas = {
                fechaInicio: fechaInicial,
                fechaFin: fechaFinal
            }

            if(!fechas.fechaInicio || !fechas.fechaFin){
                notificarError('Debe selecionar el rango de fechas, tanto Fecha inicial y final');
            }else{
                const response = await resumenFinanzas(fechas)
                notificarExito('Resumen de finanzas existoso');
                console.log(response.data)
                setFinanzas(response.data)
            }
        } catch (error) {
            notificarError(error)
        }
    }

    const handleSubmit = () => {
        console.log("Click", fechaInicial, fechaFinal)
        resumenF();
        console.log(finanzas)
    };

    useEffect(() => {
        resumenCAnual();
    }, [finanzas, actualizarFinanzas])

    const actualizarFinanzasAnuales = () => {
        setActualizarFinanzas(true);
    }

    return (
        <>
        <Header></Header>
        <div className=" min-h-screen flex items-center justify-center bg-primary bg-opacity-80 bg-perroFacturando bg-cover">
            <div className="md:container md:mx-auto p-5">
                <div className="container items-center bg-opacity-90 bg-white">
                    <h1 className="text-black text-3xl p-3 m-5 text-center">Resumen de finanzas por rango de fechas </h1>
                </div>
                <div className="container bg-amber-800 bg-opacity-95 items-center justify-center text-center rounded-md">
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
                            {finanzas.map((item, index) => (
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
                            {finanzasAnual.map((item, index) => (
                                <tr key= {index} className="odd:bg-white even:bg-gray-100">
                                  <td className="border border-slate-300 p-2">{item.descripcion}</td>
                                  <td className="border border-slate-300 p-2">${item.monto}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <ListaGastos
                actualizarFinanzasAnuales= {actualizarFinanzasAnuales}
                ></ListaGastos>
            </div>
        </div>
        </>
    );
};

export default Finanzas;
