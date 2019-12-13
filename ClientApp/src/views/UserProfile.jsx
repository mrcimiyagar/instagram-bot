/*!

=========================================================
* Black Dashboard React v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col, CardTitle, ButtonGroup
} from "reactstrap";
import {getMode} from "../routes";
import FilePicker from "../components/FilePicker";
import {Line} from "react-chartjs-2";
import {chartExample1, chartExample4} from "../variables/charts";
import classNames from "classnames";

class UserProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      bigChartData: "data2"
    };
  }

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="6">
              <Card>
                <CardHeader style={{
                  width: '100%'
                }}>
                  <h5 className="title" style={{
                    width: '100%',
                    textAlign: getMode() === '/rtl' ? 'right' : 'left'
                  }}>{getMode() === "/rtl" ? "بارگذاری اطلاعات" : "Upload information"}</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col>
                        <FormGroup>
                          <label style={{
                            width: '100%',
                            textAlign: getMode() === '/rtl' ? 'right' : 'left'
                          }}>{getMode() === '/rtl' ? "انتخاب فایل" : "Pick file"}</label>
                          <div
                              style={{
                                border: '1px #e14eca solid',
                                borderRadius: 8,
                                padding: 8
                              }}
                          >
                            <FilePicker/>
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardFooter style={{
                  width: '100%'
                }}>
                  <Button className="btn-fill" color="primary" type="submit">
                    {getMode() === '/rtl' ? 'پردازش' : 'Process'}
                  </Button>
                </CardFooter>
              </Card>
            </Col>
            <Col md="6">
              <Card className="card-chart">
                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                      <h5 className="card-category">پیشبینی مصرف برق با توجه به اطلاعات</h5>
                      <CardTitle tag="h2">مصرف پیش بیینی شده</CardTitle>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                        data={chartExample1[this.state.bigChartData]}
                        options={chartExample1.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default UserProfile;
