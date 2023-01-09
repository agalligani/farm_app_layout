const PlantingsMainBody = ({MainContent, SideBar}) => {
    return (
      <main className="main__body_wrapper" role="main">
        <div className="main__body">
          <div className="main__inner_center">
            <div>{MainContent}</div>
          </div>
          <div  className="main__sidebar_right">
            {SideBar}
          </div>
        </div>
      </main>
    )
  }
  export default PlantingsMainBody
