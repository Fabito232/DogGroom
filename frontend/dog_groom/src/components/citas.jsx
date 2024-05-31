import { Calendar, dayjsLocalizer} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from 'dayjs';
import '../styles/citas.css' 
import "dayjs/locale/es"
import Header from "./Header";

dayjs.locale("es");

// const components={
    
//     event: props =>{
//         console.log(props)
//         return <div>
//             {props.title}
//         </div>
//     }
// }

function Citas(){
    const localizer = dayjsLocalizer(dayjs);

    const events = [
        {
            start: dayjs('2024-05-29T12:00:00').toDate(),
            end: dayjs('2024-05-29T13:00:00').toDate(),
            title: "Cita 2"
        },
        {
            start: dayjs('2024-05-29T12:00:00').toDate(),
            end: dayjs('2024-05-29T13:00:00').toDate(),
            title: "Cita 1"
        },
        {
            start: dayjs('2024-05-29T12:00:00').toDate(),
            end: dayjs('2024-05-29T13:00:00').toDate(),
            title: "Cita 3"
        },
        {
            start: dayjs('2024-05-29T12:00:00').toDate(),
            end: dayjs('2024-05-29T13:00:00').toDate(),
            title: "Cita 1"
        },
        {
            start: dayjs('2024-05-29T12:00:00').toDate(),
            end: dayjs('2024-05-29T13:00:00').toDate(),
            title: "Cita 3"
        }
    ];

    const handleEventClick = (event) => {
        console.log("Evento clickeado:", event);
      };
    
    const handleSelectSlot = ({ start }) => {
        console.log(start);
    };
    
    return(
        <>
        
        <div className = "img-backendC" >
        
            <div className = "contenedor" style={{
                    height: "98%",
                    width: "98%",
            }}>
                <Header></Header>
                
                <Calendar
                    localizer={localizer}
                    events={events}
                    selectable={true}
                    onSelectEvent={handleEventClick}
                    onSelectSlot={handleSelectSlot}

                    //defaultView="month"
                    min={dayjs('2024-12-23T08:00:00').toDate()}
                    max={dayjs('2024-12-23T19:00:00').toDate()}
                    formats={{
                        dayHeaderFormat: date => {
                            return dayjs(date).format("DD/MM/YYYY")
                        }
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
                  //  components={components}
                />
            </div>
       </div>
       </>
    )
}
export default Citas