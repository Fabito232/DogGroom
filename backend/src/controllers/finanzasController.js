import sequelize from '../database/database.js'
import Cita from '../models/citaModel.js';
import Gasto from '../models/gastosModel.js';
import { Op, and } from 'sequelize';

export const createGasto = async (req, res) => {

  try {
      const gasto = await Gasto.create({
          Descripcion: req.body.descripcion,
          Fecha: req.body.fecha,
          Monto: req.body.monto,
      });
      return res.json({
          ok: true,
          status: 200,
          message: "Gasto creado correctamente",
          data: gasto
      });
  } catch (error) {
      console.error("Error al crear el Gasto:", error);
      return res.json({
          ok: false,
          status: 400,
          message: "Error al crear el Gasto"
      });
  }
}

export const getGasto = async (req, res) => {
  try {
      const id = req.params.id
      const gasto = await Gasto.findByPk(id);
      if (gasto !== null) {
          return res.json({
              ok: true,
              status: 200,
              message: "Se obtuvo la Gasto correctamente",
              data: gasto
          });
      } else {
          return res.status(404).json({
              ok: false,
              status: 404,
              message: "No se encontró la Gasto con el ID proporcionado",
          });
      }
  } catch (error) {
      return res.status(500).json({
          ok: false,
          status: 500,
          message: "Error al obtener la Gasto",
          error: error.message
      });
  }
};


export const getListGasto = async (req, res) => {
  try {
      const gastos = await Gasto.findAll()
      if (gastos.length !== 0) {
          return res.json({
              ok: true,
              status: 200,
              message: "Se obtuvo todos las Gasto correctamente",
              data: gastos
          });
      } else {
          return res.status(404).json({
              ok: false,
              status: 404,
              message: "No se encontro ningun Gasto",
          });
      }
  } catch (error) {
      return res.json({
          ok: false,
          status: 500,
          message: "Error al obtener los Gastos"
      })
  }
}

export const deleteGasto = async (req, res) => {
  
  try {
      const id = req.params.id
      const gasto = await Gasto.destroy({
          where:{
              ID_Gasto: id
          }
      })
      return res.json({
          ok: true,
          status: 200,
          message: "Se borro la Gasto correctamente",
          data: gasto
      })
  } catch (error) {
      return res.json({
          ok: false,
          status: 500,
          message: "No se borro la Gasto",
      })
  }
}

export const updateGasto = async (req, res) => {
    
  try {
      const id = req.params.id
      const [filasActualizadas]  = await Gasto.update(
          {
            Descripcion: req.body.descripcion,
            Fecha: req.body.fecha,
            Monto: req.body.monto,
          },
          {
              where:{
                  ID_Gasto: id
              }
          })
          if (filasActualizadas > 0) {
              return res.json({
                  ok: true,
                  status: 200,
                  message: "Se obtuvo los gastos correctamente",
              });
          } else {
              return res.status(404).json({
                  ok: false,
                  status: 404,
                  message: "No se encontró el gasto con el ID proporcionado",
              });
          }
  } catch (error) {
      return res.json({
          ok: false,
          status: 500,
          message: "No se actualizo el gasto",
          error: error.message
      })
  }
}

export const resumenFinanzas = async (req, res) => {
  const { fechaInicio, fechaFin } = req.body;
  let totalGanancias = 0;
  
  try {
    const result = await Cita.findAll({
      attributes: [
        [sequelize.fn('SUM', sequelize.literal('"MontoTotal" - 2000')), 'TotalGanancias']
      ],
      where: {
        FechaYHora: {
          [Op.between]: [fechaInicio, fechaFin]
        },
        Estado: false
      },
    });

    console.log(fechaInicio, fechaFin);
    totalGanancias = parseFloat(result[0].dataValues.TotalGanancias) || 0;
    console.log(totalGanancias);
    
    const distribucion = [
      { nombre: 'Vivian', porcentaje: "45%", monto: (totalGanancias * 0.45).toFixed(2) },
      { nombre: 'Kathy', porcentaje: "35%", monto: (totalGanancias * 0.35).toFixed(2) },
      { nombre: 'La Bandada', porcentaje: "20%", monto: (totalGanancias * 0.20).toFixed(2) },
      { nombre: '', porcentaje: "Total", monto: totalGanancias.toFixed(2) },
    ];

    return res.json({
      ok: true,
      status: 200,
      message: "Resumen de finanzas obtenido correctamente",
      data: distribucion
    });
  } catch (error) {
    return res.json({
      ok: false,
      status: 404,
      message: "Error al obtener el resumen de finanzas",
      data: { distribucion: distribucion, totalGanancias: totalGanancias.toFixed(2) }
    });
  }
};


export const resumenControlAnual = async (req, res) => {
  try {
    const result = await Cita.findAll({
      attributes: [
        [sequelize.literal('COUNT(*) * 2000'), 'AguinaldoTotal'],
        [sequelize.fn('SUM', sequelize.literal('"MontoTotal" -2000')), 'TotalGanancias']
      ],
      where:{
        FechaYHora:{
          [Op.between]: [
            new Date(new Date().getFullYear(),0,1),
            new Date(new Date().getFullYear(),11,31)
          ]
        },
        Estado: false
      },
    })

    let totalGastos = await Gasto.sum('Monto',{
      where: {
        Fecha:{
          [Op.between]: [
            new Date(new Date().getFullYear(),0,1),
            new Date(new Date().getFullYear(),11,31)
          ]
        }
      }
    });

    if (!totalGastos) totalGastos = 0

    const totalGanancias = result[0].dataValues.TotalGanancias
    const totalAguinaldo = result[0].dataValues.AguinaldoTotal
    const resumenAnual = [
      {descripcion: 'Total para aguinaldo', monto: parseInt(totalAguinaldo) },
      {descripcion: 'Aguinaldo para Vivian', monto: totalAguinaldo * 0.5},
      {descripcion: 'Aguinaldo para Kathy', monto: totalAguinaldo * 0.5},
      {descripcion: 'Total 20% para La Bandada', monto: totalGanancias * 0.20},
      {descripcion: 'Total de gastos', monto: totalGastos},
      {descripcion: 'Saldo en caja La Bandada', monto: (totalGanancias * 0.20) - totalGastos},
    ]
      return res.json({
        ok: true,
        status: 200,
        message: "Resumen de control anual obtenido correctamente",
        data: resumenAnual
      })
    } catch (error) {
      return res.json({
        ok: false,
        status: 404,
        message: "Error al obtener el resumen de control anual",
        data: resumenAnual
      })
    }
};

