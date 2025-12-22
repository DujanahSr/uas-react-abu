import React from "react";
import {
  AiOutlineClose,
  AiOutlineDownload,
  AiOutlineCalendar,
  AiOutlineClockCircle,
  AiOutlineCheckCircle,
} from "react-icons/ai";
import { FaPlane, FaMapMarkerAlt, FaQrcode } from "react-icons/fa";
import { formatPrice, formatDate } from "../data/mockData";

const ETicketModal = ({ booking, isOpen, onClose }) => {
  if (!isOpen || !booking) return null;

  const handleDownload = () => {
    // Generate printable content
    const printContent = document.getElementById("e-ticket-content");
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>E-Ticket - ${booking.bookingCode}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .ticket { border: 2px solid #2563eb; border-radius: 12px; padding: 20px; max-width: 800px; margin: 0 auto; }
            .header { background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
            .section { margin: 20px 0; padding: 15px; background: #f9fafb; border-radius: 8px; }
            .row { display: flex; justify-content: space-between; margin: 10px 0; }
            .label { font-weight: bold; color: #6b7280; }
            .value { color: #111827; }
            @media print { .no-print { display: none; } }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl transform transition-all">
        {/* Header dengan gradient */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white bg-opacity-20 rounded-lg backdrop-blur-sm">
                <FaPlane size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">E-Ticket</h2>
                <p className="text-blue-100 text-sm mt-1">
                  {booking.airline} - {booking.flightNumber}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleDownload}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors flex items-center gap-2"
                title="Download/Print"
              >
                <AiOutlineDownload size={20} />
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              >
                <AiOutlineClose size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* E-Ticket Content */}
        <div id="e-ticket-content" className="p-6 space-y-6">
          {/* Ticket Header */}
          <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Kode Booking</p>
                <p className="text-3xl font-bold mt-1">{booking.bookingCode}</p>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-90">Status</p>
                <div className="flex items-center gap-2 mt-1">
                  <AiOutlineCheckCircle size={20} />
                  <span className="text-xl font-bold">Confirmed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Flight Details */}
          <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-800/50 rounded-xl border-2 border-gray-200 dark:border-gray-600">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <FaPlane className="text-blue-600" size={24} />
                Detail Penerbangan
              </h3>
              <div className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-lg font-semibold">
                {booking.class}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg mb-2">
                  <FaMapMarkerAlt className="mx-auto text-green-600 mb-2" size={32} />
                  <p className="text-sm text-gray-600 dark:text-gray-400">Dari</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                    {booking.from}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <AiOutlineCalendar size={16} />
                  <span className="text-sm">{formatDate(booking.departureDate)}</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-700 dark:text-gray-300 mt-1">
                  <AiOutlineClockCircle size={16} />
                  <span className="text-sm font-semibold">{booking.departureTime}</span>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t-2 border-dashed border-gray-300 dark:border-gray-600"></div>
                  </div>
                  <div className="relative bg-white dark:bg-gray-800 p-3 rounded-full border-2 border-blue-600">
                    <FaPlane className="text-blue-600" size={24} />
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg mb-2">
                  <FaMapMarkerAlt className="mx-auto text-red-600 mb-2" size={32} />
                  <p className="text-sm text-gray-600 dark:text-gray-400">Ke</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                    {booking.to}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <AiOutlineCalendar size={16} />
                  <span className="text-sm">{formatDate(booking.departureDate)}</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-700 dark:text-gray-300 mt-1">
                  <AiOutlineClockCircle size={16} />
                  <span className="text-sm font-semibold">{booking.arrivalTime}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Maskapai</p>
                  <p className="font-bold text-gray-900 dark:text-white">{booking.airline}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Nomor Penerbangan</p>
                  <p className="font-bold text-gray-900 dark:text-white">{booking.flightNumber}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Passengers */}
          {booking.passengers &&
            Array.isArray(booking.passengers) &&
            booking.passengers.length > 0 && (
              <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl border-2 border-purple-200 dark:border-purple-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Penumpang
                </h3>
                <div className="space-y-3">
                  {booking.passengers.map((passenger, index) => (
                    <div
                      key={index}
                      className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-lg font-bold text-gray-900 dark:text-white">
                            {passenger.title} {passenger.name}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {passenger.idNumber}
                          </p>
                        </div>
                        {passenger.seat && (
                          <div className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-lg font-bold text-lg">
                            {passenger.seat}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* Payment & Booking Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl border-2 border-green-200 dark:border-green-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                Informasi Pembayaran
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Total Harga</span>
                  <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {formatPrice(booking.totalPrice)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Status</span>
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full font-semibold">
                    Paid
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Metode</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {booking.paymentMethod || "Credit Card"}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 rounded-xl border-2 border-indigo-200 dark:border-indigo-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                Informasi Pemesanan
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Tanggal Booking</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {formatDate(booking.bookingDate)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Booking ID</span>
                  <span className="font-mono text-sm text-gray-900 dark:text-white">
                    {booking.id}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* QR Code Placeholder */}
          <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-800/50 rounded-xl border-2 border-gray-200 dark:border-gray-600 text-center">
            <FaQrcode className="mx-auto text-gray-400 mb-2" size={64} />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Tunjukkan QR code ini saat check-in
            </p>
            <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg inline-block">
              <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                <span className="text-xs text-gray-500">QR Code</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 p-6 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 rounded-b-2xl">
          <div className="flex gap-3">
            <button
              onClick={handleDownload}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <AiOutlineDownload size={20} />
              Download / Print
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 font-semibold transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ETicketModal;

