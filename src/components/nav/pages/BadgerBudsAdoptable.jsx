// Completed with help from: https://claude.ai/share/9b4da3ac-d6ee-4d56-a419-58509ed9340d

import { Container, Row, Col } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";

import BadgerBudSummary from "../../BadgerBudSummary";
import BadgerBudsDataContext from "../../../contexts/BadgerBudsDataContext";

export default function BadgerBudsAdoptable(props) {
    const [buds, setBuds] = useContext(BadgerBudsDataContext);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [adoptableList, setAdoptableList] = useState([]);
    
    useEffect(() => {
        const list = JSON.parse(sessionStorage.getItem("adoptable") || '[]');
        setAdoptableList(list);
        console.log("Adoptable list refreshed:", list);
    }, [refreshTrigger]);
    
    const refreshList = () => {
        setRefreshTrigger(prev => prev + 1);
    };

    return <div>
        <h1>Available Badger Buds</h1>
        <p>The following cats are looking for a loving home! Could you help?</p>
        {adoptableList.length > 0 ? 
            <Container fluid>
                <Row>
                    {buds
                        .filter(cat => adoptableList.includes(cat.id))
                        .map(cat => {
                            return (
                                <Col key={cat.id} xs={12} md={6} lg={4} xl={3}>
                                    <BadgerBudSummary
                                        {...cat}
                                        status="adoptable"
                                        isBasket={false}
                                        refreshList={refreshList}
                                    />
                                </Col>
                            );
                        })
                    }
                </Row>
            </Container>
        : 
            <p>No buds available for adoption!</p>
        }
    </div>
}