import { Dispatch, SetStateAction } from "react"
import { DateInterval } from "../../constants/table";
import { DateContainer, DateInputContainer } from "./styles"

type dateProps = {
    date: DateInterval;
    setDate: Dispatch<SetStateAction<DateInterval>>;
}
export const GetCurrentDate = (differential = 0) => {
    let separator = '-'
    let newDate = new Date()
    let yesterday = newDate.getDate() - 1 + differential;
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    const currentDate = `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${yesterday < 10 ? `0${yesterday}` : `${yesterday}`}`
    return currentDate
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