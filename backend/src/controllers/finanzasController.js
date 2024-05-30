import sequelize from '../database/database.js'
import Cita from '../models/citaModel.js';
import { Op } from 'sequelize';

export const resumenFinanzas = async (req, res) => {
    const {fechaInicio , fechaFin} = req.body
    try {
        const result = await Cita.findAll({
          attributes: [
            [sequelize.fn('SUM', sequelize.literal('"MontoTotal" -2000')), 'TotalGanancias']
          ],
          where:{
            FechaYHora:{
              [Op.between]: [fechaInicio,fechaFin]
            }
          },
        })

        const totalGanancias = result[0].dataValues.TotalGanancias
        const distribucion = [
          {nombre: 'Vivian', porcentaje: 45, monto: totalGanancias * 0.45 },
          {nombre: 'Kathy', porcentaje: 35, monto: totalGanancias * 0.35},
          {nombre: 'La Bandada', porcentaje: 20, monto: totalGanancias * 0.20}
        ]
        return res.json({
          ok: true,
          status: 200,
          message: "Resumen de finanzas obtenido correctamente",
          data: {distribucion: distribucion, totalGanancias: totalGanancias}
        })
      } catch (error) {
        return res.json({
          ok: false,
          status: 404,
          message: "Error al obtener el resumen de finanzas",
          data: {distribucion: distribucion, totalGanancias: totalGanancias}
        })
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
        }
      },
    })

    const totalGanancias = result[0].dataValues.TotalGanancias
    const totalAguinaldo = result[0].dataValues.AguinaldoTotal
    const resumenAnual = [
      {descripcion: 'Total para aguinaldo', monto: parseInt(totalAguinaldo) },
      {descripcion: 'Aguinaldo para Vivian', monto: totalAguinaldo * 0.5},
      {descripcion: 'Aguinaldo para Kathy', monto: totalAguinaldo * 0.5},
      {descripcion: 'Totla 20% para la Bandada', monto: totalGanancias * 0.20}
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
        data: {distribucion: distribucion, totalGanancias: totalGanancias}
      })
    }
};

