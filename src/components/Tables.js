import React, { useState, useEffect } from 'react';
import DataService from '../services/DataService';

const Tables = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const dataService = new DataService();

    const fetchAppointments = async () => {
      try {
        const response = await dataService.getData();
        setAppointments(response.appointments);
        console.log('Data load succesfully: ', response);
      } catch (error) {
        console.error('Error getting data: ', error);
      }
    };
    fetchAppointments();
  }, []);

  return (
    <div>

    </div>
  )
}

export default Tables;