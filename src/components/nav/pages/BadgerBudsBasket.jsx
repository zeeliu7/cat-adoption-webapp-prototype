// Completed with help from: https://claude.ai/share/9b4da3ac-d6ee-4d56-a419-58509ed9340d

import { Container, Row, Col } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";

import BadgerBudSummary from "../../BadgerBudSummary";
import BadgerBudsDataContext from "../../../contexts/BadgerBudsDataContext";

export default function BadgerBudsBasket(props) {
    const [buds, setBuds] = useContext(BadgerBudsDataContext);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [basketList, setBasketList] = useState([]);
    
    useEffect(() => {
        const list = JSON.parse(sessionStorage.getItem("basket") || '[]');
        setBasketList(list);
        console.log("Basket list refreshed:", list);
    }, [refreshTrigger]);
    
    const refreshList = () => {
        setRefreshTrigger(prev => prev + 1);
    };

    return <div>
        <h1>Badger Buds Basket</h1>
        <p>These cute cats could be all yours!</p>
        {basketList.length > 0 ? 
            <Container fluid>
                <Row>
                    {buds
                        .filter(cat => basketList.includes(cat.id))
                        .map(cat => {
                            return (
                                <Col key={cat.id} xs={12} md={6} lg={4} xl={3}>
                                    <BadgerBudSummary
                                        {...cat}
                                        status="basket"
                                        isBasket={true}
                                        refreshList={refreshList}
                                    />
                                </Col>
                            );
                        })
                    }
                </Row>
            </Container>
        : 
            <p>You have no buds in your basket!</p>
        }
    </div>
}