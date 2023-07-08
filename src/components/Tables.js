import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DataService from '../services/DataService';

const Tables = () => {
  const [appointments1, setAppointments1] = useState([]);
  const [appointments2, setAppointments2] = useState([]);
  const [colorCounts, setColorCounts] = useState([]);
  const [dataAppointment, setDataAppointment] = useState(null);

  const numbers = {
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
    7: 'seven',
    8: 'eight',
    9: 'nine',
  };

  useEffect(() => {
    const dataService = new DataService();

    const fetchAppointments = async () => {
      try {
        const response = await dataService.getData();
        setAppointments1(response.appointments);
        console.log('Data load succesfully: ', response);
      } catch (error) {
        console.error('Error getting data: ', error);
      }
    };
    fetchAppointments();

    const interval = setInterval(fetchAppointments, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const dataService = new DataService();

    const fetchRightTable = async () => {
      try {
        const response = await dataService.generateRightTable();
        setAppointments2(response.rightTable);
        console.log('Right table loaded succesfully: ', response);
      } catch (error) {
        console.error('Error getting right table: ', error);
      }
    }

    const fetchColorCounts = async () => {
      try {
        const response = await dataService.generateRightTable();
        setColorCounts(response.colorCounts);
        console.log('Color counts loaded succesfully: ', response);
      } catch (error) {
        console.error('Error getting color counts: ', error);
      }
    }

    fetchRightTable();
    fetchColorCounts();

    const interval = setInterval(() => {
      fetchRightTable();
      fetchColorCounts();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleSave = async () => {
    try {
      const dataService = new DataService();
      const response = await dataService.saveData();
      console.log('Succesfully saved data: ', response);
    } catch (error) {
      console.error('Error saving data: ', error);
    }
  }

  const handleView = async (id) => {
    try {
      const dataService = new DataService();
      const response = await dataService.viewCard(id);
      setDataAppointment(response.view);
      console.log('Get data view succesfully: ', response);
    } catch (error) {
      console.error('Error getting data view: ', error);
    }
  };

  const handleClose = () => {
    setDataAppointment(null);
  };

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <TableContainer component={Paper} sx={{ maxWidth: 500, background: 'grey', margin: '2rem' }}>
          <Table sx={{ maxWidth: 650, background: 'grey' }}>
            <TableHead>
              <TableRow>
                <TableCell>Patient ID</TableCell>
                <TableCell>Doctor ID</TableCell>
                <TableCell>Visiting Hour</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments1.map((appointment) => (
                <TableRow
                  key={appointment.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, background: appointment.color }}
                >
                  <TableCell>{appointment.patientId}</TableCell>
                  <TableCell>{appointment.doctorId}</TableCell>
                  {appointment.hour && (<TableCell>{appointment.hour}</TableCell>)}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TableContainer component={Paper} sx={{ maxWidth: 500, background: 'grey', margin: '2rem' }}>
          <Table sx={{ background: 'grey' }}>
            <TableHead>
              <TableRow>
                <TableCell>Patient ID</TableCell>
                <TableCell>Doctor ID</TableCell>
                <TableCell>Visiting Hour</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments2.map((appointment) => (
                <TableRow
                  key={appointment.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, background: appointment.color }}
                >
                  <TableCell>{appointment.patientId}</TableCell>
                  <TableCell>{appointment.doctorId}</TableCell>
                  <TableCell>{appointment.hour}</TableCell>
                  <TableCell><Button variant="contained" endIcon={<VisibilityIcon />} onClick={() => handleView(appointment._id)}>View Card</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {colorCounts && (
        <div>
          {colorCounts.green > 0 && (colorCounts.green < 10 ? (colorCounts.green === 1 ? `${numbers[colorCounts.green]} green appointment. ` : `${numbers[colorCounts.green]} green appointments. `) : (`${colorCounts.green} green appointments. `))}
          {colorCounts.blue > 0 && (colorCounts.blue < 10 ? (colorCounts.blue === 1 ? `${numbers[colorCounts.blue]} blue appointment. ` : `${numbers[colorCounts.blue]} blue appointments. `) : (`${colorCounts.blue} blue appointments. `))}
          {colorCounts.red > 0 && (colorCounts.red < 10 ? (colorCounts.red === 1 ? `${numbers[colorCounts.red]} red appointment. ` : `${numbers[colorCounts.red]} red appointments. `) : (`${colorCounts.red} red appointments.`))}
        </div>
      )}
      {dataAppointment && (
        <Paper
          sx={{
            position: 'absolute',
            top: 300,
            left: 500,
            right: 500,
            bottom: 300,
            zIndex: 1,
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            overflowY: 'auto',
          }}
        >
          {<div style={{ textAlign: 'left'}}>
            <div>Patient: {dataAppointment.patientData.id}, {dataAppointment.patientData.hours}{dataAppointment.patientData.name && `, ${dataAppointment.patientData.name}`}{dataAppointment.patientData.dateOfBirth && `, ${dataAppointment.patientData.dateOfBirth}`}</div>
            <div>Doctor: {dataAppointment.doctorData.id}, {dataAppointment.doctorData.hours}{dataAppointment.doctorData.name && `, ${dataAppointment.doctorData.name}`}{dataAppointment.doctorData.dateOfBirth && `, ${dataAppointment.doctorData.dateOfBirth}`}</div>
            <div>Appointment: {dataAppointment.appointmentData.hour}</div>
          </div>}
          <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 0, right: 0 }}>
            <CloseIcon />
          </IconButton>
        </Paper>
      )}
      <Button variant="outlined" onClick={handleSave} sx={{ marginTop: '2rem'}}>Save Data</Button>
    </div>
  )
}

export default Tables;