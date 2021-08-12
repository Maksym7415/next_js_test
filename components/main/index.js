const MainPage = (props) => 
  <div className='app-container'>
    <header className='header'>
      Test Task - single page Next JS app with server side data
    </header>
    <div className='nav-menu-container'>
      <div className='content-container'>
        {props.children}
      </div>
    </div>

  <style jsx>{`
    .app-container {
      display: flex;
      flex-direction: column;
    }
    .header {
      width: 100%;
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      font-weight: bold;
    }
    .content-container {
      padding: 20px;
      width: 100%;
      display: flex;
      justify-content: center;
    }
  `}</style>
  </div>

  export default MainPage;