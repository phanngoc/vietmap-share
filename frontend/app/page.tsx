import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Thuê tài khoản VietMap Live theo ngày</h1>
        <p className="text-xl text-gray-600 mb-8">
          Theo dõi phương tiện, quản lý di chuyển của người thân với giá cực kỳ rẻ
        </p>
        <div className="flex justify-center">
          <Link 
            href="/thue-tai-khoan" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Thuê Ngay
          </Link>
        </div>
      </section>

      {/* Features section */}
      <section className="mb-12 w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Tại sao chọn VietMap Share?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="text-blue-600 mb-4 text-4xl">⚡</div>
            <h3 className="text-xl font-semibold mb-2">Thuê nhanh, dùng ngay</h3>
            <p className="text-gray-600">Nhận tài khoản chỉ trong vài phút sau khi thanh toán</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="text-blue-600 mb-4 text-4xl">💰</div>
            <h3 className="text-xl font-semibold mb-2">Giá cực kỳ rẻ</h3>
            <p className="text-gray-600">Chỉ từ 10.000đ/ngày, tiết kiệm chi phí</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="text-blue-600 mb-4 text-4xl">🔒</div>
            <h3 className="text-xl font-semibold mb-2">Bảo mật an toàn</h3>
            <p className="text-gray-600">Dùng xong tự động reset, không lưu dữ liệu cá nhân</p>
          </div>
        </div>
      </section>

      {/* Pricing section */}
      <section className="mb-12 w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Bảng giá thuê tài khoản</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold mb-2">Gói 1 ngày</h3>
            <p className="text-3xl font-bold text-blue-600 mb-4">10.000đ</p>
            <ul className="mb-6 space-y-2">
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Truy cập đầy đủ tính năng VietMap Live</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Theo dõi vị trí realtime</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Xem lịch sử di chuyển</li>
            </ul>
            <Link 
              href="/thue-tai-khoan?goi=1" 
              className="block text-center bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Thuê Ngay
            </Link>
          </div>
          
          <div className="p-6 bg-blue-50 rounded-lg shadow-md border-2 border-blue-500 relative">
            <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-bl">
              Phổ biến nhất
            </div>
            <h3 className="text-xl font-semibold mb-2">Gói 3 ngày</h3>
            <p className="text-3xl font-bold text-blue-600 mb-4">25.000đ</p>
            <ul className="mb-6 space-y-2">
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Truy cập đầy đủ tính năng VietMap Live</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Theo dõi vị trí realtime</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Xem lịch sử di chuyển</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Tiết kiệm 17% so với thuê lẻ</li>
            </ul>
            <Link 
              href="/thue-tai-khoan?goi=2" 
              className="block text-center bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Thuê Ngay
            </Link>
          </div>
          
          <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold mb-2">Gói 7 ngày</h3>
            <p className="text-3xl font-bold text-blue-600 mb-4">50.000đ</p>
            <ul className="mb-6 space-y-2">
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Truy cập đầy đủ tính năng VietMap Live</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Theo dõi vị trí realtime</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Xem lịch sử di chuyển</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Tiết kiệm 30% so với thuê lẻ</li>
            </ul>
            <Link 
              href="/thue-tai-khoan?goi=3" 
              className="block text-center bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Thuê Ngay
            </Link>
          </div>
        </div>
      </section>

      {/* How it works section */}
      <section className="mb-12 w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Cách thức hoạt động</h2>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full text-xl font-bold mb-4">1</div>
            <h3 className="text-lg font-semibold mb-2">Chọn gói thuê</h3>
            <p className="text-gray-600">Lựa chọn gói thuê phù hợp với nhu cầu của bạn</p>
          </div>
          <div className="flex-1 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full text-xl font-bold mb-4">2</div>
            <h3 className="text-lg font-semibold mb-2">Điền thông tin & Thanh toán</h3>
            <p className="text-gray-600">Điền thông tin liên hệ và tiến hành thanh toán</p>
          </div>
          <div className="flex-1 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full text-xl font-bold mb-4">3</div>
            <h3 className="text-lg font-semibold mb-2">Nhận tài khoản</h3>
            <p className="text-gray-600">Nhận tài khoản qua Zalo hoặc Email và bắt đầu sử dụng</p>
          </div>
        </div>
      </section>

      {/* FAQ section */}
      <section className="w-full mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Câu hỏi thường gặp</h2>
        <div className="space-y-4">
          <details className="bg-white p-4 rounded-lg shadow-md">
            <summary className="font-semibold cursor-pointer">VietMap Live là gì?</summary>
            <p className="mt-2 text-gray-600">
              VietMap Live là ứng dụng giúp theo dõi vị trí thời gian thực của phương tiện, người thân. Ứng dụng cho phép xem lịch sử di chuyển, cảnh báo tốc độ và nhiều tính năng hữu ích khác.
            </p>
          </details>
          <details className="bg-white p-4 rounded-lg shadow-md">
            <summary className="font-semibold cursor-pointer">Tôi cần thiết bị gì để sử dụng?</summary>
            <p className="mt-2 text-gray-600">
              Bạn cần thiết bị GPS tracker hoặc điện thoại cài app VietMap Live để theo dõi. Bạn có thể dùng điện thoại thông minh có kết nối internet để xem vị trí.
            </p>
          </details>
          <details className="bg-white p-4 rounded-lg shadow-md">
            <summary className="font-semibold cursor-pointer">Tôi sẽ nhận tài khoản thế nào sau khi thanh toán?</summary>
            <p className="mt-2 text-gray-600">
              Sau khi thanh toán và xác nhận thành công, chúng tôi sẽ gửi thông tin tài khoản qua Zalo hoặc Email mà bạn đã đăng ký. Thông thường trong vòng 5-10 phút.
            </p>
          </details>
          <details className="bg-white p-4 rounded-lg shadow-md">
            <summary className="font-semibold cursor-pointer">Nếu tôi muốn tiếp tục sử dụng sau khi hết hạn?</summary>
            <p className="mt-2 text-gray-600">
              Bạn có thể thuê một tài khoản mới hoặc liên hệ với chúng tôi qua Zalo để gia hạn tài khoản hiện tại. Chúng tôi sẽ hỗ trợ bạn trong thời gian nhanh nhất.
            </p>
          </details>
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-blue-50 p-8 rounded-lg shadow-md w-full text-center mb-12">
        <h2 className="text-2xl font-bold mb-4">Sẵn sàng để thuê tài khoản?</h2>
        <p className="text-xl text-gray-600 mb-6">Chỉ với vài bước đơn giản, bạn có thể bắt đầu theo dõi vị trí ngay hôm nay</p>
        <Link 
          href="/thue-tai-khoan" 
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Thuê Tài Khoản Ngay
        </Link>
      </section>
    </div>
  );
} 