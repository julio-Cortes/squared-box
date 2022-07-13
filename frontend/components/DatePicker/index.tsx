import { Dispatch, SetStateAction } from "react"
import { DateInterval } from "../../constants/register-table"
import { DateContainer, DateInputContainer } from "./styles"

type dateProps = {
    date: DateInterval;
    setDate: Dispatch<SetStateAction<DateInterval>>;
}

const DatePicker = ({ date, setDate }: dateProps) => {
    return (
        <DateContainer>
            <DateInputContainer>
                <input className={'bg-tl-grey text-white'}
                    value={date.to} type='date'
                    onChange={(ev) => setDate({ from: date.from, to: ev.target.value })}
                />
                <label>Hasta: </label>
            </DateInputContainer>
            <DateInputContainer>
                <input className={'bg-tl-grey text-white'}
                    value={date.from} type='date'
                    onChange={(ev) => setDate({ from: ev.target.value, to: date.to })}
                />
                <label>Desde: </label>
            </DateInputContainer>


        </DateContainer>
    )
}

export default DatePicker;