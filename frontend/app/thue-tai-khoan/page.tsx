'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import RentalForm from '@/components/RentalForm';
import { API } from '@/config/api';
import Link from 'next/link';

export default function ThueTaiKhoanPage() {
  const searchParams = useSearchParams();
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await API.getPackages();
        setPackages(response.data);
      } catch (error) {
        console.error('Error fetching packages:', error);
        // Sử dụng dữ liệu mẫu nếu API chưa sẵn sàng
        setPackages(API.mockPackages);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  useEffect(() => {
    const packageId = searchParams.get('goi');
    if (packageId && packages.length > 0) {
      const pkgId = parseInt(packageId);
      const found = packages.find(pkg => pkg.id === pkgId);
      if (found) {
        setSelectedPackage(found);
      }
    }
  }, [searchParams, packages]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Thuê tài khoản VietMap Live</h1>

      {!selectedPackage ? (
        <div className="mb-8">
          <p className="text-lg mb-6">Vui lòng chọn gói dịch vụ phù hợp với nhu cầu của bạn:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map(pkg => (
              <div key={pkg.id} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-2">{pkg.name}</h3>
                <p className="text-3xl font-bold text-blue-600 mb-4">
                  {formatPrice(pkg.price)}
                </p>
                <p className="text-gray-600 mb-4">{pkg.description}</p>
                <Link 
                  href={`/thue-tai-khoan?goi=${pkg.id}`}
                  className="block text-center bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Chọn
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-6">
              <h2 className="text-xl font-semibold mb-2">{selectedPackage.name}</h2>
              <p className="text-3xl font-bold text-blue-600 mb-4">
                {formatPrice(selectedPackage.price)}
              </p>
              <p className="text-gray-700 mb-4">{selectedPackage.description}</p>
              <div className="pt-4 border-t border-blue-200">
                <h3 className="font-medium mb-2">Bao gồm:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Truy cập đầy đủ tính năng VietMap Live</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Theo dõi vị trí realtime</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Xem lịch sử di chuyển</span>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <Link 
                href="/thue-tai-khoan" 
                className="text-blue-600 hover:underline flex items-center"
              >
                ← Quay lại chọn gói khác
              </Link>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Thông tin liên hệ</h2>
              <RentalForm />
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 