import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

interface ModalProps {
  title?: string
  message: string
  btnPrimaryLabel?: string
  btnPrimaryVariant?: string
  btnPrimaryFn?: () => void
  btnSecondaryLabel?: string
  btnSecondaryFn?: () => void
  show: boolean
  hideFn: () => void
}

const ModalStatus = ({
  title,
  message,
  btnPrimaryLabel,
  btnPrimaryFn,
  btnPrimaryVariant,
  btnSecondaryLabel,
  btnSecondaryFn,
  show,
  hideFn,
}: ModalProps) => {
  return (
    <Modal show={show} onHide={hideFn}>
      <div>
        <Modal.Header closeButton>
          {title && <Modal.Title>{title}</Modal.Title>}
        </Modal.Header>

        <Modal.Body>{message}</Modal.Body>
        {btnPrimaryLabel && (
          <Modal.Footer>
            <Button variant={btnPrimaryVariant} onClick={btnPrimaryFn}>
              {btnPrimaryLabel}
            </Button>
            {btnSecondaryLabel && (
              <Button variant="primary" onClick={btnSecondaryFn}>
                Cancel
              </Button>
            )}
          </Modal.Footer>
        )}
      </div>
    </Modal>
  )
}

export default ModalStatus
