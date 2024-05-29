import { Calendar, dayjsLocalizer} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from 'dayjs';
import '../styles/citas.css' 
import "dayjs/locale/es"

dayjs.locale("es");

const events =[
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
    
]
const components={
    
    event: props =>{
        console.log(props)
        return <div>
            {props.title}
        </div>
    }
}


function Citas(){
    const localizer = dayjsLocalizer(dayjs)
    return(
        <div className = "img-backendC" >
            <div className = "contenedor" style={{
                    height: "95vh",
                    width: "95vw",

            }}>
                <Calendar
                    localizer={localizer}
                    events={events}
                    //defaultView="month"
                    min={dayjs('2024-12-23T08:00:00').toDate()}
                    max={dayjs('2024-12-23T19:00:00').toDate()}
                    formats={{
                        dayHeaderFormat: date => {
                            return dayjs(date).format("DD/MM/YYYY")
                        }
                    }}
                    components={components}
                />
            </div>
       </div>
    )
}
export default Citas