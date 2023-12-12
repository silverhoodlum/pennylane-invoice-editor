import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

interface ModalProps {
  title?: string
  message: string
  btnPrimaryLabel: string
  btnPrimaryFn: () => void
  btnSecondaryLabel?: string
  btnSecondaryFn?: () => void
  show: boolean
  hideFn: () => boolean
}

const ModalStatus = ({
  title,
  message,
  btnPrimaryLabel,
  btnPrimaryFn,
  btnSecondaryLabel,
  btnSecondaryFn,
  show,
  hideFn,
}: ModalProps) => {
  return (
    <Modal show={show} onHide={hideFn}>
      <div>
        {title && (
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
        )}
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={btnPrimaryFn}>
            {btnPrimaryLabel}
          </Button>
          {btnSecondaryLabel && (
            <Button variant="primary" onClick={btnPrimaryFn}>
              Cancel
            </Button>
          )}
        </Modal.Footer>
      </div>
    </Modal>
  )
}

export default ModalStatus
