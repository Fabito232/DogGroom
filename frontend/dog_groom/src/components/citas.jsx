import { Calendar, dayjsLocalizer } from "react-big-calendar";
import { useNavigate } from 'react-router-dom';
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from 'dayjs';
import '../styles/citas.css';
import "dayjs/locale/es";

dayjs.locale("es");

const events = [
    {
        start: dayjs('2024-05-21T12:00:00').toDate(),
        end: dayjs('2024-05-21T13:00:00').toDate(),
        title: "Cita 2"
    },
    {
        start: dayjs('2024-05-21T08:00:00').toDate(),
        end: dayjs('2024-05-21T10:00:00').toDate(),
        title: "Cita 1"
    }
];

const components = {
    event: props => {
        console.log(props);
        return <div>{props.title}</div>;
    }
};

function Citas() {
    const localizer = dayjsLocalizer(dayjs);
    const navigate = useNavigate();

    const handleAgendaClick = () => {
        navigate('/AgendarCita');
    };

    return (
        <div className="img-backendC">
            <div className="contenedor" style={{ height: "95vh", width: "95vw" }}>
                <Calendar
                    localizer={localizer}
                    events={events}
                    views={{
                        week: true,
                        month: true,
                        day: true,
                        agenda: true
                    }}
                    onView={() => handleAgendaClick()} 
                    //defaultView="month"
                    min={dayjs('2024-12-23T08:00:00').toDate()}
                    max={dayjs('2024-12-23T19:00:00').toDate()}
                    messages={{
                        next: "Siguiente",
                        previous: "Antes",
                        today: "Hoy",
                        month: "Mes",
                        week: "Semana",
                        day: "Día",
                        agenda: "Agenda"
                    }}
                    formats={{
                        dayHeaderFormat: date => {
                            return dayjs(date).format("DD/MM/YYYY");
                        }
                    }}
                    components={components}
                />
                <div className="contenderoBotonesC">
                    <button type="button" className="botonCalendarioC">Clientes</button>
                    <button type="button" className="botonCalendarioI">Inventario</button>
                    <button type="button" className="botonCalendarioF">Finanzas</button>
                </div>
            </div>
        </div>
    );
}

export default Citas;
