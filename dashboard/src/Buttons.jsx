import './Buttons.css';

export function SolidButton ({ value = "Button text", color = "lightgreen" }) {
    return (
        <button style={{backgroundColor: color}} className='solid-button'>{value}</button>
    );
};

export const OutlineButton = ({value = "default text", color = "black"}) => {
    return (
        <button style={{border: `2px solid ${color}`}} className='outline-button'>{value}</button>
    );
};