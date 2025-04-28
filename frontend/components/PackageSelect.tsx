'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { API } from '@/config/api';

interface Package {
  id: number;
  name: string;
  duration: number;
  price: number;
  description: string;
}

export default function PackageSelect() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const searchParams = useSearchParams();
  const router = useRouter();
  
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const response = await API.getPackages();
        setPackages(response.data);
        
        // Kiểm tra nếu có tham số goi trên URL
        const packageParam = searchParams.get('goi');
        if (packageParam) {
          const packageId = parseInt(packageParam);
          // Trong trường hợp thực tế, cần kiểm tra packageId có tồn tại trong danh sách không
          setSelectedPackage(packageId);
        } else if (response.data.length > 0) {
          // Nếu không có tham số, chọn gói đầu tiên
          setSelectedPackage(response.data[0].id);
        }
      } catch (err) {
        setError('Không thể tải danh sách gói dịch vụ. Vui lòng thử lại sau.');
        
        // Sử dụng mock data
        setPackages(API.mockPackages);
        
        const packageParam = searchParams.get('goi');
        if (packageParam) {
          const packageId = parseInt(packageParam);
          const validId = API.mockPackages.find(p => p.id === packageId) ? packageId : API.mockPackages[0].id;
          setSelectedPackage(validId);
        } else {
          setSelectedPackage(API.mockPackages[0].id);
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchPackages();
  }, [searchParams]);
  
  const handlePackageSelect = (packageId: number) => {
    setSelectedPackage(packageId);
    
    // Update URL params
    const params = new URLSearchParams(searchParams.toString());
    params.set('goi', packageId.toString());
    router.push(`/thue-tai-khoan?${params.toString()}`);
    
    // Also save to sessionStorage for other components to use
    if (typeof window !== 'undefined') {
      const pkg = packages.find(p => p.id === packageId);
      if (pkg) {
        sessionStorage.setItem('selectedPackage', JSON.stringify(pkg));
      }
    }
  };
  
  if (loading) {
    return <div className="text-center py-4">Đang tải danh sách gói dịch vụ...</div>;
  }
  
  return (
    <div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {packages.map(pkg => (
          <div 
            key={pkg.id}
            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
              selectedPackage === pkg.id 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-blue-300'
            }`}
            onClick={() => handlePackageSelect(pkg.id)}
          >
            <div className="flex items-start">
              <input 
                type="radio"
                name="package"
                checked={selectedPackage === pkg.id}
                onChange={() => handlePackageSelect(pkg.id)}
                className="mt-1 mr-2"
              />
              <div>
                <h3 className="font-semibold">{pkg.name}</h3>
                <p className="text-xl font-bold text-blue-600">{pkg.price.toLocaleString('vi-VN')}đ</p>
                <p className="text-sm text-gray-600">{pkg.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 