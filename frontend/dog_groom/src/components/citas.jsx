// src/components/Citas.js
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from 'dayjs';
import '../styles/citas.css';
import "dayjs/locale/es";
import Header from "./Header";
import { obtenerCitas } from "../services/citaServices";
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const localizer = dayjsLocalizer(dayjs);

function Citas() {
  const [events, setEvents] = useState([]);
  const location = useLocation();
  const nuevaCita = location.state?.nuevaCita;

  const fetchCitas = async () => {
    try {
      const resCitas = await obtenerCitas();
      console.log(resCitas)
      if (resCitas && resCitas.data) {
        console.log(resCitas)
        console.log(resCitas.data)
        const citasTransformadas = resCitas.data.map(cita => ({
          start: dayjs(cita.FechaYHora).toDate(),
          end: dayjs(cita.FechaYHora).add(1, 'hour').toDate(),

          title: cita.Cliente.Nombre// Asegúrate de acceder a nombreCliente correctamente

        }));
        setEvents(citasTransformadas);
      } else {
        console.error("La respuesta de obtenerCitas no contiene datos.");
      }
    } catch (error) {
      console.error("Error al obtener citas:", error);
    }
  };

  useEffect(() => {
    fetchCitas();
  }, []);

  useEffect(() => {
    if (nuevaCita) {
      console.log(nuevaCita);
      const nuevaCitaTransformada = {
        start: dayjs(nuevaCita.fechaYHora).toDate(),
        end: dayjs(nuevaCita.fechaYHora).add(1, 'hour').toDate(),
        title: nuevaCita.Cliente.nombreCliente
      };
      setEvents(prevEvents => [...prevEvents, nuevaCitaTransformada]);
    }
  }, [nuevaCita]);

  const handleEventClick = (event) => {
    alert(`
      Cliente: ${event.title}
      Fecha y Hora: ${dayjs(event.start).format('DD/MM/YYYY HH:mm')}
    `);
  };

  const handleSelectSlot = ({ start }) => {
    console.log(start);
  };

  const components = {
    event: props => {
      return <div>{props.title}</div>;
    }
  };

  return (
    <div className="img-backendC">
      <div className="contenedor" style={{ height: "98%", width: "98%" }}>
        <Header />
        <Calendar
          localizer={localizer}
          events={events}
          components={components}
          selectable={true}
          onSelectEvent={handleEventClick}
          onSelectSlot={handleSelectSlot}
          views={{ week: true, month: true, day: true, agenda: false }}
          min={dayjs('2024-12-23T08:00:00').toDate()}
          max={dayjs('2024-12-23T19:00:00').toDate()}
          formats={{
            dayHeaderFormat: date => dayjs(date).format("DD/MM/YYYY")
          }}
          messages={{
            next: "Siguiente",
            previous: "Atrás",
            today: "Hoy",
            month: "Mes",
            week: "Semana",
            day: "Día",
            date: "Fecha",
            time: "Hora",
            event: "Cita"
          }}
        />
      </div>
    </div>
  );
}

export default Citas;
