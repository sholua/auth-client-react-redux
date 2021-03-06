import React from "react";
import { Container, Row, Col, Badge, Alert, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { Link } from "react-router-dom";
import { RootState } from "../../app/store";
import { User } from "../users/usersSlice";
import ProfileDetails from "./ProfileDetails";
import Program from "./Program";
import Repertoire from "./Repertoire";
import Departments from "../departments/Departments";
import DepartmentForm from "../departments/DepartmentForm";

export default function Profile() {
  const user = useSelector(
    (state: RootState) => state.auth.currentUser
  ) as User;
  const { path, url } = useRouteMatch();

  if (!user) return <div>Loading...</div>;

  return (
    <Container>
      <Row>
        <Col>
          <Alert variant="info">
            Profile: {user.firstName} -{" "}
            <Badge pill variant="success">
              {user.role}
            </Badge>
          </Alert>
        </Col>
      </Row>
      <Row>
        <Col xs={6} sm={3}>
          <ListGroup>
            <ListGroup.Item>
              <Link to={url}>Details</Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link to={`${url}/program`}>Program</Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link to={`${url}/repertoire`}>Repertoire</Link>
            </ListGroup.Item>
          </ListGroup>
          Admin:
          <ListGroup>
            <ListGroup.Item>
              <Link to={`${url}/departments`}>Departments</Link>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col xs={6} sm={9}>
          <Switch>
            <Route
              exact
              path={path}
              render={(props) => <ProfileDetails {...props} user={user} />}
            />
            <Route
              path={`${path}/program`}
              render={(props) => <Program {...props} user={user} />}
            />
            <Route
              path={`${path}/repertoire`}
              render={(props) => <Repertoire {...props} user={user} />}
            />
            <Route
              path={`${path}/departments/:id`}
              component={DepartmentForm}
            />
            <Route path={`${path}/departments`} component={Departments} />
          </Switch>
        </Col>
      </Row>
    </Container>
  );
}
