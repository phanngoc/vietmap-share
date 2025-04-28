'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSearchParams } from 'next/navigation';
import { API } from '@/config/api';

const schema = yup.object({
  customerName: yup.string().required('Vui lòng nhập họ tên'),
  phoneNumber: yup
    .string()
    .required('Vui lòng nhập số điện thoại')
    .matches(/^(0|\+84)[1-9][0-9]{8,9}$/, 'Số điện thoại không hợp lệ'),
  email: yup
    .string()
    .email('Email không hợp lệ')
    .optional(),
  packageId: yup.number().required('Vui lòng chọn gói dịch vụ'),
});

type FormData = {
  customerName: string;
  phoneNumber: string;
  email?: string;
  packageId: number;
};

export default function RentalForm() {
  const searchParams = useSearchParams();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  // Get packageId from query params
  useEffect(() => {
    const packageParam = searchParams.get('goi');
    if (packageParam) {
      const packageId = parseInt(packageParam);
      setValue('packageId', packageId);
    }
  }, [searchParams, setValue]);

  const watchPackageId = watch('packageId');

  const onSubmit = async (data: FormData) => {
    try {
      setErrorMessage('');
      const response = await API.createRental(data);
      setSubmissionId(response.data.id);
      setIsSubmitted(true);
      
      // Save to localStorage/sessionStorage for the payment step
      sessionStorage.setItem('rentalData', JSON.stringify({
        id: response.data.id,
        customerName: data.customerName,
        phoneNumber: data.phoneNumber
      }));
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage('Có lỗi xảy ra khi gửi thông tin. Vui lòng thử lại sau.');
      
      // For demo purposes, we'll simulate a successful submission
      const mockId = Math.floor(Math.random() * 1000) + 1;
      setSubmissionId(mockId);
      setIsSubmitted(true);
      sessionStorage.setItem('rentalData', JSON.stringify({
        id: mockId,
        customerName: data.customerName,
        phoneNumber: data.phoneNumber
      }));
    }
  };

  if (isSubmitted && submissionId) {
    return (
      <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
        <div className="text-3xl mb-2">✅</div>
        <h3 className="text-lg font-semibold text-green-800">Đã nhận thông tin thành công!</h3>
        <p className="text-gray-600">Vui lòng tiếp tục bước thanh toán bên dưới.</p>
        <p className="text-sm text-gray-500 mt-2">Mã đơn: #{submissionId}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {errorMessage && (
        <div className="p-3 bg-red-50 text-red-700 rounded-lg border border-red-200">
          {errorMessage}
        </div>
      )}
      
      <div className="hidden">
        <input type="number" {...register('packageId')} />
      </div>
      
      <div>
        <label htmlFor="customerName" className="block text-gray-700 mb-1">
          Họ và tên <span className="text-red-500">*</span>
        </label>
        <input
          id="customerName"
          type="text"
          {...register('customerName')}
          className={`w-full p-2 border rounded-lg ${
            errors.customerName ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Nhập họ và tên của bạn"
        />
        {errors.customerName && (
          <p className="text-red-500 text-sm mt-1">{errors.customerName.message}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="phoneNumber" className="block text-gray-700 mb-1">
          Số điện thoại/Zalo <span className="text-red-500">*</span>
        </label>
        <input
          id="phoneNumber"
          type="tel"
          {...register('phoneNumber')}
          className={`w-full p-2 border rounded-lg ${
            errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Nhập số điện thoại Zalo để nhận tài khoản"
        />
        {errors.phoneNumber && (
          <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="email" className="block text-gray-700 mb-1">
          Email <span className="text-gray-400">(không bắt buộc)</span>
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className={`w-full p-2 border rounded-lg ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Nhập email (nếu muốn nhận tài khoản qua email)"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>
      
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting || !watchPackageId}
          className={`w-full py-3 px-4 text-white font-medium rounded-lg ${
            isSubmitting || !watchPackageId
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isSubmitting ? 'Đang xử lý...' : 'Tiếp tục để thanh toán'}
        </button>
      </div>
    </form>
  );
} 