// Completed with help from: https://claude.ai/share/9b4da3ac-d6ee-4d56-a419-58509ed9340d

import {Button, Card, Carousel, CarouselItem} from "react-bootstrap";
import { useState } from "react";
import BadgerBudsDataContext from '../contexts/BadgerBudsDataContext';

const BadgerBudSummary = (props) => {

    const [showing, setShowing] = useState(false);

    const move = (from, to, catId) => {
        if (from === to || from === "adopted") {return;}

        let fromList = JSON.parse(sessionStorage.getItem(`${from}`));
        sessionStorage.setItem(`${from}`, JSON.stringify(fromList.filter((id) => id !== catId)))

        let toList = JSON.parse(sessionStorage.getItem(`${to}`));
        sessionStorage.setItem(`${to}`, JSON.stringify([...toList, catId]))
        
        // Call refreshList if it exists to update the parent component
        if (props.refreshList) {
            props.refreshList();
        }
    }

    const save = () => {
        move(props.status, "basket", props.id);
        alert(`${props.name} has been added to your basket!`);
    }

    const unselect = () => {
        move(props.status, "adoptable", props.id);
        alert(`${props.name} has been removed from your basket!`);
    }

    const adopt = () => {
        move(props.status, "adopted", props.id);
        alert(`Thank you for adopting ${props.name}!`);
    }

    function flipShowing() {setShowing(oldShowing => !oldShowing)}

    return <Card style={{margin: "0.25rem"}}>
        {
            Object.keys(props).length > 0 ? <>
                {!props.isBasket ? <>
                    <Carousel>
                        {props.imgIds.map((imgId, index) => (
                            <CarouselItem key={imgId}>
                                <img
                                    src={`https://raw.githubusercontent.com/CS571-S25/hw5-api-static-content/main/cats/${imgId}`}
                                    alt={`A picture of ${props.name} number ${index + 1}`}
                                    style={{ width: "250px", aspectRatio: "1/1" }}
                                    className="center"
                                />
                            </CarouselItem>
                            ))
                        }
                    </Carousel>
                </> : <>
                    <img
                        src={`https://raw.githubusercontent.com/CS571-S25/hw5-api-static-content/main/cats/${props.imgIds[0]}`}
                        alt={`A picture of ${props.name}`}
                        style={{ width: "250px", aspectRatio: "1/1" }}
                        className="center"
                    />
                </>}
                <h3>{props.name}</h3>
                {showing ? <>
                    <p>{props.gender}</p>
                    <p>{props.breed}</p>
                    <p>{props.age}</p>
                    <p>{props.description ?? ""}</p>
                </> : <></>}
                {props.isBasket ? <>
                    <Button variant="secondary" onClick={unselect} id="unselect-button">Unselect</Button>
                    <Button variant="primary" onClick={adopt} id="adopt-button">Adopt</Button>
                </> : <>
                    <Button variant="info" onClick={flipShowing} id="show-more-less-button">Show {showing ? "Less" : "More"}</Button>
                    <Button variant="secondary" onClick={save} id="save-button">Save</Button>
                </>}
            </> : <p>Loading...</p>
        }
    </Card>
}

export default BadgerBudSummary;