import axios from 'axios';

class FormApi {
  static instance;
  
  constructor() {
    if (FormApi.instance) {
      return FormApi.instance;
    }
    
    this.axiosInstance = axios.create({
      baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/form`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    this.axiosInstance.interceptors.response.use(
            (response) => response.data,
            (error) => {
              const errorMessage = error.response?.data?.error?.message || error.message;
              return Promise.reject(errorMessage);
            }
    );
    FormApi.instance = this;
  }
  
  getList = async () => {
    return this.axiosInstance.get('/');
  };
  
  create = async (data) => {
    return this.axiosInstance.post('/', { form: data });
  };
  
  update = async (id, data) => {
    return this.axiosInstance.put(`/${id}`, { form: data });
  };
  
  delete = async (id) => {
    return this.axiosInstance.delete(`/${id}`);
  };
}

export default FormApi;

