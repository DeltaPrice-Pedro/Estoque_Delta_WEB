import { useEffect, useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { ProductSlim } from '../ProductSlim';

import { FaCircleCheck, FaDollarSign } from "react-icons/fa6";
import { IconContext } from "react-icons";

import './styles.css'

export function ModalRequest(props) {
    const [requestBody, setRequestBody] = useState(true)

    useEffect(() =>{
        if (props.show == false){
            setRequestBody(true)
        }
    })

    const handleRequest = () => {
        props.requestMethod(props.title, props.price, props.amount, props.id);
        setRequestBody(!requestBody)
    }

    return (
        <Modal show={props.show} onHide={props.onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title >
                    Solicitar produto
                </Modal.Title>
                <IconContext.Provider value={{ color: "#0597F2", size: "2em" }}>
                    {<FaDollarSign />}
                </IconContext.Provider>
            </Modal.Header>
            <Modal.Body>
                {requestBody &&
                    <>
                        <p className='title-request'>Confirma a escolha do produto abaixo?</p>
                        {<ProductSlim
                            image={props.image}
                            title={props.title}
                            price={props.price}
                        />
                        }
                    </>
                }
                {requestBody === false &&
                    <>
                        <p className='title-request'>Escolha do produto CONFIRMADA</p>
                        <div className='content-request'>
                            <IconContext.Provider value={{ color: "#0597F2", size: "4em" }}>
                                <FaCircleCheck />
                            </IconContext.Provider>
                            <p className='warning-request'>Em caso de engano,<br />consulte a equipe responsável</p>
                        </div>
                    </>
                }
            </Modal.Body>
            <Modal.Footer id='modal-footer'>
                <Button variant="secondary" onClick={props.onHide}>
                    Fechar
                </Button>
                {requestBody &&
                    <Button variant="primary" onClick={handleRequest}>
                        Confirmar
                    </Button>
                }
            </Modal.Footer>
        </Modal>
    )
};
