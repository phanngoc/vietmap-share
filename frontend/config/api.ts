import axios from 'axios';

// Lấy API URL từ biến môi trường hoặc dùng giá trị mặc định cho môi trường local
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Tạo axios instance với cấu hình mặc định
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Các endpoints
export const API = {
  // Packages
  getPackages: () => apiClient.get('/packages'),
  getPackage: (id: number) => apiClient.get(`/packages/${id}`),
  
  // Rentals
  createRental: (data: any) => apiClient.post('/rentals', data),
  getRental: (id: number) => apiClient.get(`/rentals/${id}`),
  updateRentalPayment: (id: number, data: any) => apiClient.put(`/rentals/${id}/payment`, data),
  
  // Mock API cho trường hợp backend chưa sẵn sàng
  mockPackages: [
    { id: 1, name: 'Gói 1 ngày', duration: 1, price: 10000, description: 'Gói thuê tài khoản VietMap Live trong 1 ngày' },
    { id: 2, name: 'Gói 3 ngày', duration: 3, price: 25000, description: 'Gói thuê tài khoản VietMap Live trong 3 ngày' },
    { id: 3, name: 'Gói 7 ngày', duration: 7, price: 50000, description: 'Gói thuê tài khoản VietMap Live trong 7 ngày' }
  ]
};

export default apiClient; 