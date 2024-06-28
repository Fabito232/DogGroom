// src/components/Citas.js
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from 'dayjs';
import '../styles/citas.css';
import "dayjs/locale/es";
import Header from "./Header";
import { obtenerCitas } from "../services/citaServices";
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const localizer = dayjsLocalizer(dayjs);
dayjs.locale('es');

function Citas() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const nuevaCita = location.state?.nuevaCita;
  const actualizar = location.state?.actualizar;

  const fetchCitas = async () => {
    try {
      const resCitas = await obtenerCitas();
      if (resCitas && resCitas.data) {
        const citasTransformadas = resCitas.data.map(cita => ({
          id: cita.ID_Cita,
          start: dayjs(cita.FechaYHora).toDate(), // Fecha y hora de inicio de la cita
          end: dayjs(cita.FechaYHora).add(1, 'hour').toDate(), // Hora de fin de la cita (ejemplo: 1 hora después del inicio)
          cedula: cita.Cliente.Cedula, // Cédula del cliente
          title: cita.Cliente.Nombre, // Nombre del cliente
          descripcion: cita.Descripcion, // Descripción de la cita
          estado: cita.Estado ? 'En proceso' : 'Finalizado', // Estado de la cita
          montoTotal: parseFloat(cita.MontoTotal), // Monto total de la cita
          montoAdicional: parseFloat(cita.MontoAdicional), // Monto adicional de la cita
          cliente: { // Detalles completos del cliente
            nombre: cita.Cliente.Nombre,
            cedula: cita.Cliente.Cedula,
            telefono: cita.Cliente.Telefono
          },
          mascotas:{
              id: cita.Mascotum.ID_Mascota,
              nombre: cita.Mascotum.Nombre,
              raza: cita.Mascotum.Raza,
              tipoMascota: cita.Mascotum.TipoMascotum.Descripcion,
              fotoURL: cita.Mascotum.FotoURL
          },
          servicio: { // Detalles del servicio de la 
            id_servicio: cita.Servicio.ID_Servicio,
            descripcion: cita.Servicio.Descripcion,
            precio: parseFloat(cita.Servicio.Precio)
          }
        }));
        console.log(citasTransformadas);
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
     
      const nuevaCitaTransformada = {
        start: dayjs(nuevaCita.fechaYHora).toDate(),
        end: dayjs(nuevaCita.fechaYHora).add(1, 'hour').toDate(),
        title: nuevaCita.Cliente.nombreCliente
      };
      setEvents(prevEvents => [...prevEvents, nuevaCitaTransformada]);
    }
  }, [nuevaCita]);

  useEffect(() => {
    if (actualizar) {
      fetchCitas();
    }
  }, [actualizar]);

  const handleEventClick = (event) => {
    navigate('/resumen', { state: { cita: event } });
  };

  const handleSelectSlot = ({ start }) => {
    console.log(start);
  };
  const handleViewChange =(view) => {
    if (view === 'agenda')
      navigate('/agendarCita')
  }
 

  const eventStyleGetter = (event) => {
    let style = {
      backgroundColor: event.estado === 'En proceso' ? '#22c55e' : '#a1a1aa',
      color: 'white',
      borderRadius: '5px',
      borderColor: 'black solid'
    };
    return {
      style: style
    };
  };

  
  
  
  

  return (
    <div className="img-backendC">
      <div className="contenedor" style={{ height: "98%", width: "98%" }}>
        <Header />
        <Calendar
          localizer={localizer}
          events={events}
          eventPropGetter={eventStyleGetter} 
          selectable={true}
          onSelectEvent={handleEventClick}
          onSelectSlot={handleSelectSlot}
          onView={handleViewChange}
          views={{ week: true, month: true, day: true, agenda: true }}
          min={dayjs('2024-12-23T08:00:00').toDate()}
          max={dayjs('2024-12-23T19:00:00').toDate()}
          formats={{
            dayHeaderFormat: date => dayjs(date).format("DD/MM/YYYY"),
            
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
