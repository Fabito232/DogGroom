import { Calendar, dayjsLocalizer} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from 'dayjs';
import '../styles/citas.css' 
import "dayjs/locale/es"
import Header from "./Header";
import { obtenerCitas } from "../services/citaServices";
import { useState, useEffect } from 'react';

const localizer = dayjsLocalizer(dayjs);

function Citas() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchCitas = async () => {
      const citas = await obtenerCitas();
      const events = citas.map(cita => ({
        start: dayjs(cita.hora).toDate(),
        end: dayjs(cita.hora).add(1, 'hour').toDate(),
        title: `${cita.nombreCliente} - ${cita.nombreMascota}`,
        descripcion: cita.descripcion,
        telefono: cita.telefono,
        estado: cita.estado,
        cedula: cita.cedula,
        raza: cita.raza,
        tamanno: cita.tamanno
      }));
      setEvents(events);
    };
    fetchCitas();
  }, []);

  const handleEventClick = (event) => {
    alert(`
      Cliente: ${event.title}
      Cédula: ${event.cedula}
      Teléfono: ${event.telefono}
      Mascota: ${event.nombreMascota}
      Raza: ${event.raza}
      Tamaño: ${event.tamanno}
      Descripción: ${event.descripcion}
      Estado: ${event.estado}
    `);
  };

  const handleSelectSlot = ({ start }) => {
    console.log(start);
  };

  return (
    <div className="img-backendC">
      <div className="contenedor" style={{ height: "98%", width: "98%" }}>
        <Header />
        <Calendar
          localizer={localizer}
          events={events}
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
            previous: "Atras",
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