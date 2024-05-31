import React from "react";
import {
  Container,
  Row,
  Col,
  Button,
  FormSelect,
  FormInput,
  ListGroupItem,
  Form,
  CardBody,
  CardHeader,
  Card
} from "shards-react";

const AddAdvertisement = () => (
  <Container fluid className="main-content-container px-4 mt-4">
    <ListGroupItem className="p-3">
      <Row>
        <Col>
          <Form>
            <label
              htmlFor="Title"
              style={{ color: "black", fontWeight: "bold" }}
            >
              Advertisement Add Page
            </label>

            <Row form>
              <Col md="6" className="form-group">
                <label htmlFor="Titile">Titile</label>
                <FormInput id="Titile" type="text" placeholder="Titile Name" />
              </Col>

              <Col md="6">
                <label htmlFor="Advertisment Type">Advertisment Type</label>
                <FormSelect id="Advertisment Type">
                  <option value="0">Choose a Add Type</option>

                  <option>Main ad</option>
                  <option>Special Offer</option>
                  <option>Newly Arrivals</option>
                </FormSelect>
              </Col>
              <Col md="6" className="form-group">
                <label htmlFor="Date">Appointment Date</label>
                <FormInput id="Date" type="date" />
              </Col>
              <Col md="6" className="mb-3">
                <label htmlFor="DSpecialty">Upload Image</label>
                <div className="custom-file mb-3">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="customFile2"
                    // onChange={handleFileChange}
                  />
                  <label className="custom-file-label" htmlFor="customFile2">
                    Choose file...
                  </label>
                </div>
              </Col>
            </Row>
            <Button>Add</Button>
          </Form>
        </Col>
      </Row>
    </ListGroupItem>

    <Row fluid className="main-content-container px-4 mt-4">
      <Col>
        <Card small className="mb-4">
          <CardHeader className="border-bottom">
            <h4 className="m-0">Pet Records</h4>
          </CardHeader>
          <CardBody className="p-0 pb-3">
            <table className="table mb-0">
              <thead className="bg-light">
                <tr>
                  <th scope="col" className="border-0">
                    #
                  </th>
                  <th scope="col" className="border-0">
                    Title
                  </th>
                  <th scope="col" className="border-0">
                    Advertisement Type
                  </th>
                  <th scope="col" className="border-0">
                    Posted Date
                  </th>
                  <th scope="col" className="border-0">
                    Image
                  </th>
                  <th scope="col" className="border-0">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>New Dog Shop</td>
                  <td>Main add</td>
                  <td>21.05.2023</td>
                  <td>
                    <img
                      src={require("./../../images/advertisements/petadd.jpg")}
                      width="110"
                    />
                  </td>
                  <td>
                    <Row form>
                      <Col md="4" className="mb-3">
                        <Button
                          // href={`/user-update-pets?petID=${post._id}`}
                          class="btn btn-primary mr-1"
                          theme="primary"
                        >
                          Edit
                        </Button>
                      </Col>
                      <Col md="4" className="mb-3">
                        <Button theme="danger">Remove</Button>
                      </Col>
                    </Row>
                  </td>
                </tr>
              </tbody>
            </table>
          </CardBody>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default AddAdvertisement;