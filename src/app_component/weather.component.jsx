import React from 'react';
const Weather=(props)=>{
    return(
        <div className="container">
             <div className="cards pt-4">
            <h1>{props.city}{props.country}</h1>
            <h5 className="py-4">
                <i className={`wi ${props.weatherIcon} display-1`}/>
                
            </h5>
            {props.temp_celsius?(<h6 className="py-2">{props.temp_celsius}&deg;</h6>):null}
            {/*Show min and max temp*/}
            {minmax(props.temp_min,props.temp_max)}
            <h1>{props.description}</h1>
            </div>
        </div>
    );
}
function minmax(min,max){
return(
    <h3>
        <span className="px-4">{min}&deg;</span>
        <span className="px-4">{max}&deg;</span>
    </h3>
)
}
export default Weather;