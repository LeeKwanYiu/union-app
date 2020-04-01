import React from 'react'
import homePicture from '../../picture/home.jpg'

class Home extends React.Component {
  render() {
    return (
      <div>
        <div style={{position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)'}}>
          <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" alt="logo" />
          <span style={{marginLeft: 20}}>
            <span style={{fontSize: '3rem', color: 'white'}}>高校社团</span>
          </span>
        </div>
        <img src={homePicture} alt='主页' style={{ height: '100%', width: '100%', position: 'absolute', top: 0, left: 0, zIndex: -100 }} />
      </div>
    )
  }
}

export default Home;