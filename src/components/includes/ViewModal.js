import {Button, Modal} from "react-bootstrap";

const ViewModal = (props) => {
    const close = () => props.setShow(false);
    return (
        <>
            <Modal dialogClassName={props.customStyle} show={props.show} onHide={close}>
                <Modal.Header>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{props.children}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={close}>
                        {props.closeButton}
                    </Button>
                    <Button variant={props.actionColor} onClick={props.confirmAction}>
                        {props.actionButton}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ViewModal;