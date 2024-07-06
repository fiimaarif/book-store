import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'

function PaymentPage() {
  return (
    <div>
        <Navbar/>
        <div className='col-12 col-md-6 col-lg-4 mx-auto my-3'>
        <div className='p-2 bg-info text-center rounded'>
            <p>Sisa Waktu Pembayaran Anda</p>
            <h3 className='text-danger fw-bold'>23 : 59 : 09</h3>
            <p>06 Juli 2024, 22:41 WIB</p>
        </div>
        <div>
        <div className='p-2 border rounded mt-3'>
            <p>Virtual akun mandiri (otomatis)</p>
            <hr/>
            <small className='text-muted'>Nomor Virtual Akun</small>
            <div>1111111111</div>
            <small className='text-muted'>Nomor Pesanan</small>
            <div>1X1J11H1P1</div>
            <small className='text-muted'>Tanggal Pesanan</small>
            <div>05 Juli 2024</div>
            <small className='text-muted'>Ringkasan Pembayaran</small>
            <div className='text-primary'>Rp 217.400</div>
            <small className='text-muted'>Status Pembayaran</small>
            <div>Unpaid</div>
        </div>
        </div>
        </div>
        <Footer/>
    </div>
  )
}

export default PaymentPage