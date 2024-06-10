import { useState } from 'react';
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button"

 function Connection({ connData, createConnection, eventsToListenFor, emitTo }) {
  const [formValid, setFormValid] = useState([]);
  const [serverUrl, setServerUrl] = useState(connData.server);
  const [config, setConfig] = useState(connData.config);

  const onFormSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      JSON.parse(config);
    } catch (e) {
      console.log('cannot parse config json', e);
      setFormValid(() => [e]);
      return;
    }

    
    setFormValid(() => []);
    createConnection(serverUrl, config);
  }

  return (
    <>
      <Alert variant="danger" show={(connData.errors).length > 0 || formValid.length > 0}>
        {connData.errors.join(', ')} {formValid.join(', ')}
      </Alert>

      <form onSubmit={onFormSubmit}>
        <Row className="mb-2">
          <Col>
            <Form.Control required value={serverUrl} placeholder="server url" type="url" onChange={(e) => setServerUrl(e.target.value)} />
          </Col>
        </Row>
        <Row className="mb-2">
          <Col>
            <Form.Control as="textarea" placeholder="JSON config" value={config} onChange={(e) => setConfig(e.target.value)} />
          </Col>
        </Row>
        <Row className="mt-2">
          <Col>
            <Form.Text className="mb-2">
              <strong>Listen to</strong>: {eventsToListenFor.join(', ')} <strong>Emit to</strong>: {emitTo.join(', ')}
            </Form.Text>
            <Button variant="success" type="submit" block disabled={connData.loading}>{connData.loading ? 'Connecting...' : 'Connect'}</Button>
  
          </Col>
        </Row>
      </form> 
    </>
  )
}
export default Connection