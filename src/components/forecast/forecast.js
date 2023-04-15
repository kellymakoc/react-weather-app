import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from "react-accessible-accordion";
import './forecast.css';

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'thursday', 'Friday', 'Saturday', 'Sunday'];

const Forecast = ({ data }) => {
    const dateInWeek = new Date().getDay();
    const forecastday = WEEK_DAYS.slice(dateInWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dateInWeek));

    console.log(forecastday);

    return (
        <>
            <label className="title"> Daily</label>
            <Accordion allowZeroExpanded>
                {data.list.slice(0, 7).map((item, idx) => (
                    <AccordionItem key={idx}>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                <div className="daily-item">
                                    <img alt="weather" className="icon-small" src={`icons/${item.weather[0].icon}.png`}></img>
                                    <label className="day"> {forecastday[idx]}</label>
                                    <label className="description"> {item.weather[0].description}</label>
                                    <label className="min-max"> {Math.round(item.main.temp_min)}°C / {Math.round(item.main.temp_max)}°C</label>
                                </div>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <div className="daily-details-grid">
                                <div className="daily-details-grid-item">
                                    <label>Pressure</label>
                                    <label> {item.main.pressure}</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <label>Humidity</label>
                                    <label> {item.main.humidity}</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <label>Clouds</label>
                                    <label> {item.clouds.all}</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <label>Feels like: </label>
                                    <label> {Math.round(item.main.feels_like)}°C</label>
                                </div>
                            </div>
                        </AccordionItemPanel>
                    </AccordionItem>
                ))}
            </Accordion>
        </>
    );
};

export default Forecast;
