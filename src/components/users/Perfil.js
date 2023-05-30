import { useAuth } from "../../context/AuthContext";
import { Image, Container, Row, Col, Card } from "react-bootstrap";
import image from '../../perfil.jpeg';
export function Perfil() {
    const { user } = useAuth();

    return (
        <Container>
        <Row className="justify-content-center mt-5">
          <Col xs={12} md={6}>
            <Card bg="white" text="black">
              <Card.Body>
                <div className="text-center">
                  <h1>Perfil</h1>
                  <Image src={image} roundedCircle alt="img" className="mb-4" width={200} height={200}/>
                </div>
                <div>
                  <h2>Nombre del usuario</h2>
                  <h3 className="username">{user.displayName || null}</h3>
                  <h2>Correo Electrónico</h2>
                  <h3 className="gmail">{user.email}</h3>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    )
}