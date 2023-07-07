import http from '../utils/api';

class DataService {
  async sendData(patients, doctors, appointments) {
    try {
      const response = await http.post('/sendData', {
        patients,
        doctors,
        appointments,
      });
      return response.data;
    } catch (error) {
      console.error('Error sending data: ', error.response.data);
      throw error;
    }
  }

  async clearData() {
    try {
      const response = await http.delete('/clearData');
      return response.data;
    } catch (error) {
      console.error('Error clearing data: ', error.response.data);
      throw error;
    }
  }

  async getData() {
    try {
      const response = await http.get('/getData');
      return response.data;
    } catch (error) {
      console.error('Error getting data: ', error.response.data);
      throw error;
    }
  }

  async generateRightTable() {
    try {
      const response = await http.get('/generateRightTable');
      return response.data;
    } catch (error) {
      console.error('Error generating right table: ', error.response.data);
      throw error;
    }
  }

  async viewCard(id) {
    try {
      const response = await http.get(`/viewCard/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error viewing card: ', error.response.data);
      throw error;
    }
  }

  async saveData() {
    try {
      const response = await http.put('/saveData');
      return response.data;
    } catch (error) {
      console.error('Error saving data: ', error.response.data);
      throw error;
    }
  }
}

export default DataService;
