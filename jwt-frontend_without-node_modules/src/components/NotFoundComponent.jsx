import React from 'react'
import notFoundImage from '../assets/404.png'

const NotFoundComponent = () => {
  return (
	<div style={{ textAlign: 'center', marginTop: '50px' }}>
		<h2>Sayfa bulunamadı</h2>
		<p>Üzgünüz, aradığınız sayfa mevcut değil</p>
		<img src={notFoundImage} alt="Not Found" style={{ width: '400px'}} />
	</div>
  )
}

export default NotFoundComponent
