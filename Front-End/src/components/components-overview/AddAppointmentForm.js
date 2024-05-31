import React from "react";
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  FormGroup,
  // FormCheckbox,
  FormSelect,
  Button,  
  FormTextarea,  
  InputGroupText,
  InputGroupAddon,
  InputGroup
} from "shards-react";

class AddAppointmentForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      // Fourth list of posts.
      HID:localStorage.getItem('UserTypeID'),
      DID: '',
      POID: '',
      PID: '',
      TypeReason: '',
      Date: '',
      Time: '',
      Fee: '',
      RoomNo: '',
      Status: '',
      Note: '',
      HospitalDetails:[],
      DoctorsDetails:[],
      PetOwnerDetails:[],
      PetDetails:[],
      Hours:"",
      Minitues:"",
      Period:"",
      AppointmentDetails:[],
      error:"",
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitAppoinmentsDetails = this.submitAppoinmentsDetails.bind(this);
    this.loadPetDetails = this.loadPetDetails.bind(this);
    this.checkAvailability = this.checkAvailability.bind(this);
    // this.ConfirmOrder = this.ConfirmOrder.bind(this);
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.id;

    this.setState({
      [name]: value
    });
  }

  
  checkAvailability = event => {
    const {
      Date,
      Period,
      Minitues,
      Hours,
      AppointmentDetails,
      Time
      // Fee,
      // RoomNo,
      // Status,
      // Note
    } = this.state;

    if(Date == ""){
      alert("Please Select the Date");
    }else if(Hours == "") {
      alert("Please Select the Hours");
    }else if(Minitues == ""){
      alert("Please Select the Minitues");
    }else{
      const testTime = Hours+":"+Minitues;

      AppointmentDetails.map((post, idx) => {
        if(Date == post.Date && testTime == post.Time){
          // alert("Selected Time Slot Unavailable. Please Enter Different Time Slot");
          this.setState({ error: "UV" });  
          this.setState({ Time: "" });  
        }else{
          this.setState({ Time: testTime });  
          this.setState({ error: "AV" });  
        }
      });
    }
  }


  submitAppoinmentsDetails = (event) => {

    const { 
      HID, 
      DID, 
      POID,
      PID,
      TypeReason,
      Date,
      Time,
      Fee,
      RoomNo,
      // Status,
      Note } = this.state;
    
    
    // var today = new Date();
    // var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    // var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    var appointmentdata = { 
      HID: HID,
      DID: DID,
      POID: POID,
      PID: PID,
      TypeReason: TypeReason,
      Date: Date,
      Time: Time,
      Fee: Fee,
      RoomNo: RoomNo,
      Status: "Pending",
      Note: Note,
    };

    if(HID === ""){

      alert("Please Select Hospital First");

    } else if (DID === ""){

      alert("Please Select Doctor");

    } else if (POID === ""){ 

      alert("Please Select Pet Owner");

    } else if (PID === ""){ 

      alert("Please Select Pets");

    } else if (Date === ""){ 

      alert("Please Select Your Appointment Date");

    } else if (Time === ""){ 

      alert("Please Select the Appointment Time");

    } else if (TypeReason === ""){ 

      alert("Please Enter the Reason");

    } else if (Note === ""){

      alert("Please Enter a Note");

    } else if (Fee === ""){ 

      alert("Please Enter the Appointment Fee");

    } else if (RoomNo === ""){

      alert("Please Add Room Number");

    }else{
        
      fetch('http://localhost:4000/api/v1/appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(appointmentdata)
      })
      .then(response => response.json())
      .then(data => {
        alert('Successfully Appointment Made');      
        window.location.reload();
      })
      .catch(error => {
        console.error('Error making appointment:', error);
      });

    }

  }

  componentDidMount() {
    fetch('http://localhost:4000/api/v1/doctor')
    .then((response) => response.json())
    .then(doctorList => {
        this.setState({ DoctorsDetails: doctorList });
        //console.log(doctorList);
    });

    fetch("http://localhost:4000/api/v1/appointment/")
    .then(response => response.json())
    .then(appointmentList => {
      this.setState({ AppointmentDetails: appointmentList });
      //console.log(petownerList);
    });

    fetch('http://localhost:4000/api/v1/petowners/')
    .then((response) => response.json())
    .then(petownerList => {
        this.setState({ PetOwnerDetails: petownerList });
        //console.log(petownerList);
    });


    fetch('http://localhost:4000/api/v1/pethospital/')
    .then((response) => response.json())
    .then(pethospitalList => {
        this.setState({ HospitalDetails: pethospitalList });
        //console.log(pethospitalList);
    });
    
  }

  loadPetDetails(PetOwnerID)
  {
    this.setState({ POID: PetOwnerID });
    fetch('http://localhost:4000/api/v1/pet/?POID='+PetOwnerID)
    .then((response) => response.json())
    .then(petList => {
        this.setState({ PetDetails: petList });
        //console.log(petList);
    });
  }

  render() 
  {
  const {
    HospitalDetails,
    DoctorsDetails,
    PetOwnerDetails,
    PetDetails,
    error
  } = this.state;
  return(
  <ListGroup flush>
    <ListGroupItem className="p-3">
      <Row>
        <Col>
          <Form>
            <Row form>

            <Col md="6" className="mb-3">
                <label htmlFor="DSpecialty">Hospital</label>                
                <FormSelect id="HID"
                    value={this.state.HID}
                    onChange={this.handleChange} disabled>     
                    <option value="0">Choose a Hospital</option>
                    {HospitalDetails.map((post, idx) => (
                      <option key={post._id} value={post._id}>{post.HName}</option>  
                    ))
                    }
                </FormSelect>
              </Col>

              <Col md="6" className="mb-3">
                <label htmlFor="DSpecialty">Doctor</label>                
                <FormSelect id="DID"
                    value={this.state.DID}
                    onChange={this.handleChange}>                      
                    <option value="0">Choose a Doctor</option>
                    {DoctorsDetails.map((post, idx) => (
                      <option key={post._id}  value={post._id}>{post.DFirstName} {post.DLastName}</option>  
                    ))
                    }
                </FormSelect>
              </Col>

              <Col md="6" className="mb-3">
                <label id="POID" htmlFor="DSpecialty">Pet Owner</label>
                <FormSelect 
                                value={this.state.POID}
                                onChange={(e)=>{this.loadPetDetails(e.target.value)}}>
                    <option value="0">Choose a Pet Owner</option>
                    {PetOwnerDetails.map((post, idx) => (
                      <option key={post._id}  value={post._id}>{post.OFirstName} {post.OLastName}</option>  
                    ))
                    }
                </FormSelect>
              </Col>

              <Col md="6" className="mb-3">
                <label htmlFor="DSpecialty">Pet</label>                
                <FormSelect id="PID"
                                value={this.state.PID}
                                onChange={this.handleChange}>
                    <option value="0">Choose a Pet</option>
                    {PetDetails.map((post, idx) => (
                      <option key={post._id}  value={post._id}>{post.PetName}</option>  
                    ))
                    }
                </FormSelect>
              </Col>


              <Col md="6" className="form-group">
                <label htmlFor="Date">Appointment Date</label>
                <FormInput
                  id="Date"
                  type="date"
                  value={this.state.Date}
                  onChange={this.handleChange}
                />
              </Col>


                  <Col md="6" className="form-group">
                    <Row>
                        <Col md="4" className="form-group">                          
                        <label htmlFor="Hours">Hours</label>
                          <FormInput
                            id="Hours"
                            type="number"
                            min={1}
                            max={23}
                            value={this.state.Hours}
                            onChange={this.handleChange}
                          >
                          </FormInput>
                        </Col>

                        <Col md="4" className="form-group">                          
                        <label htmlFor="Minitues">Minitues</label>
                          <FormSelect
                            id="Minitues"
                            value={this.state.Minitues}
                            onChange={this.handleChange}
                          >
                            <option value="0">Choose a Minitues</option>
                            <option value="00">00</option>
                            <option value="30">30</option>
                          </FormSelect>
                        </Col>
                        
                        <Col md="4" className="form-group mt-4">                                     
                          <Button className="btn-success" onClick={this.checkAvailability}>
                            Check Availability
                          </Button>
                          {error == "AV" ? <p className="text-success">Time Available</p> : error == "UV" ? <p className="text-danger">Time Slot Unavailable</p> : <p className="text-primary">Select Time Slot</p>}
                          
                        </Col>

                    </Row>
                  </Col>  

              <Col md="6" className="form-group">
                <label htmlFor="feInputCategory">Appointment Fee</label>
                <InputGroup>
                  <InputGroupAddon type="prepend">
                    <InputGroupText>$</InputGroupText>
                  </InputGroupAddon>
                  <FormInput  id="Fee" 
                  value={this.state.Fee}
                  onChange={this.handleChange} />
                  <InputGroupAddon type="append">
                    <InputGroupText>.00</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </Col>

              <Col md="6" className="form-group">
                <label htmlFor="Time">Room No</label>
                <FormInput
                  id="RoomNo"
                  type="number"
                  placeholder="Room No"
                  value={this.state.RoomNo}
                  onChange={this.handleChange}
                />
              </Col>

            </Row>


            <Row form>              
              <Col md="12">   
              <FormGroup>
                <label htmlFor="feInputTypeReason">Reason</label>
                <FormTextarea id="TypeReason"                 
                value={this.state.TypeReason}
                onChange={this.handleChange} placeholder="Tell Something about pet your condition..." />
              </FormGroup>
              </Col>
            </Row>
            
            <Row form>              
              <Col md="12">   
              <FormGroup>
                <label htmlFor="feInputTypeReason">Note</label>
                <FormTextarea id="Note"                 
                value={this.state.Note}
                onChange={this.handleChange} placeholder="Write a Note..." />
              </FormGroup>
              </Col>
            </Row>

            <Button onClick={this.submitAppoinmentsDetails}>Add New Appointment</Button>
          </Form>
        </Col>
      </Row>
    </ListGroupItem>
  </ListGroup>
  );
}
};

export default AddAppointmentForm;
