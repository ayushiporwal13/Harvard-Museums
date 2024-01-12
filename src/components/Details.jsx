import './Details.css';

const Details = (props) => {
    return (
        <div className='Details'>
            <ul>
                <li 

                    onClick={() => props.handleChange('copyright',props.item.copyright)}
                    name='copyright'
                    value={props.item.copyright}
                    >
                    Copyright: {props.item.copyright}
                </li>
                <li
                    onClick={() => props.handleChange('technique',props.item.technique)}
                    name='technique'
                    value={props.item.technique}>
                    Technique: {props.item.technique}
                </li>
                <li
                    onClick={() => props.handleChange('format',props.item.format)}
                    name='format'
                    value={props.item.format}>
                    Format: {props.item.format}
                </li>
                <li
                    onClick={() => props.handleChange('date',props.item.date)}
                    name='date'
                    value={props.item.date}>
                    Date: {props.item.date}
                </li>
            </ul>
            <img src={props.item.baseimageurl}></img>
            <ul>
      </ul>
        </div>
    )
}

export default Details;