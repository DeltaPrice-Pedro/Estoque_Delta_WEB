import { useState } from 'react';
import { ModalRequest } from '../ModalRequest';
import { Card } from 'react-bootstrap';

import './styless.css';

export const ProductCard = ({ image, title, price, amount }) => {
    const [show, setShow] = useState(false);

    return (
        <>
            <Card style={{ width: '18rem' }} className="post" 
                onClick={() => setShow(true)}>
                <Card.Img variant="top" alt={title}
                    src={image != '' ? image: './logo192.png'} />
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>
                        R$ {price}
                    </Card.Text>
                </Card.Body>
            </Card>
            <ModalRequest
                show={show}
                onHide={() => setShow(false)}
                cover={image}
                title={title}
                body={price}
            />
        </>
    );
}