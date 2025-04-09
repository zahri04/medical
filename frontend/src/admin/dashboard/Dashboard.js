import React from "react";
import { Container, Row, Col, Card,Table, Badge, ListGroup } from "react-bootstrap";
import { Hospital, Calendar2Check, PersonCheck, ClipboardHeart,Bell,Chat, Person, CheckCircle, XCircle } from "react-bootstrap-icons";
import Chart from "react-apexcharts";


const Dashboard = () => {
  const Cards = [
    {
      icon: <Hospital size={30} />,
      title: "Total Patients",
      text: "Manage all registered hospitals and clinics in the system.",
      count: 100
    },
    {
      icon: <PersonCheck size={30} />,
      title: "Registered Doctors",
      text: "Track and manage all active and inactive doctors.",
      count: 50,
    },
    {
      icon: <Calendar2Check size={30} />,
      title: "Total Appointments",
      text: "Monitor upcoming and past appointments scheduled by patients.",
      count: 200,
    },
    {
      icon: <ClipboardHeart size={30} />,
      title: "Generated AI Analysis",
      text: "Manage and assign medical assistants to doctors and departments.",
      count: 10,
    },
  ];

  const doctorActivitiesOptions = {
    series: [{
      name: "Hours",
      data: [8, 9, 7, 8, 6, 7, 8]
    }],
    options: {
      chart: {
        height: 350,
        type: 'bar',
      },
      title: {
        text: "Doctor Activities",
        align: 'left'
      },
      xaxis: {
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      colors: ['#546E7A'],
      plotOptions: {
        bar: {
          columnWidth: '45%',
          distributed: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
    },
  };

  const patientGrowthOptions = {
    series: [{
      name: "Patients",
      data: [21, 22, 10, 28, 16, 21, 13, 30]
    }],
    options: {
      chart: {
        height: 350,
        type: 'line',
      },
      title: {
        text: "Patient Growth",
        align: 'left'
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
      },
      colors: ['#546E7A'],
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
    },
  };

  const users = [
    { id: 1, name: "amine Zahri", status: "Pending", type:"Admin", icon: <Person size={20} /> },
    { id: 1, name: "ziane", status: "Pending", type:"Admin", icon: <Person size={20} /> },
    { id: 1, name: "louazna", status: "Rejected", type:"Doctor", icon: <Person size={20} /> },
    { id: 1, name: "oussama", status: "Approved", type:"Assistant", icon: <Person size={20} /> },
    { id: 1, name: "omar", status: "Rejected", type:"Patient", icon: <Person size={20} /> },
    
  ];

  const activites = [
    { id: 1, message: "You have 3 pending tasks.", icon: <Bell size={18} />, time: "Just Now" },
    { id: 2, message: "New Message", icon: <Chat size={18} />, time: "30 min ago" },
    { id: 3, message: "You have 4 tasks Done.", icon: <CheckCircle size={18} />, time: "30 min ago" },
    { id: 4, message: "You have 3 pending tasks.", icon: <Bell size={18} />, time: "Just Now" },
  ];
  return (
   
    <Container fluid className="p-3 d-flex justify-content-center align-items-center flex-column">
      <h1>Welcome Admin!</h1>
      <p className="ms-2">This Dashboard is managed by zahri04</p>
      <Row xs={1} md={2} className="g-4">
        {Cards.map((card, idx) => (
          <Col key={idx}>
            <Card className="shadow-lg border-0 primary-bg text-blue">
              <Card.Body className="d-flex flex-column align-items-center text-center">
                {card.icon}
                <h1 color="blue">{card.count}</h1>
                <Card.Title className="mt-2">{card.title}</Card.Title>
                <Card.Text className="text-secondary">{card.text}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Row xs={1} md={2} className="mt-5 w-100 ">
  <Col>
    <Card className="shadow-lg p-2 border-0">
      <Card.Body>
        <Card.Title as="h1" className="cardTitle">85%</Card.Title>
        <Card.Subtitle className="cardSubtitle mb-2 text-muted">
          Average Doctor Activities Percentage
        </Card.Subtitle>
        <Card.Text className="cardText">Average Statistics</Card.Text>
        <Chart options={doctorActivitiesOptions.options} series={doctorActivitiesOptions.series} type="bar" height={350} />
      </Card.Body>
    </Card>
  </Col>
  
  <Col>
    <Card className="shadow-lg p-4 border-0">
      <Card.Body>
        <Card.Title as="h1" className="cardTitle">30%</Card.Title>
        <Card.Subtitle className="cardSubtitle mb-2 text-muted">
          Patient Growth (This Month)
        </Card.Subtitle>
        <Card.Text className="cardText">Average Rate</Card.Text>
        <Chart options={patientGrowthOptions.options} series={patientGrowthOptions.series} type="line" height={350} />
      </Card.Body>
    </Card>
  </Col>
</Row>

      <Row className="mt-5 w-100">
        {/* Table - New users */}
        <Col >
          <Card className="shadow-sm">
            <Card.Header as="h5">New users</Card.Header>
            <Card.Body>
              <Table responsive bordered hover>
                <thead>
                  <tr>
                    <th>user</th>
                    <th>Status</th>
                    <th>type</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>
                        {user.icon} {user.name}
                      </td>
                      <td>
                        <Badge bg={user.status === "Approved" ? "success" : user.status === "Pending" ? "warning" : "danger"}>
                          {user.status}
                        </Badge>
                      </td>
                      <td>{user.type}</td>
                      <td>
                        <CheckCircle size={20} color="green" className="me-2" />
                        <XCircle size={20} color="red" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        {/* Feeds Section */}
        <Col >
          <Card className="shadow-sm">
            <Card.Header as="h5">Feeds</Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                {activites.map((feed) => (
                  <ListGroup.Item key={feed.id} className="d-flex justify-content-between align-items-center">
                    <div>
                      {feed.icon} {feed.message}
                    </div>
                    <small className="text-muted">{feed.time}</small>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;