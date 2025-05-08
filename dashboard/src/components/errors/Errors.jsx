import { Typography } from "@mui/material";
import "./style.css";

export const FieldError = ({text}) => {
    return (
        <div>
            <Typography className='field-error'>
                {text}
            </Typography>
        </div>
    )
}