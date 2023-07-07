import React, { useState } from 'react';
import moment from 'moment';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DataService from '../services/DataService';

const Forms = () => {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [dataSaved, setDataSaved] = useState(null);

  const dataService = new DataService();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await dataService.sendData(patients, doctors, appointments);
      setDataSaved(response);
      console.log('Data sent successfully: ', response);
    } catch (error) {
      console.error('Error sending data: ', error);
    }
  }

  const handleClearDB = async () => {
    try {
      const response = await dataService.clearData();
      setDataSaved(response);
      console.log('Data cleared seccussfully: ', response);
    } catch (error) {
      console.error('Error clearing data: ', error);
    }
  }

  const handlePatientChange = (event) => {
    const lines = event.target.value.split('\n');
    const cleanedLines = lines.filter((line) => line.trim() !== '');
    const patientsData = cleanedLines.map((line) => {
      const values = line.split(',').map((value) => value.trim());
      const id = values[0];
      const hours = values[1];
      let dateOfBirth = null;
      let name = null;

      const uselessParameters = values.slice(4);

      if (values[2] && moment(values[2], 'DD.MM.YYYY', true).isValid()) {
        dateOfBirth = values[2];
      } else if (values[2]) {
        name = values[2];
      }

      if (values[3] && moment(values[3], 'DD.MM.YYYY', true).isValid()) {
        dateOfBirth = values[3];
      }

      const patientData = {
        id,
        hours,
      };

      if (name !== '' && name !== null && name !== undefined) {
        patientData.name = name;
      }
  
      if (dateOfBirth !== '' && dateOfBirth !== null && dateOfBirth !== undefined) {
        patientData.dateOfBirth = dateOfBirth;
      }

      uselessParameters.filter((useless) => useless !== undefined);

      if (uselessParameters.length > 0) {
        patientData.uselessParameters = uselessParameters;
      }

      return patientData;
    });
    setPatients(patientsData);
  }

  const handleDoctorChange = (event) => {
    const lines = event.target.value.split('\n');
    const cleanedLines = lines.filter((line) => line.trim() !== '');
    const doctorsData = cleanedLines.map((line) => {
      const values = line.split(',').map((value) => value.trim());
      const id = values[0];
      const hours = values[1];
      let dateOfBirth = null;
      let name = null;

      const uselessParameters = values.slice(4);

      if (values[2] && moment(values[2], 'DD.MM.YYYY', true).isValid()) {
        dateOfBirth = values[2];
      } else if (values[2]) {
        name = values[2];
      }

      if (values[3] && moment(values[3], 'DD.MM.YYYY', true).isValid()) {
        dateOfBirth = values[3];
      }

      const doctorData = {
        id,
        hours,
      };

      if (name !== '' && name !== null && name !== undefined) {
        doctorData.name = name;
      }

      if (dateOfBirth !== '' && dateOfBirth !== null && dateOfBirth !== undefined) {
        doctorData.dateOfBirth = dateOfBirth;
      }

      uselessParameters.filter((useless) => useless !== undefined);

      if (uselessParameters.length > 0) {
        doctorData.uselessParameters = uselessParameters;
      }

      return doctorData;
    });
    setDoctors(doctorsData);
  }

  const handleAppointmentChange = (event) => {
    const lines = event.target.value.split('\n');
    const cleanedLines = lines.filter((line) => line.trim() !== '');
    const appointmentsData = cleanedLines.map((line) => {
      const values = line.split(',').map((value) => value.trim());
      const patientId = values[0];
      const doctorId = values[1];
      const hour = values[2];
      const uselessParameters = values.slice(3);

      const appointmentData = {
        patientId,
        doctorId,
      }

      if (!isNaN(hour)) {
        appointmentData.hour = hour;
      }

      uselessParameters.filter((useless) => useless !== undefined);

      if (uselessParameters.length > 0) {
        appointmentData.uselessParameters = uselessParameters;
      }

      return appointmentData;
    });
    setAppointments(appointmentsData);
  }

  const handleClose = () => {
    setDataSaved(null);
  };

  return (
    <div>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { margin: '2rem', width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          id="patients"
          label="Patients"
          multiline
          rows={25}
          // value={patients}
          onChange={handlePatientChange}
        />
        <TextField
          id="doctors"
          label="Doctors"
          multiline
          rows={25}
          // value={doctors}
          onChange={handleDoctorChange}
        />
        <TextField
          id="appointments"
          label="Appointments"
          multiline
          rows={25}
          // value={appointments}
          onChange={handleAppointmentChange}
        />
        {dataSaved && (
          <Paper
            sx={{
              position: 'absolute',
              top: 100,
              left: 500,
              right: 500,
              bottom: 100,
              zIndex: 1,
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
            }}
          >
            {dataSaved.deleteCounts && (
              <><div style={{ textAlign: 'left' }}>
                <div>Count cleared data</div>
                <div>Patients: {dataSaved.deleteCounts.patients}</div>
                <div>Doctors: {dataSaved.deleteCounts.doctors}</div>
                <div>Appointments: {dataSaved.deleteCounts.appointments}</div>
              </div></>
            )}
            {dataSaved.successPatients && dataSaved.successPatients.length > 0 && (
              <><div style={{ textAlign: 'left' }}>
                <div>Successful Patients:</div>
                {dataSaved.successPatients.map((patient) => (
                  <div key={patient.id}>
                    {patient.id}, {patient.hours}{patient.name && `, ${patient.name}`}{patient.dateOfBirth && `, ${patient.dateOfBirth}`}
                  </div>
                ))}
              </div><br /></>
            )}
            {dataSaved.successDoctors && dataSaved.successDoctors.length > 0 && (
              <><div style={{ textAlign: 'left' }}>
                <div>Successful Doctors:</div>
                {dataSaved.successDoctors.map((doctor) => (
                  <div key={doctor.id}>
                    {doctor.id}, {doctor.hours}{doctor.name && `, ${doctor.name}`}{doctor.dateOfBirth && `, ${doctor.dateOfBirth}`}
                  </div>
                ))}
              </div><br /></>
            )}
            {dataSaved.successAppointments && dataSaved.successAppointments.length > 0 && (
              <><div style={{ textAlign: 'left' }}>
                <div>Successful Appointments:</div>
                {dataSaved.successAppointments.map((appointment) => (
                  <div key={appointment.id}>
                    {appointment.patientId}, {appointment.doctorId}{appointment.hour && `, ${appointment.hour}`}
                  </div>
                ))}
              </div><br /></>
            )}
            {dataSaved.wrongFormatPatients && dataSaved.wrongFormatPatients.length > 0 && (
              <><div style={{ textAlign: 'left' }}>
                <div>Wrong Format Patients:</div>
                {dataSaved.wrongFormatPatients.map((patient) => (
                  <div key={patient.id}>
                    {patient.id}, {patient.hours}{patient.name && `, ${patient.name}`}{patient.dateOfBirth && `, ${patient.dateOfBirth}`}{patient.uselessParameters && `, ${patient.uselessParameters.join(', ')}`}
                  </div>
                ))}
              </div><br /></>
            )}
            {dataSaved.wrongFormatDoctors && dataSaved.wrongFormatDoctors.length > 0 && (
              <><div style={{ textAlign: 'left' }}>
                <div>Wrong Format Doctors:</div>
                {dataSaved.wrongFormatDoctors.map((doctor) => (
                  <div key={doctor.id}>
                    {doctor.id}, {doctor.hours}{doctor.name && `, ${doctor.name}`}{doctor.dateOfBirth && `, ${doctor.dateOfBirth}`}{doctor.uselessParameters && `, ${doctor.uselessParameters.join(' ')}`}
                  </div>
                ))}
              </div><br /></>
            )}
            {dataSaved.wrongFormatAppointments && dataSaved.wrongFormatAppointments.length > 0 && (
              <><div style={{ textAlign: 'left' }}>
                <div>Wrong Format Appointments:</div>
                {dataSaved.wrongFormatAppointments.map((appointment) => (
                  <div key={appointment.id}>
                    {appointment.patientId}, {appointment.doctorId}{appointment.hour && `, ${appointment.hour}`}{appointment.uselessParameters && `, ${appointment.uselessParameters.join(' ')}`}
                  </div>
                ))}
              </div><br /></>
            )}
            {dataSaved.duplicatePatients && dataSaved.duplicatePatients.length > 0 && (
              <><div style={{ textAlign: 'left' }}>
                <div>Duplicate Patients:</div>
                {dataSaved.duplicatePatients.map((patient) => (
                  <div key={patient.id}>
                    {patient.id}, {patient.hours}{patient.name && `, ${patient.name}`}{patient.dateOfBirth && `, ${patient.dateOfBirth}`}
                  </div>
                ))}
              </div><br /></>
            )}
            {dataSaved.duplicateDoctors && dataSaved.duplicateDoctors.length > 0 && (
              <><div style={{ textAlign: 'left' }}>
                <div>Duplicate Doctors:</div>
                {dataSaved.duplicateDoctors.map((doctor) => (
                  <div key={doctor.id}>
                    {doctor.id}, {doctor.hours}{doctor.name && `, ${doctor.name}`}{doctor.dateOfBirth && `, ${doctor.dateOfBirth}`}
                  </div>
                ))}
              </div><br /></>
            )}
            <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 0, right: 0 }}>
              <CloseIcon />
            </IconButton>
          </Paper>
        )}
        <Box sx={{ gridColumn: '1 / -1', justifySelf: 'end' }}>
          <Button variant="contained" sx={{margin: '2rem'}} endIcon={<SendIcon />} type="submit">
            Send Data
          </Button>
          <Button variant="outlined" sx={{margin: '2rem'}} startIcon={<DeleteIcon />} onClick={handleClearDB}>
            Clear DB
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Forms;
