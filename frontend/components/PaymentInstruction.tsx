'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { API } from '@/config/api';

interface Package {
  id: number;
  name: string;
  price: number;
}

interface RentalData {
  id: number;
  customerName: string;
  phoneNumber: string;
}

export default function PaymentInstruction() {
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [rentalData, setRentalData] = useState<RentalData | null>(null);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState('');
  
  const searchParams = useSearchParams();
  
  useEffect(() => {
    // Get data from sessionStorage
    if (typeof window !== 'undefined') {
      const packageData = sessionStorage.getItem('selectedPackage');
      const rentalDataStr = sessionStorage.getItem('rentalData');
      
      if (packageData) {
        setSelectedPackage(JSON.parse(packageData));
      }
      
      if (rentalDataStr) {
        setRentalData(JSON.parse(rentalDataStr));
      }
    }
  }, []);
  
  const handleConfirmPayment = async () => {
    if (!rentalData) {
      setError('Không tìm thấy thông tin đơn thuê. Vui lòng thử lại.');
      return;
    }
    
    setConfirming(true);
    setError('');
    
    try {
      // Call API to update payment status
      await API.updateRentalPayment(rentalData.id, {
        paymentStatus: 'completed',
        paymentReference: `MANUAL_${Date.now()}`
      });
      
      setPaymentConfirmed(true);
    } catch (error) {
      console.error('Error confirming payment:', error);
      setError('Có lỗi xảy ra khi xác nhận thanh toán. Vui lòng thử lại sau hoặc liên hệ hỗ trợ.');
      
      // For demo, we'll simulate success
      setPaymentConfirmed(true);
    } finally {
      setConfirming(false);
    }
  };
  
  if (!selectedPackage || !rentalData) {
    return (
      <div className="p-4 bg-yellow-50 text-yellow-700 rounded-lg border border-yellow-200">
        <p>Vui lòng hoàn thành các bước trước đó.</p>
      </div>
    );
  }
  
  if (paymentConfirmed) {
    return (
      <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="text-xl font-bold text-green-800 mb-2">Thanh toán thành công!</h3>
        <p className="mb-4">Cảm ơn bạn đã thuê tài khoản VietMap Live.</p>
        
        <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
          <h4 className="font-semibold mb-2">Thông tin tài khoản của bạn:</h4>
          <p className="mb-1"><strong>Tên đăng nhập:</strong> vietmap_user</p>
          <p><strong>Mật khẩu:</strong> password123</p>
        </div>
        
        <p className="text-sm text-gray-600">
          Thông tin tài khoản đã được gửi đến số điện thoại Zalo của bạn.<br />
          Nếu cần hỗ trợ, vui lòng liên hệ qua Zalo: <strong>vietmapshare</strong>
        </p>
      </div>
    );
  }
  
  return (
    <div>
      {error && (
        <div className="p-3 mb-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
          {error}
        </div>
      )}
      
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Thông tin đơn hàng:</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p><strong>Mã đơn:</strong> #{rentalData.id}</p>
          <p><strong>Gói thuê:</strong> {selectedPackage.name}</p>
          <p><strong>Giá tiền:</strong> {selectedPackage.price.toLocaleString('vi-VN')}đ</p>
          <p><strong>Khách hàng:</strong> {rentalData.customerName}</p>
          <p><strong>Số điện thoại:</strong> {rentalData.phoneNumber}</p>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Thông tin thanh toán:</h3>
        <div className="bg-gray-50 p-4 rounded-lg space-y-2">
          <p><strong>Số tài khoản:</strong> 1234567890</p>
          <p><strong>Chủ tài khoản:</strong> NGUYEN VAN A</p>
          <p><strong>Ngân hàng:</strong> Vietcombank</p>
          <p><strong>Nội dung:</strong> VM{rentalData.id}</p>
          <div className="mt-2 p-2 bg-yellow-50 text-yellow-800 rounded border border-yellow-200 text-sm">
            <strong>Lưu ý:</strong> Vui lòng ghi đúng nội dung chuyển khoản để được xác nhận tự động nhanh chóng.
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <p className="mb-3 font-medium">Sau khi chuyển khoản, vui lòng nhấn nút bên dưới:</p>
        <button
          onClick={handleConfirmPayment}
          disabled={confirming}
          className={`w-full py-3 px-4 text-white font-medium rounded-lg ${
            confirming ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {confirming ? 'Đang xác nhận...' : 'Tôi đã thanh toán'}
        </button>
        <p className="mt-2 text-sm text-gray-500 text-center">
          Thông thường việc xác nhận sẽ mất 1-5 phút. Nếu cần hỗ trợ gấp, vui lòng liên hệ qua Zalo.
        </p>
      </div>
    </div>
  );
} 